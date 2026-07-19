# 3pandalabs-website

3PandaLabs org landing page ("home base") — links out to shipped apps. Public repo, part of the entry-point/index-repo tier in the org's repo convention (product code lives in separate repos, e.g. `nrighar`, `receiptcash`).

## Stack
Static site, no build step, no framework, no package.json. Two files:
- `index.html` — full page markup (nav, hero, apps grid, footer)
- `styles.css` — all styling, CSS custom properties in `:root` for theme (light/dark via `prefers-color-scheme`)

Deployed on Vercel (`.vercel/project.json` links it — do not need to read that file, it's just the project/org ID pairing).

## Conventions
- Brand wordmark: `3PandaLabs` — one word, camelCase, exactly as it appears in `<title>`, `.brand-name`, footer. Never "3PandA Labs" or with a space.
- Brand mark is a CSS-only panda-emoji "A" logo (`.brand-mark`, three 🐼 spans positioned/rotated to form an A-shape with a `::after` crossbar) — no image/SVG asset.
- Contact address: `3pandas@3pandalabs.com`.
- Accent color: `--accent: #2f7a4f` (light) / `#4fbf7d` (dark).

## Apps grid
The `.app-grid` in `index.html` is the canonical list of shipped/upcoming apps — update it when a new product ships. Currently: ReceiptCash (`receiptcash.3pandalabs.com`), NRIGhar (`nrighar.3pandalabs.com`), one placeholder slot.

## Editing
Both files are small enough to read in full when making changes — no partial-read shortcuts needed. No tests, no lint config, no CI beyond Vercel's own build/deploy on push.
