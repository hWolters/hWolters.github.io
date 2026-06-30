import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('Usage: npm run new:post -- "Post title"');
  process.exit(1);
}

const date = new Date().toISOString().slice(0, 10);
const slug = title
  .normalize('NFKD')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');
const directory = path.join(process.cwd(), 'src/content/blog');
const target = path.join(directory, `${date}-${slug}.md`);

await mkdir(directory, { recursive: true });
await writeFile(
  target,
  `---\ntitle: ${JSON.stringify(title)}\ndescription: ""\npublishDate: ${JSON.stringify(date)}\nslug: ${JSON.stringify(slug)}\npillar: "ai-data"\ntags: []\ndraft: true\nfeatured: false\n---\n\nWrite the introduction here.\n`,
  { flag: 'wx' },
);

console.log(`Created ${path.relative(process.cwd(), target)}`);
