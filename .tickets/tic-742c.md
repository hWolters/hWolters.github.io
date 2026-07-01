---
id: tic-742c
status: closed
type: task
assignee: hWolters
parent: tic-c181
tags:
    - verification
    - accessibility
deps:
    - tic-3953
created: 2026-06-29T13:24:16.555677Z
---
# Verify migrated site end to end

Run content parity, route, link, asset, metadata, responsive, keyboard, and accessibility validation before production cutover.

## Acceptance Criteria

All migration checks pass and a deployed preview has no serious or critical accessibility findings or broken article routes/assets.

## Notes

### 2026-06-29T13:55:05Z

Final npm verification passed: 0 Astro diagnostics, 20/20 article parity, 36 HTML routes, canonical/alias/link/asset/domain checks. Playwright passed at 375px and 1440px with no overflow or console errors.

