# CLAUDE.md — A-Worthy Website

## Project Overview

Marketing website for **A-Worthy**, a Singapore-based tuition centre offering O-Level English, O-Level Mathematics, H1 General Paper, and H2 Economics. Static site built with Astro, deployed to https://a-worthy.com.

## Tech Stack

- **Framework**: Astro 6.x (static site generator) with `@astrojs/sitemap`
- **Language**: TypeScript (strict mode via `astro/tsconfigs/strict`)
- **Styling**: Plain CSS with CSS custom properties — no Tailwind, no preprocessors
- **JavaScript**: Vanilla JS only — no React, Vue, jQuery, or other UI frameworks
- **Images**: sharp for SVG→PNG OG image conversion at build time
- **Node**: >=22.12.0

## Commands

```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Build to ./dist/ (prebuild converts OG SVGs to PNGs via sharp)
npm run preview   # Preview production build
```

There are no tests, linting, or formatting commands configured.

## Project Structure

```
src/
├── components/     # Reusable Astro components
│   ├── Header.astro          # Desktop + mobile nav, theme toggle, search trigger
│   ├── Footer.astro          # Site footer with links and contact info
│   ├── PdfPreviewModal.astro # Full-screen PDF preview overlay for resource samples
│   └── PenAnimation.astro    # SVG fountain pen calligraphy animation ("You are worth the A")
├── layouts/
│   └── BaseLayout.astro      # Master HTML template (see "BaseLayout Features" below)
├── pages/          # File-based routing (31 pages)
│   ├── index.astro           # Homepage (~2700 lines — largest page, audience selector)
│   ├── about.astro           # About the centre, founder's personal story, video placeholder
│   ├── programmes.astro      # Programme overview
│   ├── h2-economics.astro    # H2 Economics subject page (sticky TOC, schedule, related links)
│   ├── h1-general-paper.astro # H1 GP subject page (sticky TOC, schedule, related links)
│   ├── o-level-english.astro # O-Level English subject page (sticky TOC, schedule, related links)
│   ├── o-level-mathematics.astro # O-Level Mathematics subject page (sticky TOC, schedule, related links)
│   ├── results.astro         # Student results and statistics
│   ├── resources.astro       # Resource vault with email gating (17 resources, 6 categories)
│   ├── testimonials.astro    # Testimonials with carousel and video section
│   ├── contact.astro         # Contact form, trial booking form, online badge
│   ├── pricing.astro         # Pricing comparison table with FAQ
│   ├── blog/
│   │   ├── index.astro       # Blog article previews
│   │   ├── feed.xml.js       # RSS feed generator
│   │   ├── comprehension-techniques.astro
│   │   ├── economics-essay-diagrams.astro
│   │   ├── exam-prep-timeline.astro
│   │   ├── gp-essay-examples.astro
│   │   ├── gp-essay-structure.astro
│   │   ├── h2-econs-case-study-tips.astro
│   │   ├── o-level-cut-off-points-2026.astro
│   │   ├── o-level-english-tips-2026.astro
│   │   ├── situational-writing-guide.astro
│   │   └── why-smart-students-fail.astro
│   ├── lp/                   # Landing pages for paid traffic
│   │   ├── gp-tuition.astro
│   │   ├── english-tuition.astro
│   │   └── econs-tuition.astro
│   ├── success-stories.astro # Student transformation case studies (4 stories)
│   ├── parent-portal.astro   # Parent portal preview with feature cards (coming soon)
│   ├── accessibility.astro   # WCAG 2.2 AA accessibility statement
│   ├── privacy-policy.astro  # PDPA-compliant privacy policy (linked from cookie consent banner and footer)
│   └── 404.astro             # Not found page with navigation links
└── styles/
    └── global.css            # Design system with CSS custom properties
scripts/
└── convert-og-images.mjs     # Prebuild script: converts SVG OG images to PNG via sharp
public/
├── images/
│   ├── logo.svg              # Site logo
│   ├── og-default.svg/png    # Default Open Graph image
│   ├── og-english.svg/png    # O-Level English OG image
│   ├── og-gp.svg/png         # H1 GP OG image
│   ├── og-econs.svg/png      # H2 Economics OG image
│   ├── og-maths.svg/png      # O-Level Mathematics OG image
│   ├── og-blog.svg/png       # Blog OG image (general blog posts)
│   ├── illustration-*.svg    # Programme card illustrations (english, gp, econs, maths, coaching)
│   ├── icon-*.svg            # Resource vault icons (scoring, essay, comprehension, vocabulary, situational, grammar)
│   └── section-divider.svg   # Decorative section divider
├── docs/samples/             # Sample PDF resources (grammar, essays, vocabulary, etc.)
├── sw.js                     # Service worker (cache-first for assets, network-first for navigation)
├── manifest.json             # PWA manifest
├── robots.txt                # Search engine directives
├── apple-touch-icon.svg      # iOS home screen icon
├── favicon.ico
└── favicon.svg
```

## Astro Component Pattern

Every `.astro` file follows this structure:

```astro
---
// Frontmatter: imports, props, server-side logic
import BaseLayout from '../layouts/BaseLayout.astro';
---

<!-- Template: HTML with expressions -->
<BaseLayout title="Page Title">
  <section class="section">
    <div class="container">
      ...
    </div>
  </section>
</BaseLayout>

<style>
  /* Scoped CSS for this component */
</style>

<script>
  /* Client-side JS (optional) */
</script>
```

All pages wrap content in `<BaseLayout>` which provides:
- Meta tags (Open Graph with `ogImage` prop, Twitter Card, canonical URL)
- Schema.org structured data (EducationalOrganization + LocalBusiness, Course, FAQPage, Person)
- Google Fonts async loading
- Theme initialization from localStorage (with `prefers-color-scheme` auto-detect)
- ClientRouter for page transitions (`astro:transitions`)
- Scroll progress bar (fixed top)
- Breadcrumb navigation
- Scroll-reveal animation observer (re-initializes on `astro:page-load` for view transitions)
- Animated number counters (re-initializes on `astro:page-load`; bfcache `pageshow` fix)
- Back-to-top button
- Global sticky CTA bar (hidden on homepage)
- WhatsApp chat widget (with preview bubble)
- FAQ chatbot widget (pre-defined Q&A)
- Email capture popup (exit-intent + 45s timer, localStorage dismissal)
- Site search overlay (Ctrl+K / Cmd+K)
- Service worker registration
- Privacy consent notice

## Design System (global.css)

### Color Tokens

| Token | Light | Dark | Purpose |
|-------|-------|------|---------|
| `--bg-primary` | #FDFBF7 | #0b0b0f | Page background |
| `--bg-secondary` | #F5F1EB | #111118 | Section alternate background |
| `--bg-card` | rgba(255,255,255,0.7) | rgba(255,255,255,0.03) | Card background |
| `--text-primary` | #1A2A3A | #f0f0f2 | Headings and body text |
| `--text-secondary` | rgba(26,42,58,0.7) | rgba(240,240,242,0.65) | Secondary text |
| `--text-muted` | rgba(26,42,58,0.45) | rgba(240,240,242,0.4) | Muted/subtle text |
| `--color-primary` | #2B5A8C | #2B5A8C | Trust blue — headings, CTAs |
| `--color-accent` | #D4853A | #E09850 | Warm gold-orange — highlights, badges |
| `--color-accent-light` | #e8a060 | #f0b878 | Lighter accent for hovers |
| `--border-color` | rgba(26,42,58,0.1) | rgba(255,255,255,0.08) | Borders and dividers |
| `--bg-footer` | #1A2A3A | #0b0b0f | Footer background |

### Typography

- **Headings**: `'Nunito'` (sans-serif, weights 200–900)
- **Body**: `'Nunito'` (sans-serif)
- **Mono**: `'JetBrains Mono'`
- **Script** (pen animation): `'Pinyon Script'`

Heading weights: h1 = 200 (light), h2 = 400, h3 = 700.

### Spacing Scale

| Token | Value |
|-------|-------|
| `--space-xs` | 0.5rem |
| `--space-sm` | 0.75rem |
| `--space-md` | 1rem |
| `--space-lg` | 1.5rem |
| `--space-xl` | 2rem |
| `--space-2xl` | 2rem |
| `--space-3xl` | 1.75rem (responsive: 1.5rem at ≤768px, 1rem at ≤480px; scales up to 2.25rem at ≥1025px, 2.5rem at ≥1441px) |

Subject pages use hardcoded tight spacing (1.25rem desktop, 1rem tablet, 0.75rem phone) instead of tokens — do not revert to `var(--space-*)` references on these pages.

### Layout Tokens

- `--container-max`: 1200px
- `--page-padding`: 4rem
- `--header-height`: 72px
- `--border-radius`: 4px / `--border-radius-lg`: 8px
- `--transition-fast`: 0.2s / `--transition-slow`: 0.65s (both cubic-bezier)

### Breakpoints

- Phone: ≤480px
- Phone landscape / small tablet: 481px–768px
- Tablet: 769px–1024px
- Desktop: 1025px–1440px
- Large desktop: 1441px–1920px
- 4K: 1921px+

### Key CSS Classes

- `.container` — max-width: var(--container-max), centered with page-padding
- `.section` — standard vertical padding (var(--space-3xl) = 1.75rem desktop)
- `.section-title` — centered section heading
- `.section-subtitle` — centered muted subtitle (max-width: 640px)
- `.eyebrow` — uppercase mono label in accent color
- `.sr-only` — screen reader only (visually hidden)
- `.btn` — base button (transparent, uppercase, bordered)
- `.card` — elevated box with hover effect (also `.t-card`, `.r-card`, `.programme-card`, `.approach-card`)

### Dark Mode

Dark mode uses `[data-theme="dark"]` on `<html>`. All color tokens are overridden in this scope. Additional dark-mode features:
- Noise texture overlay on body (`::before` pseudo-element)
- Ambient glow box-shadow on card elements
- Accent color shifted warmer (#D4853A → #E09850)

Theme is toggled by the Header component's theme button and persisted in `localStorage`.

## Animation System

Scroll-triggered animations via IntersectionObserver (defined in BaseLayout). Both the scroll-reveal observer and animated counters are wrapped in named functions (`initScrollReveal`, `initCounters`) that run on initial load AND on `astro:page-load` to survive ClientRouter view transitions.

```html
<div data-animate="reveal-up">Fades in upward</div>
<div data-animate="reveal-up" data-animate-delay="1">Staggered delay</div>
<span data-count="95">0</span>                     <!-- Animated counter -->
<span data-count="95" data-count-suffix="%">0</span> <!-- Counter with suffix -->
```

**Important**: `data-animate="reveal-up"` uses `clip-path: inset(100% 0 0 0)` which completely hides elements while preserving layout space. If the IntersectionObserver fails to fire (e.g., due to view transitions), content becomes invisible with large white gaps. For this reason, `data-animate` has been **removed from all subject pages, landing pages, programmes, and success-stories**. It remains on: homepage, about, results, testimonials, contact, pricing, resources, blog, and parent-portal.

Do NOT add `data-animate` back to subject pages, landing pages, programmes, or success-stories.

## Routing

- File-based: `src/pages/about.astro` → `/about/`
- Subject pages: `src/pages/h2-economics.astro` → `/h2-economics/`
- Trailing slashes enforced (`trailingSlash: 'always'` in astro.config.mjs)
- Build format: `directory` (creates `/page/index.html` not `/page.html`)
- Active nav link detection uses `Astro.url.pathname`
- Sitemap auto-generated via `@astrojs/sitemap` integration

## Key Conventions

1. **Minimal dependencies** — Astro, @astrojs/sitemap, sharp (build); no UI frameworks or CSS libraries. fuse.js was removed as unused.
2. **CSS variables over hardcoded values** — always use design tokens from global.css
3. **Semantic HTML** — proper heading hierarchy, ARIA labels, landmark elements, skip-link
4. **Content is inline** — no CMS; all copy lives directly in `.astro` page files
5. **Images go in `public/images/`**, PDFs in `public/docs/samples/`, SVG illustrations are programmatic (not Canva)
6. **Mobile-first responsive** — design for small screens first, scale up with media queries
7. **Scoped styles** — component-specific CSS goes in `<style>` tags, global styles in `global.css`
8. **No build-time data fetching** — purely static, no API calls at build time
9. **Safe area insets** — all fixed/sticky elements account for notched device insets
10. **OG images** — source SVGs in `public/images/og-*.svg`, converted to PNG by `scripts/convert-og-images.mjs` at prebuild
11. **Service worker** — `public/sw.js` provides offline caching; registered in BaseLayout
12. **Storage keys** — localStorage: `theme` (dark/light), `email-popup-dismissed`, `privacy-accepted`, `resource-lead`. sessionStorage: `wa-shown` (WhatsApp bubble shown indicator).

## Homepage Sections (index.astro)

The homepage (~2700 lines) was slimmed from ~4500 lines to 6 core sections. Removed sections (social proof ticker, trust strip, problem/solution, SHARP flow, approach cards, comparison table, resource vault, Google Reviews CTA, referral banner, portal teaser, trial booking) now live on their respective dedicated pages.

Current sections in order:
1. Hero with geometric SVG decoration and pen animation (audience selector: parent/student)
2. Stats bar (animated counters)
3. Programmes grid (with SVG illustrations and embedded SHARP Method quiz)
4. Testimonials (3 quotes)
5. Results statistics
6. Contact form (with FAQ JSON-LD schema in head)

## Key Stats (keep consistent across all pages)

- **O-Level English pass rate**: 90% A1–B3
- **O-Level Mathematics lesson duration**: 90 min / week
- **H2 Economics lesson duration**: 90 min / week
- **CTA text on subject pages**: "Book Free Assessment" (not "Book Assessment")
- **Students taught**: 500+
- **Max class size**: 6 students (display as "6", never "6:1")
- **Google rating**: 4.9
- **O-Level Mathematics accent color**: #7B5EA7 (light), #9B7EC7 (dark)
- **SHARP step headings**: See, Hit, Apply, Refine, Practise — no time durations (e.g. not "See (5 min)")

When changing any stat, grep the entire `src/` directory to update every occurrence — stats appear on the homepage, subject pages, results page, landing pages, about page, and chatbot widget in BaseLayout.

## Founder Details (for schema.org and about page)

- **Name**: Jeremy Lim
- **Credential**: LLB (Hons), NUS Faculty of Law
- **Background**: Corporate law (IPO listings) → tuition
- **Role**: Founder & Lead Tutor
- **Method**: SHARP (See, Hit, Apply, Refine, Practise) — adapted from legal analytical reasoning
- **Schema**: Person schema on about.astro, founder sub-schema in BaseLayout's EducationalOrganization

## Schema.org Notes

- **H1 GP courseCode**: `"8807"` (Cambridge syllabus code). Do not use 8881.
- **O-Level Mathematics courseCode**: `"4048"`
- **H2 Economics courseCode**: `"9570"`
- **O-Level English courseCode**: `"1128"`
- **OG images**: `og-english.png`, `og-gp.png`, `og-econs.png`, `og-maths.png` — all four subject pages have dedicated OG images. Source SVGs are in `public/images/og-*.svg`; PNGs are generated at build time by `scripts/convert-og-images.mjs`.
- **Breadcrumbs**: Rendered entirely server-side by Astro in BaseLayout (lines ~226–242). There is no client-side JS breadcrumb script — do not add one, as it would duplicate items. The `breadcrumbLabels` map must include every page slug to avoid bad auto-capitalisation.

## Common Pitfalls

- The site URL is `https://a-worthy.com` — update `astro.config.mjs` if this changes
- CSS custom properties have separate light/dark values — always check both themes when modifying colors
- Pages can be large (index.astro is ~2700 lines) since content is inline — use offset/limit when reading
- The Header component handles both desktop and mobile nav with distinct markup sections
- The homepage has its own sticky CTA; the global sticky CTA bar in BaseLayout is hidden on `/`
- Dark mode accent is a different shade (#E09850 vs #D4853A) — update both if changing accent color
- Font families changed: Nunito replaced Fraunces (headings) and Space Grotesk (body). Pinyon Script and JetBrains Mono are unchanged.
- BaseLayout is ~900+ lines — use offset/limit when reading; many widgets are appended before `</body>`
- Astro 6.x uses `ClientRouter` from `astro:transitions`, NOT the old `ViewTransitions` export
- Subject pages have sticky TOC (visible at 1280px+) using IntersectionObserver — ensure sections have `id` attributes. TOC labels are sourced from `.eyebrow` text in each section (not truncated h2 text)
- The prebuild step (`scripts/convert-og-images.mjs`) requires `sharp` — run `npm install` if missing
- Email popup and resource gating both collect emails but are independent systems with separate localStorage keys
- The chatbot widget in BaseLayout has its own CTA links — update these when changing CTA copy elsewhere
- Nav links go to dedicated pages (`/programmes/`, `/resources/`, `/results/`, `/testimonials/`) — no in-page `/#anchors` from the header
- SVG wave section dividers are disabled (`display: none` in global.css) — do not re-enable
- Subject pages, landing pages, programmes, and success-stories use hardcoded tight spacing — do not revert to `var(--space-*)` tokens
- Do NOT add `data-animate="reveal-up"` to subject pages, landing pages, programmes, or success-stories — `clip-path: inset(100% 0 0 0)` causes invisible content if the observer doesn't fire after view transitions
- BaseLayout observers (`initScrollReveal`, `initCounters`) must listen to `astro:page-load` — wrapping in an IIFE breaks them after ClientRouter navigation
- When adding a new subject or programme, update: subject page, SubjectBar.astro, Footer.astro, BaseLayout.astro (breadcrumbLabels, knowsAbout, hasOfferCatalog, chatbot answers, exam countdown), programmes.astro, pricing.astro, index.astro (programme card, quiz), contact.astro, 404.astro, about.astro, all other subject pages' related links sections
- `parent-portal.astro` is a coming-soon stub — it has `noindex={true}` and should remain that way until the portal launches
- SHARP step card headings must not include time durations — use "See", "Hit", "Apply", "Refine & Practise" (not "See (5 min)" etc.)
