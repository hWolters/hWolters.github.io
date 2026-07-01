---
id: tic-3a67
status: closed
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

## Notes

### 2026-07-01T06:29:39Z

Regenerated the malformed lockfile, reproduced the GitHub runner install with npm 11.13, and verified the full site. Applied the repair to master as 256012b and completed GitHub Pages workflow run 28497710694 successfully. The deployed Astro site is live at https://hwolters.github.io/. datadojo.dev remains blocked by GitHub custom-domain ownership verification: the repository reports no CNAME, the API says the domain is already taken, and DNS has no _github-pages-challenge-hwolters TXT record.

