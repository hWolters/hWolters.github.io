# hWolters.github.io

Hugo source and published assets for [datadojo.dev](https://datadojo.dev/).

## Repository model

- Hugo source lives in `content/`, `static/`, `themes/`, and `config.toml`.
- Historical generated output lives at the repository root. Some published posts do not have restored source, so this output must be preserved.
- Local builds write to the ignored `public/` directory.
- `.github/workflows/deploy-pages.yml` overlays a fresh Hugo build onto the historical output on `master`; GitHub Pages serves that branch from the repository root.

## Requirements

Use Hugo Extended `0.87.0`, as pinned in `.tool-versions`. The restored theme is incompatible with newer Hugo releases, and `scripts/build-site.sh` rejects other versions.

If the pinned binary is not on `PATH`, set it explicitly:

```sh
HUGO_BIN=/path/to/hugo-0.87.0 scripts/build-site.sh
```

## Authoring

Create a draft:

```sh
scripts/new-post.sh "Post title" [YYYY-MM-DD]
```

Posts and their assets use these locations:

```text
content/post/YYYY-MM-DD-post-slug.md
static/post/post-slug/image.png
```

Reference assets with root-relative paths, for example `/post/post-slug/image.png`. Keep `draft: true` while editing and set it to `false` before publishing. Use `<!--more-->` to define the list-page summary.

## Build and preview

```sh
scripts/build-site.sh
hugo server -D
```

The production build excludes drafts and writes to `public/`. Do not commit that directory.

## Deployment

Source changes merged to `master` run `.github/workflows/deploy-pages.yml`. The workflow commits generated output back to `master`, after which the configured branch-based GitHub Pages deployment publishes it. Generated-only commits do not retrigger the workflow.

The workflow can also be run manually from the Actions tab.
