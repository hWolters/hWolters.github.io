import { readdir, readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { load } from 'cheerio';

const root = process.cwd();
const dist = path.join(root, 'dist');
const manifest = JSON.parse(await readFile(path.join(root, 'migration/article-manifest.json'), 'utf8'));
const failures = [];

function outputPath(urlPath) {
  const clean = decodeURIComponent(urlPath.split(/[?#]/)[0]);
  if (clean === '/') return path.join(dist, 'index.html');
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
  const canonicalFile = outputPath(article.canonicalPath);
  if (!existsSync(canonicalFile)) failures.push(`Missing canonical article: ${article.canonicalPath}`);

  for (const alias of article.aliases) {
    const aliasFile = outputPath(alias);
    if (!existsSync(aliasFile)) {
      failures.push(`Missing article alias: ${alias}`);
      continue;
    }
    const $ = load(await readFile(aliasFile, 'utf8'));
    const canonical = $('link[rel="canonical"]').attr('href');
    if (canonical !== `https://datadojo.dev${article.canonicalPath}`) {
      failures.push(`Incorrect alias target: ${alias} -> ${canonical}`);
    }
    if (!$('meta[name="robots"]').attr('content')?.includes('noindex')) {
      failures.push(`Alias is indexable: ${alias}`);
    }
  }
}

for (const [alias, target] of Object.entries(manifest.indexAliases)) {
  const $ = load(await readFile(outputPath(alias), 'utf8'));
  if ($('link[rel="canonical"]').attr('href') !== `https://datadojo.dev${target}`) {
    failures.push(`Incorrect index alias target: ${alias}`);
  }
}

for (const excluded of manifest.excludedRoutes) {
  if (existsSync(outputPath(excluded))) failures.push(`Excluded route was generated: ${excluded}`);
}

const htmlFiles = (await walk(dist)).filter((file) => file.endsWith('.html'));
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const $ = load(html);

  for (const element of $('a[href], img[src], script[src], link[href]').toArray()) {
    const attribute = element.name === 'a' || element.name === 'link' ? 'href' : 'src';
    const value = $(element).attr(attribute);
    if (!value?.startsWith('/') || value.startsWith('//')) continue;
    if (!existsSync(outputPath(value))) {
      failures.push(`Broken local ${attribute} in ${path.relative(dist, file)}: ${value}`);
    }
  }

  $('img').each((_, image) => {
    if (!$(image).attr('alt')?.trim()) {
      failures.push(`Missing image alt text in ${path.relative(dist, file)}: ${$(image).attr('src')}`);
    }
  });

  for (const element of $('link[rel="canonical"], meta[property="og:url"], meta[property="og:image"], meta[name="twitter:image"]').toArray()) {
    const value = $(element).attr('href') ?? $(element).attr('content') ?? '';
    if (value.includes('hwolters.github.io')) failures.push(`Legacy domain in metadata: ${path.relative(dist, file)}`);
  }
}

for (const file of (await walk(dist)).filter((item) => /(?:rss|sitemap).*\.xml$/.test(item))) {
  if ((await readFile(file, 'utf8')).includes('hwolters.github.io')) {
    failures.push(`Legacy domain in ${path.relative(dist, file)}`);
  }
}

const sitemapText = (await Promise.all(
  (await walk(dist)).filter((file) => /sitemap.*\.xml$/.test(file)).map((file) => readFile(file, 'utf8')),
)).join('\n');
for (const article of manifest.articles) {
  for (const alias of article.aliases) {
    if (sitemapText.includes(`https://datadojo.dev${alias}`)) failures.push(`Alias appears in sitemap: ${alias}`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Site verification passed for ${manifest.articles.length} articles and ${htmlFiles.length} HTML pages.`);
}
