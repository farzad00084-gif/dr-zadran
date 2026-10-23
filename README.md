# Dr. Khalid Khan Zadran — professional website

A multilingual editorial website for **Dr. Khalid Khan Zadran**, a consultant neurosurgeon and brain & spine surgeon in Kabul, Afghanistan.

The visual direction is an original “Art of Precision” system: deep forest, warm ivory, muted gold, anatomical linework, and oversized serif typography. The homepage also contains a full-bleed editorial interlude inspired by the scale and pacing of Kima, adapted to this project's own content and components.

> **Content status:** this is a professional website, not an emergency service. Portrait, clinic map/address, opening hours, email, WhatsApp availability, and several credential details remain **unverified and intentionally unpublished**. Editorial photographs are licensed and illustrative; none depicts the doctor or his clinic. See [CONTENT_VERIFICATION.md](./CONTENT_VERIFICATION.md) and [IMAGE_CREDITS.md](./IMAGE_CREDITS.md).

## Stack

- React 19 + JavaScript (no TypeScript)
- Vite 8
- Tailwind CSS 4 via `@tailwindcss/vite`
- React Router 7
- i18next + react-i18next
- Lucide React icons
- Self-hosted Fontsource families: DM Serif Display, Manrope, Noto Sans Arabic, Noto Naskh Arabic
- Vitest + Testing Library
- axe-core for automated accessibility checks

## Commands

Requires Node 22.12+ (developed on Node 24).

```bash
npm install
npm run dev        # local development server
npm run build      # production build + metadata prerender
npm run preview    # preview the production build
npm test           # unit and integration tests
npm run lint       # ESLint
npm run images:prepare  # regenerate licensed editorial photo derivatives
npm run images:client    # regenerate doctor-supplied photo derivatives
```

`npm run prerender` can be run separately after a build. It reads the already-built `dist/index.html` and writes localized route documents plus `sitemap.xml`, `robots.txt`, and `404.html`.

## Routes

| English | Dari | Pashto | Page |
| --- | --- | --- | --- |
| `/` | `/fa` | `/ps` | Home |
| `/about` | `/fa/about` | `/ps/about` | Professional profile |
| `/expertise` | `/fa/expertise` | `/ps/expertise` | Clinical expertise |
| `/patient-guide` | `/fa/patient-guide` | `/ps/patient-guide` | Patient guidance |
| `/research` | `/fa/research` | `/ps/research` | Research and publications |
| `/contact` | `/fa/contact` | `/ps/contact` | Clinic contact |
| `/privacy` | `/fa/privacy` | `/ps/privacy` | Privacy notice |

Unknown paths render a localized 404 page. English is unprefixed; Dari and Pashto are always prefixed. The URL is the source of truth for the active language, and the choice is also written to `localStorage` under `zadran-language`.

### Language behavior

- `<html lang>` and `dir` are updated per route (`ltr` for English, `rtl` for Dari and Pashto).
- The language switcher preserves the current path, query string, and hash.
- Dari and Pashto use Arabic-script typography and mirrored directional icons.
- Visible footer notices state that the Dari and Pashto translations have **not yet been medically reviewed**.
- The three translation files must keep identical key structures; this is enforced by a test.

## SEO and production metadata

`src/components/common/Seo.jsx` manages titles, descriptions, canonicals, hreflang, Open Graph, Twitter cards, and JSON-LD during client navigation. Because this is a static Vite app, `scripts/prerender.mjs` also writes route-specific HTML shells so crawlers receive localized metadata before JavaScript runs:

- 21 localized route documents (7 pages × 3 languages)
- localized `<title>`, description, canonical, hreflang, Open Graph and Twitter tags
- `Physician`, `WebPage`, and `BreadcrumbList` JSON-LD
- `sitemap.xml` with hreflang alternates
- `robots.txt`
- `404.html` with `noindex`
- `_redirects` for hosts that support Netlify-style rules

### Required deployment configuration

Set an absolute production origin before building:

```bash
# .env.production (or the host's environment settings)
VITE_SITE_URL=https://your-production-domain.example
SITE_URL=https://your-production-domain.example
```

`SITE_URL` drives the prerendered canonical/hreflang/sitemap output. `VITE_SITE_URL` is also available to the client app. Both should be the same origin.

If neither variable is set, the build **succeeds with a warning** and uses the reserved, non-routable placeholder `https://drkhalidzadran.example` in static metadata. Replace it before deployment. The client also falls back to the real deployment origin at runtime on non-local hosts, but that does not repair prerendered sitemap URLs.

The generated site is static. Serve directory indexes (`/about/index.html`, `/fa/about/index.html`) and the root `404.html`; do not rewrite unknown paths to a 200 response. The included `_redirects` keeps missing routes on the 404 document while allowing existing prerendered files to win.

## Content integrity

This project deliberately separates **publicly verified facts**, **client-supplied details**, and **withheld claims**:

- The only publication listed is the 2025 *Asian Journal of Neurosurgery* article with DOI `10.1055/s-0045-1805035`, PubMed `40485786`, and PMC `PMC12136956`.
- WhatsApp is gated by `doctor.whatsapp.verified`. Until that flag is changed after clinic confirmation and a real-device test, `buildWhatsAppUrl()` returns `null` and the UI shows “confirmation pending” with the telephone fallback.
- No clinic street address, map embed, opening hours, email, emergency number, testimonials, patient statistics, or invented service outcomes are published.
- The portrait is a clearly marked designed placeholder, not another person's photograph.
- Do not confuse this doctor with **Khalid Zadran**, the Kabul police spokesperson. No police or security-spokesperson content belongs on this site.

Update `CONTENT_VERIFICATION.md` whenever a fact is added or changed. Never add a claim just to fill a layout gap.

## Accessibility and motion

- Semantic landmarks, a skip link, one `h1` per page, visible focus styles, and keyboard-operable navigation.
- Mobile menu moves focus into the panel, traps focus, closes on Escape, and restores focus to the trigger.
- All images and decorative SVGs are labeled or hidden appropriately.
- Color contrast has been tuned to WCAG 2.2 AA; automated axe checks are run at mobile and desktop widths.
- The scroll experience uses native smooth anchor scrolling, a thin reading-progress line, staggered `IntersectionObserver` reveals, progressive CSS scroll-linked section/card drift, and a restrained image drift.
- `prefers-reduced-motion` disables scroll-linked transforms, reveal animations, hero animations, line drawing, directional movement, the scroll cue, and image drift. Content remains fully visible without JavaScript.
- Editorial photography uses responsive WebP/JPEG sources, intrinsic dimensions, lazy loading below the fold, visible credits, and descriptive alt text. The four images are licensed, illustrative, and never presented as the doctor, his clinic, or his patients. The designed portrait remains a marked placeholder; no stock person is substituted for Dr. Zadran. See [IMAGE_CREDITS.md](./IMAGE_CREDITS.md).
- Doctor-supplied imagery is used on the hero and about sections and as an illustrative visual for each area of expertise. These are treated as approved client-supplied assets and are locally generated into WebP/JPEG derivatives by `npm run images:client`; see [IMAGE_CREDITS.md](./IMAGE_CREDITS.md).

Automated checks are not a certification. A manual screen-reader and real-device pass is still recommended before launch.

## Project structure

```text
src/
  components/
    about/        biography, credentials, timeline, memberships
    art/          anatomical linework
    common/       shared UI, SEO, buttons, portrait placeholder
    expertise/    expertise cards and detail rows
    home/         homepage sections, including the editorial interlude
    layout/       header, footer, menus, breadcrumbs, scroll/focus helpers
    patient/      FAQ and preparation components
    research/     publication card
  data/           doctor, navigation, publications, editorial image manifest
  hooks/          language helper
  i18n/           i18next init and en/fa/ps resources
  pages/          route pages
  styles/         Tailwind tokens, typography, motion, accessibility overrides
  utils/          localized paths, contact gating, SEO schema
scripts/
  prerender.mjs   route metadata, sitemap, robots, 404
  prepare-editorial-images.mjs  licensed photo derivatives
  qa-*.mjs        headless Edge visual, responsive, and axe checks
tests/            Vitest + Testing Library suite
public/           favicon, social card, robots/redirect source, editorial images
```

## Testing

```bash
npm test
npm run lint
npm run build
```

The suite covers localized routing, translation key parity, WhatsApp gating, publication provenance, route metadata, app rendering, RTL direction, and language switching. The QA scripts require Microsoft Edge and use its remote debugging protocol:

```bash
node scripts/qa-screenshot.mjs http://127.0.0.1:4174/ 390 844 shot.png full
node scripts/qa-audit.mjs http://127.0.0.1:4174
node scripts/qa-axe.mjs http://127.0.0.1:4174
```

## Known limitations

- The doctor's portrait is still pending approval; the current portrait is a marked placeholder.
- Editorial photographs are licensed stock/archive images, clearly captioned as illustrative. They are not photographs of the clinic or the doctor.
- Dari and Pashto copy has not been medically reviewed.
- WhatsApp is intentionally disabled.
- Contact details are limited to the supplied clinic telephone number.
- The deployment domain and host are not configured in this repository.
- Only one publication could be confidently attributed; additional research may exist but is not listed without verification.

## Fonts and assets

Fonts are self-hosted from Fontsource (SIL Open Font License). The favicon, social card, and anatomical artwork are original SVG/CSS assets created for this project. The social card contains no portrait and makes no clinical claim. Editorial photographs and their licences are documented in [IMAGE_CREDITS.md](./IMAGE_CREDITS.md); all are treated consistently and captioned as illustrative.

## Contact

**Dr. Khalid Khan Zadran**  
Consultant Neurosurgeon · Kabul, Afghanistan  
Clinic telephone: [+93 78 765 4751](tel:+93787654751)  
Clinical affiliation: Rifah Medical Complex, Kabul (client-supplied; not independently verified)

This website does not provide medical advice and is not monitored for emergencies.
