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

From the repository root, install dependencies and create a draft article:

```sh
npm install
npm run new:post -- "Post title"
```

The command creates a dated Markdown file in `src/content/blog/`. Each article contains validated frontmatter followed by the article body:

```yaml
---
title: "Post title"
description: "A concise summary of the article."
publishDate: "2026-07-01"
slug: "post-title"
pillar: "ai-data"
tags: ["AI", "Data"]
draft: true
featured: false
---
```

Replace the generated description, then write the article below the frontmatter using Markdown. `pillar` must be one of:

- `ai-data`
- `data-systems`
- `leadership-management`

To add images, place them in `public/post/<slug>/` and reference them from the article with an absolute site path and descriptive alternative text:

```md
![Description of the image](/post/post-title/image.png)
```

Preview the site locally while writing:

```sh
npm run dev
```

Draft articles are excluded from the site, archive, and RSS feed. When the article is ready to publish, set `draft: false` and run the complete verification:

```sh
npm run verify
```

The published URL is derived from `publishDate` and `slug`:

```text
https://datadojo.dev/YYYY/MM/DD/slug/
```

Commit the Markdown file and any images, then merge the change into the default branch (`master`, or `main` after a future branch rename). Every push to either branch makes GitHub Actions verify and deploy the complete site to GitHub Pages. Do not commit the generated `dist/` directory.

Legacy articles intentionally retain their original wording. Their historical URL aliases are defined in `migration/article-manifest.json`.

## Verification

Run the complete production verification:

```sh
npm run verify
```

This validates Astro content and types, builds the static site, checks all migrated article text against its baseline, verifies canonical and alias routes, and checks local links, images, feeds, and canonical-domain metadata.

## Deployment

Every push to `master` or `main` is verified and deployed to GitHub Pages as a build artifact. The workflow records the deployed commit in `deployment.txt` and verifies that both the GitHub Pages URL and `https://datadojo.dev` serve that commit before reporting success. Generated `dist/` output is never committed.

The repository's Pages settings must use **GitHub Actions** as the publishing source and `datadojo.dev` as the custom domain. GitHub ignores `CNAME` files for custom Actions workflows, so the repository setting is the authoritative domain configuration.
