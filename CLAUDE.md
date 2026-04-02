# CLAUDE.md — A-Worthy Website

## Project Overview

Marketing website for **A-Worthy**, a Singapore-based tuition centre offering O-Level English, H1 General Paper, and H2 Economics. Static site built with Astro, deployed to https://a-worthy.com.

## Tech Stack

- **Framework**: Astro 6.x (static site generator) with `@astrojs/sitemap`
- **Language**: TypeScript (strict mode via `astro/tsconfigs/strict`)
- **Styling**: Plain CSS with CSS custom properties — no Tailwind, no preprocessors
- **JavaScript**: Vanilla JS only — no React, Vue, jQuery, or other UI frameworks
- **Search**: Fuse.js for client-side fuzzy search
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
├── pages/          # File-based routing (25 pages)
│   ├── index.astro           # Homepage (~4000+ lines — largest page, audience selector)
│   ├── about.astro           # About the centre, founder profile, video placeholder
│   ├── programmes.astro      # Programme overview
│   ├── h2-economics.astro    # H2 Economics subject page (sticky TOC, schedule, related links)
│   ├── h1-general-paper.astro # H1 GP subject page (sticky TOC, schedule, related links)
│   ├── o-level-english.astro # O-Level English subject page (sticky TOC, schedule, related links)
│   ├── results.astro         # Student results and statistics
│   ├── resources.astro       # Resource vault with email gating (16 resources, 6 categories)
│   ├── testimonials.astro    # Testimonials with carousel and video section
│   ├── contact.astro         # Contact form, trial booking form, online badge
│   ├── pricing.astro         # Pricing comparison table with FAQ
│   ├── blog/
│   │   ├── index.astro       # Blog article previews (links to 6 posts)
│   │   ├── comprehension-techniques.astro
│   │   ├── gp-essay-structure.astro
│   │   ├── economics-essay-diagrams.astro
│   │   ├── why-smart-students-fail.astro
│   │   ├── situational-writing-guide.astro
│   │   └── exam-prep-timeline.astro
│   ├── lp/                   # Landing pages for paid traffic
│   │   ├── gp-tuition.astro
│   │   ├── english-tuition.astro
│   │   └── econs-tuition.astro
│   ├── success-stories.astro # Student transformation case studies (4 stories)
│   ├── parent-portal.astro   # Parent portal preview with feature cards (coming soon)
│   ├── accessibility.astro   # WCAG 2.2 AA accessibility statement
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
│   ├── illustration-*.svg    # Programme card illustrations (english, gp, econs, coaching)
│   ├── icon-*.svg            # Resource vault icons (scoring, essay, comprehension, vocabulary, situational, grammar)
│   ├── case-method-infographic.svg # CASE Method cyclical diagram
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
- Schema.org structured data (EducationalOrganization + LocalBusiness, Course, FAQPage)
- Google Fonts async loading
- Theme initialization from localStorage (with `prefers-color-scheme` auto-detect)
- ClientRouter for page transitions (`astro:transitions`)
- Scroll progress bar (fixed top)
- Breadcrumb navigation
- Scroll-reveal animation observer
- Animated number counters (with bfcache `pageshow` fix)
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

- **Headings**: `'Fraunces'` (variable serif, optical size 9–144)
- **Body**: `'Space Grotesk'` (sans-serif)
- **Mono**: `'JetBrains Mono'`
- **Script** (pen animation): `'Pinyon Script'`

Heading weights: h1 = 200 (light), h2 = 400, h3 = 700 (uses body font).

### Spacing Scale

| Token | Value |
|-------|-------|
| `--space-xs` | 0.5rem |
| `--space-sm` | 0.75rem |
| `--space-md` | 1rem |
| `--space-lg` | 1.5rem |
| `--space-xl` | 2rem |
| `--space-2xl` | 3rem |
| `--space-3xl` | 5rem (responsive: 7rem at tablet, 9rem at desktop) |

Always use these tokens instead of hardcoded values.

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
- `.section` — standard vertical padding (var(--space-3xl))
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

Scroll-triggered animations via IntersectionObserver (defined in BaseLayout):

```html
<div data-animate="reveal-up">Fades in upward</div>
<div data-animate="reveal-up" data-animate-delay="1">Staggered delay</div>
<span data-count="95">0</span>                     <!-- Animated counter -->
<span data-count="95" data-count-suffix="%">0</span> <!-- Counter with suffix -->
```

## Routing

- File-based: `src/pages/about.astro` → `/about/`
- Subject pages: `src/pages/h2-economics.astro` → `/h2-economics/`
- Trailing slashes enforced (`trailingSlash: 'always'` in astro.config.mjs)
- Build format: `directory` (creates `/page/index.html` not `/page.html`)
- Active nav link detection uses `Astro.url.pathname`
- Sitemap auto-generated via `@astrojs/sitemap` integration

## Key Conventions

1. **Minimal dependencies** — Astro, @astrojs/sitemap, sharp (build), fuse.js (search); no UI frameworks or CSS libraries
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
12. **localStorage keys** — `theme` (dark/light), `email-popup-dismissed`, `privacy-accepted`, `whatsapp-bubble-shown`, `resource-email`

## Homepage Sections (index.astro)

The homepage is the largest file (~4000+ lines) and contains these sections in order:
1. Hero with geometric SVG decoration and pen animation
2. Stats bar (animated counters)
3. Social proof ticker (scrolling messages including student count)
4. Trust strip / media mentions strip
5. Problem → Solution narrative
6. Programmes grid (with SVG illustrations)
7. CASE Method quiz
8. CASE flow diagram
9. CASE Method infographic
10. Interactive worked example
11. Approach cards
12. Comparison table
13. Resource vault preview
14. Testimonials
15. Google Reviews CTA
16. Results statistics
17. FAQ (with JSON-LD FAQPage schema)
18. Referral programme banner
19. Parent portal teaser
20. Trial lesson booking section
21. Contact form

## Common Pitfalls

- The site URL is `https://a-worthy.com` — update `astro.config.mjs` if this changes
- CSS custom properties have separate light/dark values — always check both themes when modifying colors
- Pages are very large (index.astro is ~4000+ lines) since content is inline — use offset/limit when reading
- The Header component handles both desktop and mobile nav with distinct markup sections
- The homepage has its own sticky CTA; the global sticky CTA bar in BaseLayout is hidden on `/`
- Dark mode accent is a different shade (#E09850 vs #D4853A) — update both if changing accent color
- Font families changed from the original design: Fraunces replaced Playfair Display, Space Grotesk replaced Inter
- BaseLayout is ~900+ lines — use offset/limit when reading; many widgets are appended before `</body>`
- Astro 6.x uses `ClientRouter` from `astro:transitions`, NOT the old `ViewTransitions` export
- Subject pages have sticky TOC (visible at 1280px+) using IntersectionObserver — ensure sections have `id` attributes
- The prebuild step (`scripts/convert-og-images.mjs`) requires `sharp` — run `npm install` if missing
- Email popup and resource gating both collect emails but are independent systems with separate localStorage keys
