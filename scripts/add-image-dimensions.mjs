import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { load } from 'cheerio';
import sharp from 'sharp';

const root = process.cwd();
const dist = path.join(root, 'dist');
const metadataCache = new Map();

async function walk(directory) {
  const results = [];
  for (const entry of await readdir(directory)) {
    const fullPath = path.join(directory, entry);
    if ((await stat(fullPath)).isDirectory()) results.push(...await walk(fullPath));
    else results.push(fullPath);
  }
  return results;
}

function publicImagePath(src) {
  if (!src || src.startsWith('//')) return undefined;

  try {
    new URL(src);
    return undefined;
  } catch {
    // Local path; continue below.
  }

  const pathname = src.split(/[?#]/)[0];
  if (!pathname.startsWith('/')) return undefined;

  const normalized = path.posix.normalize(pathname);
  if (!normalized.startsWith('/')) return undefined;

  return path.join(root, 'public', normalized.slice(1));
}

async function imageMetadata(src) {
  if (metadataCache.has(src)) return metadataCache.get(src);

  const file = publicImagePath(src);
  if (!file || !existsSync(file)) {
    metadataCache.set(src, undefined);
    return undefined;
  }

  const { width, height } = await sharp(file).metadata();
  const metadata = width && height ? { width, height } : undefined;
  metadataCache.set(src, metadata);
  return metadata;
}

let updatedFiles = 0;
let updatedImages = 0;

for (const file of (await walk(dist)).filter((candidate) => candidate.endsWith('.html'))) {
  const html = await readFile(file, 'utf8');
  const $ = load(html, { decodeEntities: false });
  let changed = false;

  for (const image of $('img').toArray()) {
    const element = $(image);
    if (element.attr('width') && element.attr('height')) continue;

    const metadata = await imageMetadata(element.attr('src'));
    if (!metadata) continue;

    element.attr('width', String(metadata.width));
    element.attr('height', String(metadata.height));
    changed = true;
    updatedImages += 1;
  }

  if (changed) {
    await writeFile(file, $.html());
    updatedFiles += 1;
  }
}

console.log(`Added image dimensions to ${updatedImages} image(s) in ${updatedFiles} HTML file(s).`);
