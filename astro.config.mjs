import { defineConfig } from 'astro/config';
import { BASE_URL } from './site.config.mjs';

export default defineConfig({
  site: BASE_URL,
  output: 'static',
  trailingSlash: 'always',
  integrations: [],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
