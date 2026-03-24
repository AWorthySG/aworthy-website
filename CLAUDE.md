# CLAUDE.md — A-Worthy Website

## Project Overview

Marketing website for **A-Worthy**, a Singapore-based tuition centre. Static site built with Astro, deployed to https://a-worthy.com.

## Tech Stack

- **Framework**: Astro 6.x (static site generator)
- **Language**: TypeScript (strict mode)
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
├── components/     # Reusable Astro components (Header, Footer)
├── layouts/        # BaseLayout.astro — master HTML template
├── pages/          # File-based routing (index, about, programmes, results, resources, testimonials, contact, 404)
└── styles/         # global.css — design system with CSS variables
public/
├── images/         # Static images organized by category (illustrations/, general/, avatars/, heroes/, about/, programmes/)
├── js/             # Client-side scripts
└── favicon.*      # Favicons
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

All pages wrap content in `<BaseLayout>` which provides meta tags, theme init, scroll animations, and the WhatsApp floating button.

## Design System (global.css)

### Colors

| Token | Value | Purpose |
|-------|-------|---------|
| `--color-primary` | #2B5A8C | Trust blue — headings, CTAs |
| `--color-accent` | #D4853A | Warm gold-orange — highlights, badges |
| `--color-secondary` | #4A6A82 | Muted slate blue |
| `--color-bg` | #FFFFFF / #111820 | Light/dark backgrounds |
| `--color-footer-bg` | #1A2A3A | Footer background |

### Typography

- **Headings**: `'Playfair Display'` (serif)
- **Body**: `'Inter'` (sans-serif)
- **Mono**: `'JetBrains Mono'`

### Spacing Scale

`--space-xs` (0.25rem) through `--space-4xl` (6rem). Always use these tokens.

### Breakpoints

- Phone: ≤480px
- Tablet: 481px–1024px
- Desktop: 1025px–1440px
- Large: 1441px–1920px
- 4K: 1921px+

### Key CSS Classes

- `.container` — max-width: 1400px, centered
- `.section` — standard vertical padding
- `.card` — elevated box with hover effect
- `.eyebrow` — uppercase label in accent color
- `.btn-primary`, `.btn-accent`, `.btn-secondary`, `.btn-outline-light` — button variants

## Animation System

Scroll-triggered animations via IntersectionObserver (defined in BaseLayout):

```html
<div data-animate="reveal-up">Fades in upward</div>
<div data-animate="reveal-up" data-animate-delay="1">Staggered delay</div>
<span data-count="95">0</span> <!-- Animated number counter -->
```

## Dark Mode

Supported via `[data-theme="dark"]` attribute on `<html>`. Toggled by the header theme button and persisted in `localStorage`. All color overrides use CSS custom properties scoped under `[data-theme="dark"]`.

## Routing

- File-based: `src/pages/about.astro` → `/about/`
- Trailing slashes enforced (`trailingSlash: 'always'` in astro.config.mjs)
- Build format: `directory` (creates `/page/index.html` not `/page.html`)
- Active nav link detection uses `Astro.url.pathname`

## Key Conventions

1. **No external dependencies beyond Astro** — keep the dependency footprint minimal
2. **CSS variables over hardcoded values** — always use design tokens from global.css
3. **Semantic HTML** — proper heading hierarchy, ARIA labels, landmark elements
4. **Content is inline** — no CMS; all copy lives directly in `.astro` page files
5. **Images go in `public/images/`** — organized by category subfolder
6. **Mobile-first responsive** — design for small screens first, scale up with media queries
7. **Scoped styles** — component-specific CSS goes in `<style>` tags, global styles in `global.css`
8. **No build-time data fetching** — purely static, no API calls at build time

## Common Pitfalls

- The site URL is `https://a-worthy.com` — update `astro.config.mjs` if this changes
- CSS custom properties have separate light/dark values — always check both themes when modifying colors
- Pages are large (500–1300 lines) since content is inline — scroll carefully when editing
- The Header component handles both desktop and mobile nav with distinct markup sections
