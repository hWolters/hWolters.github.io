---
id: tic-3a67
status: in_progress
type: bug
priority: 2
assignee: hWolters
tags:
    - ci
    - deployment
created: 2026-07-01T06:12:12.260272Z
---
# Repair and deploy GitHub Pages build

The merged Astro deployment fails because package-lock.json contains versionless optional dependency placeholders rejected by npm 11.13 on GitHub Actions. Regenerate the lockfile, verify with the runner npm version, and deploy the feature branch.

## Acceptance Criteria

npm 11.13 accepts the lockfile; npm run verify passes; GitHub Pages deployment completes successfully.

