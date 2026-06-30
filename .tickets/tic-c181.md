---
id: tic-c181
status: closed
type: epic
assignee: hWolters
tags:
    - astro
    - migration
created: 2026-06-29T13:24:01.281485Z
---
# Rebuild blog as a Markdown-first Astro site

Replace the legacy Hugo and generated-output publishing model with a static Astro site. Preserve all 20 unique articles verbatim, preserve canonical and alias article routes, retain Home/Writing/About, and remove unrelated legacy project and taxonomy features.

## Acceptance Criteria

All original articles are served from one Markdown source each; established article URLs resolve; article wording is unchanged; GitHub Pages deploys an Astro artifact; obsolete Hugo and generated-site files are removed.

## Notes

### 2026-06-29T13:55:05Z

All child tickets completed and final verification passed.

