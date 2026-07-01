import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';

const manifest = JSON.parse(readFileSync(new URL('./migration/article-manifest.json', import.meta.url), 'utf8'));
const redirectUrls = new Set([
  ...manifest.articles.flatMap((article) => article.aliases),
  ...Object.keys(manifest.indexAliases),
].map((pathname) => `https://datadojo.dev${pathname}`));

export default defineConfig({
  site: 'https://datadojo.dev',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !redirectUrls.has(page) && page !== 'https://datadojo.dev/404.html',
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
