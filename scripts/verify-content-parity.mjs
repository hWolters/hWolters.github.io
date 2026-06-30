import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { load } from 'cheerio';

const root = process.cwd();
const baseline = JSON.parse(await readFile(path.join(root, 'migration/content-baseline.json'), 'utf8'));
const manifest = JSON.parse(await readFile(path.join(root, 'migration/article-manifest.json'), 'utf8'));
let failures = 0;

function normalizeVisibleText(value) {
  return value.replaceAll('\u00a0', ' ').replace(/\s+/g, ' ').trim();
}

function hash(value) {
  return createHash('sha256').update(value).digest('hex');
}

for (const article of manifest.articles) {
  const outputFile = path.join(root, 'dist', article.canonicalPath.slice(1), 'index.html');
  const html = await readFile(outputFile, 'utf8');
  const $ = load(html);
  const title = $('.article-header h1').first().text().trim();
  const body = normalizeVisibleText($('.article-content').first().text());
  const actual = `${title}\n${body}`;
  const expected = baseline[article.canonicalPath];

  if (!expected || hash(actual) !== expected.sha256) {
    failures += 1;
    console.error(`Content parity failed: ${article.canonicalPath}`);
    console.error(`  expected ${expected?.sha256 ?? 'missing baseline'} (${expected?.normalizedCharacters ?? 0} chars)`);
    console.error(`  actual   ${hash(actual)} (${actual.length} chars)`);
  }
}

if (failures) {
  process.exitCode = 1;
} else {
  console.log(`Content parity passed for ${manifest.articles.length} articles.`);
}
