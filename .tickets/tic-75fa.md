---
id: tic-75fa
status: closed
type: feature
assignee: hWolters
tags:
    - ui
    - content
created: 2026-06-30T07:30:39.360513Z
---
# Simplify blog design and add Archive, Projects, and About pages

Replace the marketing-style Astro design with a compact writing-first layout inspired by Daring Fireball and Lethain. Use only user-supplied copy, show the latest article on Home, add static Top and Latest archive sections, and add the supplied projects and About me content.

## Acceptance Criteria

Navigation is Home/Archive/Projects/About me; Home shows the latest article; Archive shows Top and Latest; Projects and About use supplied copy verbatim; article wording remains unchanged; responsive browser and npm verification pass.

## Notes

### 2026-06-30T07:42:00Z

Implemented the minimal writing-first layout with Home, Archive (Top and Latest), Projects, and About me. Preserved all 20 article bodies exactly, consolidated article assets into their correct public paths, and removed the old Writing page. npm run verify passes; desktop/mobile browser checks pass with no console errors or horizontal overflow.

