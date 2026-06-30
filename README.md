# Data Dojo

Markdown source and Astro templates for [datadojo.dev](https://datadojo.dev/).

## Requirements

- Node.js 24
- npm 11

Install dependencies and start the local site:

```sh
npm install
npm run dev
```

## Writing

Create a draft article:

```sh
npm run new:post -- "Post title"
```

Articles live in `src/content/blog/`. Each Markdown file contains validated frontmatter followed by the article body. Set `draft: false` when an article is ready to publish.

Legacy articles intentionally retain their original wording. Their historical URL aliases are defined in `migration/article-manifest.json`.

## Verification

Run the complete production verification:

```sh
npm run verify
```

This validates Astro content and types, builds the static site, checks all migrated article text against its baseline, verifies canonical and alias routes, and checks local links, images, feeds, and canonical-domain metadata.

## Deployment

Changes merged to `master` are verified and deployed to GitHub Pages as a build artifact. Generated `dist/` output is never committed.
