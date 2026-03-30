# CLAUDE.md — A-Worthy Website

## Project Overview

Marketing website for **A-Worthy**, a Singapore-based tuition centre offering O-Level English, H1 General Paper, and H2 Economics. Static site built with Astro, deployed to https://a-worthy.com.

## Tech Stack

- **Framework**: Astro 6.x (static site generator) with `@astrojs/sitemap`
- **Language**: TypeScript (strict mode via `astro/tsconfigs/strict`)
- **Styling**: Plain CSS with CSS custom properties — no Tailwind, no preprocessors
- **JavaScript**: Vanilla JS only — no React, Vue, jQuery, or other UI frameworks
- **Node**: >=22.12.0

## Commands

```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Build to ./dist/
npm run preview   # Preview production build
```

There are no tests, linting, or formatting commands configured.

## Project Structure

```
src/
├── components/     # Reusable Astro components
│   ├── Header.astro          # Desktop + mobile nav, theme toggle
│   ├── Footer.astro          # Site footer with links and contact info
│   ├── PdfPreviewModal.astro # Full-screen PDF preview overlay for resource samples
│   └── PenAnimation.astro    # SVG fountain pen calligraphy animation ("You are worth the A")
├── layouts/
│   └── BaseLayout.astro      # Master HTML template (meta, fonts, scroll animations, sticky CTA, WhatsApp button)
├── pages/          # File-based routing
│   ├── index.astro           # Homepage (~3300 lines — largest page)
│   ├── about.astro           # About the centre
│   ├── programmes.astro      # Programme overview
│   ├── h2-economics.astro    # Dedicated H2 Economics subject page
│   ├── h1-general-paper.astro # Dedicated H1 GP subject page
│   ├── o-level-english.astro # Dedicated O-Level English subject page
│   ├── results.astro         # Student results and statistics
│   ├── resources.astro       # Free resource vault with PDF samples
│   ├── testimonials.astro    # Student and parent testimonials
│   ├── contact.astro         # Contact form and details
│   └── 404.astro             # Not found page
└── styles/
    └── global.css            # Design system with CSS custom properties
public/
├── images/
│   └── logo.svg              # Site logo
├── docs/samples/             # Sample PDF resources (grammar, essays, vocabulary, etc.)
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
- Meta tags (Open Graph, Twitter Card, canonical URL)
- Schema.org structured data (EducationalOrganization)
- Google Fonts async loading
- Theme initialization from localStorage
- Scroll-reveal animation observer
- Animated number counters
- Back-to-top button
- Global sticky CTA bar (hidden on homepage)
- WhatsApp floating button

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

1. **Minimal dependencies** — only Astro and @astrojs/sitemap; no UI frameworks or CSS libraries
2. **CSS variables over hardcoded values** — always use design tokens from global.css
3. **Semantic HTML** — proper heading hierarchy, ARIA labels, landmark elements, skip-link
4. **Content is inline** — no CMS; all copy lives directly in `.astro` page files
5. **Images go in `public/images/`**, PDFs in `public/docs/samples/`
6. **Mobile-first responsive** — design for small screens first, scale up with media queries
7. **Scoped styles** — component-specific CSS goes in `<style>` tags, global styles in `global.css`
8. **No build-time data fetching** — purely static, no API calls at build time
9. **Safe area insets** — all fixed/sticky elements account for notched device insets

## Common Pitfalls

- The site URL is `https://a-worthy.com` — update `astro.config.mjs` if this changes
- CSS custom properties have separate light/dark values — always check both themes when modifying colors
- Pages are very large (index.astro is ~3300 lines) since content is inline — use offset/limit when reading
- The Header component handles both desktop and mobile nav with distinct markup sections
- The homepage has its own sticky CTA; the global sticky CTA bar in BaseLayout is hidden on `/`
- Dark mode accent is a different shade (#E09850 vs #D4853A) — update both if changing accent color
- Font families changed from the original design: Fraunces replaced Playfair Display, Space Grotesk replaced Inter
