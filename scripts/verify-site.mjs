import { readdir, readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { load } from 'cheerio';
import { XMLParser } from 'fast-xml-parser';
import { SyntaxValidator } from 'fast-xml-validator';
import { BASE_URL } from '../site.config.mjs';

const root = process.cwd();
const dist = path.join(root, 'dist');
const manifest = JSON.parse(await readFile(path.join(root, 'migration/article-manifest.json'), 'utf8'));
const failures = [];
const xmlParser = new XMLParser({ ignoreAttributes: false });
const legacySiteHosts = new Set(['datadojo.dev', 'www.datadojo.dev', 'hwolters.github.io']);

function outputPath(urlPath) {
  const clean = decodeURIComponent(urlPath.split(/[?#]/)[0]);
  if (clean === '/') return path.join(dist, 'index.html');
  if (clean.endsWith('/')) return path.join(dist, clean.slice(1), 'index.html');
  if (path.extname(clean)) return path.join(dist, clean.slice(1));
  return path.join(dist, clean.slice(1), 'index.html');
}

async function walk(directory) {
  const results = [];
  for (const entry of await readdir(directory)) {
    const fullPath = path.join(directory, entry);
    if ((await stat(fullPath)).isDirectory()) results.push(...await walk(fullPath));
    else results.push(fullPath);
  }
  return results;
}

for (const article of manifest.articles) {
  if (!existsSync(outputPath(article.canonicalPath))) {
    failures.push(`Missing canonical article: ${article.canonicalPath}`);
  }

  for (const alias of article.aliases) {
    const aliasFile = outputPath(alias);
    if (!existsSync(aliasFile)) {
      failures.push(`Missing article alias: ${alias}`);
      continue;
    }
    const $ = load(await readFile(aliasFile, 'utf8'));
    const canonical = $('link[rel="canonical"]').attr('href');
    if (canonical !== new URL(article.canonicalPath, BASE_URL).href) {
      failures.push(`Incorrect alias target: ${alias} -> ${canonical}`);
    }
    if (!$('meta[name="robots"]').attr('content')?.includes('noindex')) {
      failures.push(`Alias is indexable: ${alias}`);
    }
  }
}

for (const [alias, target] of Object.entries(manifest.indexAliases)) {
  const $ = load(await readFile(outputPath(alias), 'utf8'));
  if ($('link[rel="canonical"]').attr('href') !== new URL(target, BASE_URL).href) {
    failures.push(`Incorrect index alias target: ${alias}`);
  }
}

for (const excluded of manifest.excludedRoutes) {
  if (existsSync(outputPath(excluded))) failures.push(`Excluded route was generated: ${excluded}`);
}

// Ignore stale Finder/iCloud conflict copies; clean CI builds never produce these files.
const allFiles = (await walk(dist)).filter((file) => !/ \d+\.[^/]+$/.test(file));
const htmlFiles = allFiles.filter((file) => file.endsWith('.html'));
const publicPages = [];
const seenTitles = new Map();
const seenCanonicals = new Map();

for (const file of htmlFiles) {
  const relativeFile = path.relative(dist, file);
  const html = await readFile(file, 'utf8');
  const $ = load(html);

  for (const element of $('a[href], img[src], script[src], link[href]').toArray()) {
    const attribute = element.name === 'a' || element.name === 'link' ? 'href' : 'src';
    const value = $(element).attr(attribute);
    if (!value) continue;

    let localPath;
    if (value.startsWith('/') && !value.startsWith('//')) {
      localPath = value;
    } else {
      try {
        const url = new URL(value);
        if (legacySiteHosts.has(url.hostname)) {
          failures.push(`Legacy domain in ${relativeFile}: ${value}`);
        }
        if (element.name === 'a' && url.origin === BASE_URL) {
          localPath = `${url.pathname}${url.search}${url.hash}`;
        }
      } catch {
        // Relative URLs without a leading slash are not site-root links.
      }
    }

    if (localPath && !existsSync(outputPath(localPath))) {
      failures.push(`Broken local ${attribute} in ${relativeFile}: ${value}`);
    }
  }

  $('img').each((_, image) => {
    const src = $(image).attr('src');
    if (!$(image).attr('alt')?.trim()) failures.push(`Missing image alt text in ${relativeFile}: ${src}`);
    if ($(image).attr('loading') !== 'lazy') failures.push(`Image is not lazy-loaded in ${relativeFile}: ${src}`);
    if ($(image).attr('decoding') !== 'async') failures.push(`Image is not asynchronously decoded in ${relativeFile}: ${src}`);
  });

  const isNoIndex = $('meta[name="robots"]').attr('content')?.includes('noindex');
  if (isNoIndex) continue;
  publicPages.push({ file, $, relativeFile });

  const requiredSelectors = [
    'meta[charset]', 'meta[name="viewport"]', 'meta[name="description"]', 'link[rel="canonical"]',
    'meta[property="og:type"]', 'meta[property="og:title"]', 'meta[property="og:description"]',
    'meta[property="og:url"]', 'meta[property="og:image"]', 'meta[name="twitter:card"]',
    'meta[name="twitter:title"]', 'meta[name="twitter:description"]', 'meta[name="twitter:image"]',
  ];
  for (const selector of requiredSelectors) {
    if ($(selector).length !== 1) failures.push(`Expected one ${selector} in ${relativeFile}`);
  }
  const socialImage = $('meta[property="og:image"]').attr('content');
  if (socialImage) {
    const socialImageUrl = new URL(socialImage);
    if (socialImageUrl.origin === BASE_URL && !existsSync(outputPath(socialImageUrl.pathname))) {
      failures.push(`Missing social image in ${relativeFile}: ${socialImageUrl.pathname}`);
    }
  }
  if ($('html').attr('lang') !== 'en') failures.push(`Missing or incorrect html lang in ${relativeFile}`);
  if (!$('meta[name="description"]').attr('content')?.trim()) failures.push(`Missing meta description in ${relativeFile}`);

  const title = $('title').text().trim();
  const canonical = $('link[rel="canonical"]').attr('href')?.trim();
  if ($('title').length !== 1 || !title) failures.push(`Missing or duplicate title tag in ${relativeFile}`);
  if (title && seenTitles.has(title)) failures.push(`Duplicate title: ${title} (${seenTitles.get(title)}, ${relativeFile})`);
  else if (title) seenTitles.set(title, relativeFile);
  if (canonical && seenCanonicals.has(canonical)) failures.push(`Duplicate canonical: ${canonical} (${seenCanonicals.get(canonical)}, ${relativeFile})`);
  else if (canonical) seenCanonicals.set(canonical, relativeFile);
  if (!canonical?.startsWith(`${BASE_URL}/`) && canonical !== `${BASE_URL}/`) failures.push(`Canonical outside BASE_URL in ${relativeFile}: ${canonical}`);

  const headings = $('h1, h2, h3, h4, h5, h6').toArray();
  if ($('h1').length !== 1) failures.push(`Expected exactly one h1 in ${relativeFile}`);
  let previousLevel = 0;
  for (const heading of headings) {
    const level = Number(heading.name.slice(1));
    if (previousLevel && level > previousLevel + 1) {
      failures.push(`Heading level skips from h${previousLevel} to h${level} in ${relativeFile}`);
    }
    previousLevel = level;
  }
}

const sitemapFile = path.join(dist, 'sitemap.xml');
const sitemapText = await readFile(sitemapFile, 'utf8');
let sitemap;
const sitemapValidation = SyntaxValidator.validate(sitemapText);
if (sitemapValidation !== true) failures.push(`Invalid sitemap.xml: ${sitemapValidation.err.msg}`);
try {
  sitemap = xmlParser.parse(sitemapText);
} catch (error) {
  failures.push(`Invalid sitemap.xml: ${error.message}`);
}
const rawSitemapUrls = sitemap?.urlset?.url ?? [];
const sitemapEntries = Array.isArray(rawSitemapUrls) ? rawSitemapUrls : [rawSitemapUrls];
const sitemapUrls = new Set(sitemapEntries.map((entry) => entry.loc));
for (const { $, relativeFile } of publicPages) {
  if (relativeFile === '404.html') continue;
  const canonical = $('link[rel="canonical"]').attr('href');
  if (canonical && !sitemapUrls.has(canonical)) failures.push(`Public page missing from sitemap: ${canonical}`);
}
for (const entry of sitemapEntries) {
  if (!entry.loc?.startsWith(`${BASE_URL}/`) && entry.loc !== `${BASE_URL}/`) failures.push(`Sitemap URL outside BASE_URL: ${entry.loc}`);
  if (entry.lastmod && !/^\d{4}-\d{2}-\d{2}$/.test(entry.lastmod)) failures.push(`Invalid sitemap lastmod for ${entry.loc}: ${entry.lastmod}`);
}
for (const article of manifest.articles) {
  for (const alias of article.aliases) {
    if (sitemapUrls.has(new URL(alias, BASE_URL).href)) failures.push(`Alias appears in sitemap: ${alias}`);
  }
}

const robots = await readFile(path.join(dist, 'robots.txt'), 'utf8');
const expectedRobots = `User-agent: *\nAllow: /\n\nSitemap: ${BASE_URL}/sitemap.xml\n`;
if (robots !== expectedRobots) failures.push('robots.txt does not match the required policy or BASE_URL sitemap reference');

let feedPostCount = 0;
for (const feedName of ['feed.xml', 'rss.xml']) {
  try {
    const feedText = await readFile(path.join(dist, feedName), 'utf8');
    const validation = SyntaxValidator.validate(feedText);
    if (validation !== true) failures.push(`Invalid ${feedName}: ${validation.err.msg}`);
    const feed = xmlParser.parse(feedText);
    const items = feed?.rss?.channel?.item ?? [];
    const itemCount = Array.isArray(items) ? items.length : items ? 1 : 0;
    const expectedPosts = [...sitemapUrls].filter((url) => /\/\d{4}\/\d{2}\/\d{2}\//.test(url)).length;
    feedPostCount = expectedPosts;
    if (itemCount !== expectedPosts) failures.push(`${feedName} has ${itemCount} posts; expected ${expectedPosts}`);
  } catch (error) {
    failures.push(`Invalid ${feedName}: ${error.message}`);
  }
}

const homepageJsonLd = JSON.parse(load(await readFile(path.join(dist, 'index.html'), 'utf8'))('script[type="application/ld+json"]').text());
if (homepageJsonLd['@type'] !== 'WebSite') failures.push('Homepage is missing WebSite JSON-LD');

const archiveHtml = await readFile(path.join(dist, 'archive/index.html'), 'utf8');
const archive = load(archiveHtml);
const archiveArticles = archive('[data-article]').toArray();
if (archiveArticles.length !== feedPostCount) {
  failures.push(`Writing archive has ${archiveArticles.length} articles; expected ${feedPostCount}`);
}
const archiveHrefs = archiveArticles.map((article) => archive(article).find('h3 a').attr('href'));
if (new Set(archiveHrefs).size !== archiveHrefs.length) failures.push('Writing archive contains duplicate articles');
const expectedFilters = ['all', 'leadership', 'ai', 'software-engineering', 'data'];
const actualFilters = archive('[data-topic-filter]').toArray().map((button) => archive(button).attr('data-topic-filter'));
if (JSON.stringify(actualFilters) !== JSON.stringify(expectedFilters)) {
  failures.push(`Writing archive filters are incorrect: ${actualFilters.join(', ')}`);
}
for (const article of archiveArticles) {
  if (!expectedFilters.slice(1).includes(archive(article).attr('data-topic'))) {
    failures.push(`Writing archive article has invalid topic: ${archive(article).attr('data-topic')}`);
  }
  if (!archive(article).find('p').first().text().trim()) failures.push('Writing archive article is missing its introduction');
}
for (const yearGroup of archive('[data-year-group]').toArray()) {
  const headingYear = archive(yearGroup).find('h2').first().text().trim();
  if (!/^\d{4}$/.test(headingYear) || archive(yearGroup).find('[data-article]').length === 0) {
    failures.push(`Invalid or empty writing timeline year: ${headingYear}`);
  }
}

const archivePageCount = Math.ceil(feedPostCount / 5);
for (let page = 2; page <= archivePageCount; page += 1) {
  const redirect = load(await readFile(path.join(dist, `archive/${page}/index.html`), 'utf8'));
  if (redirect('meta[name="robots"]').attr('content') !== 'noindex, follow'
    || redirect('link[rel="canonical"]').attr('href') !== `${BASE_URL}/archive/`
    || !redirect('meta[http-equiv="refresh"]').attr('content')?.endsWith('/archive/')) {
    failures.push(`Archive page ${page} does not redirect cleanly to /archive/`);
  }
}

for (const { $, relativeFile } of publicPages.filter(({ $ }) => /\/\d{4}\/\d{2}\/\d{2}\//.test($('link[rel="canonical"]').attr('href') ?? ''))) {
  if ($('.article-topic').length !== 1) failures.push(`Article is missing its topic link: ${relativeFile}`);
  const relatedHrefs = $('.related-articles [data-article] h3 a').toArray().map((link) => $(link).attr('href'));
  if (relatedHrefs.length !== 3 || new Set(relatedHrefs).size !== relatedHrefs.length) {
    failures.push(`Article does not have three unique related links: ${relativeFile}`);
  }
}

const projectsJsonLd = JSON.parse(load(await readFile(path.join(dist, 'projects/index.html'), 'utf8'))('script[type="application/ld+json"]').text());
if (!projectsJsonLd['@graph']?.every((entry) => entry['@type'] === 'CreativeWork')) failures.push('Projects page is missing CreativeWork JSON-LD');
for (const { $, relativeFile } of publicPages.filter(({ $ }) => /\/\d{4}\/\d{2}\/\d{2}\//.test($('link[rel="canonical"]').attr('href') ?? ''))) {
  const data = JSON.parse($('script[type="application/ld+json"]').text());
  if (data['@type'] !== 'BlogPosting') failures.push(`Article is missing BlogPosting JSON-LD: ${relativeFile}`);
}

for (const metadataFile of allFiles.filter((file) => /(?:feed|rss|sitemap).*\.xml$/.test(file))) {
  if ((await readFile(metadataFile, 'utf8')).includes('hwolters.github.io')) {
    failures.push(`Legacy domain in ${path.relative(dist, metadataFile)}`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Site verification passed: ${publicPages.length} indexable pages, ${sitemapUrls.size} sitemap URLs, and ${feedPostCount} feed posts.`);
}
