# hWolters.github.io

This repository currently contains two things:

- The published static site at the repository root, which GitHub Pages serves.
- A restored Hugo source tree (`config.toml`, `content/`, `static/`, and `themes/hugo-tranquilpeak-theme-master/`) for adding future posts.

The restored source came from the repo history. It is useful as a starting point, but it does not yet contain Markdown/RMarkdown source for every currently published post after 2018. For that reason, `config.toml` builds into `public/` instead of overwriting the repository root.

## Requirements

This site uses Hugo `0.87.0`.

The required version is recorded in `.tool-versions`:

```sh
hugo 0.87.0
```

The restored Tranquilpeak theme uses Hugo APIs that were removed from newer Hugo releases. For that reason, `scripts/build-site.sh` checks the Hugo version and refuses to run with anything other than `0.87.0`.

If your Hugo binary has a non-standard name or path, pass it explicitly:

```sh
HUGO_BIN=/path/to/hugo-0.87.0 scripts/build-site.sh
```

The helper script for creating Markdown drafts does not require Hugo.

## Add Content

Most new writing should go under `content/post/`. Static assets such as screenshots, diagrams, and cover images should go under `static/post/<slug>/`.

Use lowercase, URL-safe filenames for slugs and images:

```text
content/post/2025-08-11-my-post-title.md
static/post/my-post-title/screenshot.png
```

Reference static assets from Markdown with root-relative URLs:

```md
![Screenshot](/post/my-post-title/screenshot.png)
```

### Create a New Blog Post

Create a draft with the helper:

```sh
scripts/new-post.sh "My New Blog Post"
```

Optionally pass a date:

```sh
scripts/new-post.sh "My New Blog Post" 2025-08-11
```

This creates a file under `content/post/` with `draft: true`.

You can also create a post with Hugo directly:

```sh
hugo new post/2026-06-07-my-new-blog-post.md
```

### Post Front Matter

Use this shape for Markdown posts:

```yaml
---
title: "My New Blog Post"
date: 2025-08-11T09:00:00+02:00
draft: true
categories:
- AI
tags:
- Playwright
- Hugo
keywords:
- keyword phrase
thumbnailImage: /post/my-post-title/cover.png
thumbnailImagePosition: bottom
coverImage: /post/my-post-title/cover.png
---
```

Keep `draft: true` while editing. Change it to `draft: false` when the post is ready for the normal production build.

### Add Images

Create one folder per post:

```sh
mkdir -p static/post/my-post-title
```

Copy images into that folder and rename them to readable URL-safe names:

```text
static/post/my-post-title/search-results.png
static/post/my-post-title/detail-page.png
```

Then reference them in the post:

```md
![Search results](/post/my-post-title/search-results.png)
```

## Test Changes

### 1. Check the Worktree

Before building, confirm the changed files are the ones you expect:

```sh
git status --short
git diff --stat
```

For new untracked files, `git diff --stat` will not show content until the files are staged. Use `git status --short` to confirm new posts and images are present.

### 2. Build the Site

Build a staged copy:

```sh
scripts/build-site.sh
```

The build output goes into `public/`, as configured by `publishDir = "public"` in `config.toml`.

The production build excludes posts where `draft: true`. To test a draft visually, either set `draft: false` temporarily before building or run a local Hugo preview with drafts enabled:

```sh
hugo server -D
```

If you use a custom Hugo binary:

```sh
/path/to/hugo-0.87.0 server -D
```

### 3. Review the Generated Site

After a successful build, review the generated `public/` directory before copying any generated files into the repository root for publication.

Check at least:

- the post page renders
- the post appears in the expected list or archive view when `draft: false`
- image links load from `/post/<slug>/...`
- the summary break `<!--more-->` appears in the right place
- metadata such as title, date, tags, and categories is correct

### 4. Publish

The root-level static site is still the canonical published output for GitHub Pages. The Hugo source builds into `public/` first so generated output can be reviewed before publication.

Do not assume editing `content/` alone publishes the post. After reviewing `public/`, copy the generated output into the repository root as the publication step.

Before committing, run:

```sh
git status --short
```

Commit both the source files and any publication output that should be served by GitHub Pages.

## Current Cleanup Status

The root-level static site is still the canonical published output. Legacy duplicate typo URLs are kept as redirect pages so old links continue to work.
