# 3pandalabs-website

3PandaLabs org landing page ("home base") — links out to shipped apps. Public repo, part of the entry-point/index-repo tier in the org's repo convention (product code lives in separate repos, e.g. `nrighar`, `receiptcash`).

## Stack
Static site, no build step, no framework, no package.json. All files live inside `public/` (this is the Cloudflare Workers assets directory — do not add files at repo root, they won't be served):
- `public/index.html` — full page markup (nav, hero, apps grid, footer)
- `public/styles.css` — all styling, CSS custom properties in `:root` for theme (light/dark via `prefers-color-scheme`)
- `public/robots.txt` and `public/sitemap.xml` — hand-written, no generator. Cloudflare merges its own managed block into the served `robots.txt`, so verify the `Sitemap:` line survives after a deploy. The sitemap exists because this page is the only inbound link to most of the org's app subdomains: it being crawled is what makes them discoverable at all.

**Deployed on Cloudflare Workers** (migrated off Vercel 2026-07-22 — `.vercel/project.json` is stale, the Vercel project is a decommission-candidate, not deleted). `wrangler.jsonc` configures a zero-JS static-assets Worker with `custom_domain` routes for both `3pandalabs.com` and `www.3pandalabs.com`. Deploy with `npx wrangler deploy` from repo root — no build step needed, just uploads whatever's in `public/`.

**Gotcha (hit 2026-07-22): don't point Wrangler's `assets.directory` at the repo root.** It has no built-in respect for `.gitignore`, and a `.assetsignore` file didn't reliably exclude everything either — the first deploy attempt uploaded the entire `.git` directory (objects, refs, hooks) as publicly-servable static assets. Caught before going live (never got a working custom domain until this was fixed) by checking asset count during deploy — 155 files for a 2-file site is an obvious tell. Keeping site content in its own `public/` folder sidesteps the whole class of bug.

## Conventions
- Brand wordmark: `3PandaLabs` — one word, camelCase, exactly as it appears in `<title>`, `.brand-name`, footer. Never "3PandA Labs" or with a space.
- Brand mark is a CSS-only panda-emoji "A" logo (`.brand-mark`, three 🐼 spans positioned/rotated to form an A-shape with a `::after` crossbar) — no image/SVG asset.
- Contact address: `3pandas@3pandalabs.com`.
- Accent color: `--accent: #2f7a4f` (light) / `#4fbf7d` (dark).

## Apps grid
The `.app-grid` in `index.html` is the canonical list of shipped/upcoming apps — update it when a new product ships. Currently: RentVault (live, `nrighar.3pandalabs.com` — host still uses the old name, see the `nrighar` repo's CLAUDE.md), RsvpVault (live, `rsvpvault.3pandalabs.com` — unlike RentVault this host *was* renamed to match the product, because a domain spelling a name the site never used could not be found in search), MealMargin (beta since 2026-11-22, `mealmargin.3pandalabs.com`), BorrowVault (coming soon, but linked since 2026-11-09 so Google can discover `borrowvault.3pandalabs.com`; its card uses a real logo, `public/borrowvault-icon.png`, instead of an emoji — `.app-card-icon img` in styles.css), TransitVault (beta, public launch 2026-11-10; card icon `public/transitvault-icon.svg` is the app's own `web/src/app/icon.svg`), AdVault (beta, added 2026-11-20, `advault.3pandalabs.com`; card icon `public/advault-icon.svg` is the app's own `web/src/app/icon.svg`; listed with terms/privacy/content policy in `terms.html` and `privacy.html`). SpendVault (beta, added 2026-11-22, `spendvault.3pandalabs.com`). ReceiptCash was removed 2026-11-22 (being folded into SpendVault). TaskVault is private and deliberately not listed.

When a card's href changes, it is not just a link: this page is the main discovery path to the app subdomains, so a stale href points search engines at a hostname that no longer serves the site.

Card states: a live app is an `<a class="app-card app-card-live">`; a not-yet-public one is a plain `<div class="app-card">` with no href, so the grid never links to something that isn't ready. Status is shown by a `.app-card-badge` in the title — `Beta` uses the filled accent style, `Coming soon` adds `.app-card-badge-soon` for the outlined muted style. Drop the badge entirely once an app is generally available.

## Editing
Both files are small enough to read in full when making changes — no partial-read shortcuts needed. No tests, no lint config, no CI beyond Vercel's own build/deploy on push.

## Contact and legal pages (2026-11-17)
`public/contact.html`, `terms.html`, `privacy.html`, `refunds.html`, served at `/contact`, `/terms`, `/privacy`, `/refunds` (Workers assets drop the `.html`). They exist because the shared 3PandaLabs Stripe account lists this site as the business website, and Stripe expects contact, terms, privacy and refund pages there. They are company-level umbrellas: each app's own terms/privacy govern that app and are linked from them. Keep them factual: the privacy page says the site has no cookies or third-party analytics and describes the contact form (`public/contact.js` -> AdVault API `POST /contact` with `site: "3pandalabs"`), so adding any of those means updating it. Every page loads our own visit counter (`counts.3pandalabs.com/c.js`, 3pandalabs/admin `visits/`, totals only, described on the privacy page). **No street address or personal phone number on these pages** (the founders' home address must stay off public records). The LLC's public business phone, +1 (332) 316-8453, is fine (2026-11-24). Linked from every page's footer and listed in `sitemap.xml`. When an app goes public with its own terms, add it to the app lists in `terms.html` and `privacy.html`.

## Brand consistency (2026-11-22)
Follows the brand repo's "Consistency rules" (brand.md): every page's footer has `© 3PandaLabs LLC, USA.` and `All rights reserved.` as two separate spans (copyright left, rights right; links row and Follow us row above, as on AdVault) plus the `.footer-tagline` line; titles are `3PandaLabs — Built by pandas. Loved by people.` (home) and `<Page> — 3PandaLabs`; every page carries og:* + `twitter:card=summary_large_image` with `og:image` = `https://3pandalabs.com/og.png` (copied from brand `og/out/3pandalabs.png`); `apple-touch-icon.png` (180x180) is from brand `logo/panda-mark-color-800.png`. A new page copies the same head + footer.
