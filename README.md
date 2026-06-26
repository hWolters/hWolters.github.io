# hWolters.github.io

This repository currently contains two things:

- The published static site at the repository root, which GitHub Pages serves.
- A restored Hugo source tree (`config.toml`, `content/`, `static/`, and `themes/hugo-tranquilpeak-theme-master/`) for adding future posts.

The restored source came from the repo history. It is useful as a starting point, but it does not yet contain Markdown/RMarkdown source for every currently published post after 2018. For that reason, `config.toml` builds into `public/` instead of overwriting the repository root.

## Add a Post

Create a draft with the helper:

```sh
scripts/new-post.sh "My New Blog Post"
```

Or, if Hugo is installed:

```sh
hugo new post/2026-06-07-my-new-blog-post.md
```

Edit the generated file under `content/post/`. Add images under `static/post/<slug>/` and reference them with `/post/<slug>/image-name.png`.

Build a staged copy:

```sh
scripts/build-site.sh
```

Review the generated `public/` directory before copying any generated files into the repository root for publication.

Hugo `0.87.0` is required for the build step. The restored Tranquilpeak theme uses APIs that were removed from newer Hugo releases, so `scripts/build-site.sh` refuses to run with a different Hugo version. If your Hugo binary has a non-standard name, run the build with `HUGO_BIN=/path/to/hugo-0.87.0 scripts/build-site.sh`.

The helper script can create Markdown drafts without Hugo.

## Current Cleanup Status

The root-level static site is still the canonical published output. Legacy duplicate typo URLs are kept as redirect pages so old links continue to work.
