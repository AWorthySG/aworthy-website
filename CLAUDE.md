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
│   ├── Header.astro          # Desktop + mobile nav, theme toggle
│   ├── Footer.astro          # Site footer with links and contact info
│   ├── PdfPreviewModal.astro # Full-screen PDF preview overlay for resource samples
│   └── PenAnimation.astro    # SVG fountain pen calligraphy animation ("You are worth the A")
├── layouts/
│   └── BaseLayout.astro      # Master HTML template (see "BaseLayout Features" below)
├── pages/          # File-based routing (33 pages)
│   ├── index.astro           # Homepage (~2700 lines — largest page, audience selector)
│   ├── about.astro           # About the centre, founder's personal story, video placeholder
│   ├── programmes.astro      # Programme overview
│   ├── h2-economics.astro    # H2 Economics subject page (sticky TOC, schedule, related links)
│   ├── h1-general-paper.astro # H1 GP subject page (sticky TOC, schedule, related links)
│   ├── o-level-english.astro # O-Level English subject page (sticky TOC, schedule, related links)
│   ├── o-level-mathematics.astro # O-Level Mathematics subject page (sticky TOC, schedule, related links)
│   ├── pre-ib-mathematics.astro # Pre-IB Mathematics (Year 3 & 4) subject page — olive `--subject-preib` accent; calculus/first-principles SHARP content
│   ├── l1r5-calculator.astro # Interactive L1R5 aggregate calculator (free tool)
│   ├── jc-subject-combinations.astro # Interactive JC subject-combination advisor (free tool)
│   ├── review.astro          # Review-generation page (Google review + private feedback; noindex)
│   ├── results.astro         # Student results and statistics
│   ├── resources.astro       # Resource vault with email gating (17 resources, 6 categories)
│   ├── study.astro           # Study Hub — live in-browser viewer for HTML study materials (see "Study Hub" below)
│   ├── frameworks.astro      # O-Level English framework showcase (interactive): STAMP CARD editing sweep, SWIFT→FLIP/EIL comprehension, CAPS summary. Linked from Header (Library), Footer, and o-level-english.astro cards
│   ├── testimonials.astro    # Testimonials with carousel and video section
│   ├── contact.astro         # Enquiry form, contact details, enrolment steps, FAQ (the separate "free trial lesson" form was removed: the offer is the free diagnostic assessment)
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
│   │   ├── ib-vs-jc.astro
│   │   ├── o-level-cut-off-points-2026.astro
│   │   ├── o-level-english-tips-2026.astro
│   │   ├── situational-writing-guide.astro
│   │   └── why-smart-students-fail.astro
│   ├── lp/                   # Landing pages for paid traffic
│   │   ├── gp-tuition.astro
│   │   ├── english-tuition.astro
│   │   └── econs-tuition.astro
│   ├── success-stories.astro # Student transformation case studies (4 stories)
│   ├── parent-portal.astro   # Parent portal preview (coming soon) — noindex and deliberately unlinked from every other page, chatbot included
│   ├── accessibility.astro   # WCAG 2.2 AA accessibility statement
│   ├── privacy-policy.astro  # PDPA-compliant privacy policy (linked from cookie consent banner and footer)
│   └── 404.astro             # Not found page with navigation links
└── styles/
    ├── global.css            # Design system with CSS custom properties
    └── blog.css              # Shared blog post styles (typography, layout, related articles)
scripts/
└── convert-og-images.mjs     # Prebuild script: converts SVG OG images to PNG via sharp
public/
├── images/
│   ├── logo.webp              # Site logo (mascot mark) — on-page use (Header, Footer, chatbot). See "Brand Mascots"
│   ├── logo.png               # Same mark, PNG — schema.org `logo` field only (Google's documented format)
│   ├── mascots/                # Mascot illustrations for content-page accents — see "Brand Mascots"
│   │   ├── mascot-<pose>.webp        # full die-cut sticker (with caption) — legible on any background
│   │   └── mascot-<pose>-icon.webp   # no caption, no border — UI-glyph use (logo, bullets, checkbox ticks)
│   │        # 25 poses: heart, heart-alt, rocket, rocket-fly, avocado-wink, avocado-hug,
│   │        # icecream, sunglasses, fishing (+ -icon variants) + teacher, reading, dad,
│   │        # feeding, cheer + the subject set lightbulb, maths, graph, economics,
│   │        # grade-a, science + the speech-bubble pair set ok, lets-go, sorry,
│   │        # on-my-way, family (no -icon variants); the set grows incrementally
│   ├── og-default.svg/png    # Default Open Graph image (all og-*.svg use the LMS palette: cream paper, ink tile, red accents)
│   ├── og-english.svg/png    # O-Level English OG image
│   ├── og-gp.svg/png         # H1 GP OG image
│   ├── og-econs.svg/png      # H2 Economics OG image
│   ├── og-maths.svg/png      # O-Level Mathematics OG image
│   ├── og-blog.svg/png       # Blog OG image (general blog posts)
│   ├── illustration-*.svg    # Programme card illustrations (english, gp, econs, maths, coaching)
│   ├── icon-*.svg            # Resource vault icons (scoring, essay, comprehension, vocabulary, situational, grammar)
│   └── section-divider.svg   # Decorative section divider
├── docs/samples/             # Sample PDF resources (grammar, essays, vocabulary, etc.)
├── study/                    # Study Hub materials — self-contained .html files, auto-listed on /study/
├── sw.js                     # Service worker — network-first for pages, cache-first only for /_astro/ + /fonts/, never touches cross-origin; offline fallback /offline.html (see "Runtime")
├── offline.html              # Self-contained page the service worker serves when offline with no cached copy
├── fonts/                    # Self-hosted Nunito (variable woff2, latin + latin-ext, upright + italic) + OFL.txt licence
├── manifest.json             # PWA manifest
├── robots.txt                # Search engine directives
├── apple-touch-icon.png      # iOS home screen icon (180×180, opaque cream bg)
├── favicon.ico                # Multi-size (16/32/48)
├── favicon-16.png / favicon-32.png
└── icons/icon-192x192.png, icon-512x512.png  # PWA manifest icons (opaque cream bg)
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
- Self-hosted Nunito: a preload of `/fonts/nunito-latin-wght-normal.woff2` (the `@font-face` rules live at the top of `global.css`)
- Theme initialization from localStorage (with `prefers-color-scheme` auto-detect; storage access is guarded — it throws when blocked)
- **No ClientRouter** — plain navigation with a native CSS cross-document fade and hover prefetch (see "Runtime")
- Scroll progress bar (fixed top; drawn with `transform: scaleX()`, see "Scroll performance")
- Breadcrumb navigation
- Scroll-reveal animation observer
- Animated number counters (bfcache `pageshow` fix)
- Back-to-top button
- Global sticky CTA bar (hidden on homepage; a single 60px row of CTA + call button + dismiss on phones/tablets, text label only on desktop)
- WhatsApp chat button (a plain float — the auto-opening "Hi! How can we help?" preview bubble was removed at the owner's request because it interrupted visitors; don't reintroduce a timed chat pop-up)
- FAQ chatbot widget (pre-defined Q&A)
- Email capture popup (exit-intent + 45s timer, localStorage dismissal) — submits to Formspree (`xreoozkk`) and delivers `/docs/samples/essay-framework-sample.pdf` with a fallback download link
- Service worker registration
- Bottom-bar registry `window.aworthyBottomBar(name, px)` (see "Fixed bottom chrome")
- Shared scroll loop `window.aworthyOnScroll(fn)` (see "Scroll performance")
- Privacy consent notice

## Design System (global.css)

**The website's design system is a port of the LMS's (lms.a-worthy.com) "sticker-book" system — token for token.** The LMS login page is the visual reference: cream paper canvas with a faint dot texture, white cards outlined in 2px navy "sticker ink" that lift onto a hard offset shadow, ONE red action colour, warm near-black text, grey micro-labels, and four feature colours (green / pink / sky / gold) used as tinted chips, stat dots and icon circles. When the LMS tokens change, change them here too (its `:root` / `html.dark` blocks are inlined in its index.html). The full contract page-work follows is in the "LMS design spec" summary below.

### Color Tokens

| Token | Light | Dark | Purpose |
|-------|-------|------|---------|
| `--bg-primary` | #FAF6EE | #171614 | Page canvas (body carries the paper-dot texture) |
| `--bg-secondary` | #F3EDE0 | #1C1B19 | Alternate bands (`.section--sand`), footer |
| `--bg-muted` | #F5F0E6 | #2B2A27 | Inputs, wells, segmented-control tracks |
| `--bg-hover` | #EEE7D6 | #33312D | Hover fill for ghost buttons / nav pills |
| `--bg-card` | #FFFFFF | #232220 | Cards — SOLID, never translucent |
| `--text-primary` | #1C1B19 | #F0EEE8 | Headings + body (warm near-black, **not** navy) |
| `--text-secondary` / `--text-muted` | #6B6760 | #B3AEA3 | Secondary copy, labels, eyebrows (AA on cream) |
| `--text-tertiary` | #A09C94 | #837F76 | Decorative only — placeholders, dividers |
| `--color-ink` (`--color-primary` aliases it) | #22304A | rgba(240,238,232,0.26) | Sticker outline navy: 2px borders on cards, buttons, inputs, logo tile |
| `--ink-shadow` | rgba(34,48,74,0.14) | rgba(0,0,0,0.42) | The hard offset shadow `0 4px 0` under buttons / lifted cards |
| `--ink-faint` (`--ink-soft` aliases it) | rgba(34,48,74,0.28) | rgba(240,238,232,0.16) | Subtle outlines, dashed dividers |
| `--color-accent` | #C0392B | #C0392B | THE action colour: primary buttons, emphasised headline word, squiggle, focus rings, active nav |
| `--color-accent-hover` / `--color-accent-press` | #A93226 / #962D22 | same | Hover fill / hard shadow under red buttons |
| `--color-accent-text` | #C0392B | #E4796C | Red used as text |
| `--color-accent-soft` | rgba(192,57,43,0.10) | rgba(228,121,108,0.16) | Red tint fills (active nav pill, selected chip) |
| `--border-color` / `--border-hover` | rgba(28,27,25,0.13) / 0.26 | rgba(240,238,232,0.16) / 0.30 | Hairline dividers only |
| `--color-leaf` / `--color-sun` / `--color-berry` / `--color-sky` | #3DAA5C / #F5B82E / #EF476F / #5FAEE3 | lighter | Feature colours — data only (stat dots, icon circles, chips, subject accents) |
| `--tint-{green,pink,blue,gold}-bg` / `-fg` | #E5F5E9/#1F7A3D, #FDE8EE/#B32048, #E6F1FB/#1F6FA8, #FDF3DE/#8A6205 | translucent / pastel | Tinted chip and icon-circle pairs |
| `--color-success-bg` / `--color-warning-bg` / `--color-danger-bg` / `--gold-light` | #EDFAF4 / #FEF8E8 / #FFF0EE / #FBF3E2 | translucent | Status wells |
| `--bg-footer` | #F3EDE0 | #1C1B19 | Footer is **light** now (the LMS has no dark band) |

**Retired — never reintroduce:** the gold accent (#D4853A / #E09850 / #E59A55 / #e8a060 / #B87333 / #A35D18), navy text (#1A2A3A / #2B5A8C), the old creams (#FDFBF7 / #F5F1EB), the old darks (#11100E / #0b0b0f), `rgba(26,42,58,…)` / `rgba(212,133,58,…)` / `rgba(224,152,80,…)` / `rgba(43,90,140,…)`, gradient/bevel buttons, glow shadows, translucent card fills, backdrop-filter panels. `grep -rnEi "#(2B5A8C|1A2A3A|D4853A|E09850|E59A55|e8a060|FDFBF7|F5F1EB|11100E)" src` must stay empty. `--color-accent-light` still resolves (#E4796C) for legacy references only.

### Typography

- **Self-hosted**: Nunito is served from `public/fonts/` (variable font, `wght` 200–1000, Latin + Latin Extended, upright + italic; SIL OFL in `OFL.txt`). `@font-face` rules sit at the top of `global.css`; BaseLayout preloads the Latin upright file. The font tokens fall back to `'Nunito Fallback'` — Arial with `size-adjust` / ascent / descent overrides measured from the woff2 at weight 400 — so text doesn't reflow when Nunito swaps in. **Never load it from Google Fonts again** (see "Runtime"). If a font file ever changes, give it a new filename: `/fonts/*` is served `immutable` and cached by the service worker.
- **Headings**: `'Nunito'` (sans-serif, weights 200–900)
- **Body**: `'Nunito'` (sans-serif)
- **`--font-mono`**: `'Nunito'` — the whole site is Nunito. The token is still named `--font-mono` and used for uppercase letter-spaced labels/eyebrows/HUD, but it now resolves to Nunito (no monospace face is loaded).
- **Single typeface**: the entire site is Nunito — there are **no other font families**. The hero pen animation (`PenAnimation.astro`) and the founder sign-off on `/about/` both render in Nunito (the pen animation uses weights 600/700; the founder sign-off uses Nunito italic 600).

Heading weights: h1 = **900** (page heroes), h2 / h3 = **800**, `letter-spacing: -0.02em` — the LMS's chunky display type, which also matches the hand-lettered "A-Worthy Education" caption on the stickers. The single emphasised word in a hero headline is solid red via `<span class="accent-word">` (LMS: "Learn with **purpose.**") — no text gradients, no shimmer. Micro-labels (`.eyebrow`, stat labels, table headers, chips) are **grey** (`--text-secondary`), 700, uppercase, 0.06–0.1em tracking, never below 0.72rem — red is reserved for the action colour. Don't reintroduce 200/300 display weights; `.hero-prelude` ("YOU ARE") is 700.

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
- Radius scale (the LMS's): `--radius-sm` 14px (inputs, chips, logo tile), `--radius-md` 20px (cards, modals, wells), `--radius-lg` 26px (hero panels), `--radius-pill` 999px (buttons, tags). `--border-radius` / `--border-radius-lg` are aliases of sm / md. The only intentional exceptions are tiny controls — the mascot checkboxes (`.check-box`, 22px box with a 6px radius) and `kbd` chips (4px).
- `--transition-fast`: 0.2s / `--transition-slow`: 0.65s (both cubic-bezier)
- `--swash`: a data-URI SVG of a hand-drawn **red** marker stroke (coral in dark mode, pale coral inside `.section--ink`) — the sitewide heading underline: rendered under `.section-title`, above `.section-heading`, under footer column headings, and anywhere `.squiggle` / `.squiggle--center` is added. Don't reintroduce straight accent bars under headings.
- Body texture: `body` carries `radial-gradient(circle at 1px 1px, rgba(70,50,20,0.03) 1px, transparent 0)` at 22px — the LMS paper fibre. Don't add page-level backgrounds that hide it (no full-bleed gradients); hero washes are soft tints (≤0.12 alpha of `--color-sun` / `--color-sky` / `--color-berry`).

### Z-Index Tokens

| Token | Value | Purpose |
|-------|-------|---------|
| `--z-base` | 1 | Base layer |
| `--z-overlay` | 10 | Reserved (currently unused) |
| `--z-subject-selector` | 90 | Subject selector and the subject pages' sticky section-nav strip |
| `--z-sticky-bar` | 95 | Global and homepage sticky CTAs |
| `--z-header` | 100 | Site header |
| `--z-subject-bar` | 190 | Subject navigation bar |
| `--z-dropdown` | 250 | Nav dropdowns |
| `--z-fixed-widget` | 900 | WhatsApp float, back-to-top |
| `--z-chatbot` | 950 | FAQ chatbot |
| `--z-privacy` | 999 | Cookie notice |
| `--z-scroll-progress` | 1990 | Scroll progress bar — above the chrome, **below modals** (at 9999 it drew a red line across every open overlay) |
| `--z-modal` | 2000 | PDF preview, Study Hub viewer, email popup, resource gate, notes lightboxes |
| `--z-toast` | 2100 | Toasts |

Always use z-index tokens instead of hardcoded values for layered components.

### Breakpoints

- Phone: ≤480px
- Phone landscape / small tablet: 481px–768px
- Tablet: 769px–1024px
- Desktop: 1025px–1440px
- Large desktop: 1441px–1920px
- 4K: 1921px+

### Mobile & tablet rules

- **Display type steps down** in global.css: ≤768px h1 `clamp(2rem, 7.5vw, 3rem)` / h2 `clamp(1.6rem, 5.5vw, 2.25rem)`; ≤480px h1 `clamp(1.9rem, 8.5vw, 2.4rem)` / h2 `clamp(1.5rem, 6.5vw, 1.9rem)`, so long titles hold to ~3 lines on a phone. Page-scoped hero headings that set their own phone size (subject pages, tools) keep it.
- **Legibility floor**: no running label smaller than **0.72rem** (11.5px) — eyebrows are 0.75rem on ≤768px, and every micro-label that used to sit at 0.55–0.68rem (hero proof labels, programme/pricing badges, `.blog-tag`, `.playbook-paper`, subject-bar chips, result stat labels, footer headings, the exam countdown) was raised. Don't add new 0.6rem labels.
- **Touch targets**: everything tappable is ≥40px tall (44px for form controls). global.css has a `@media (pointer: coarse)` block that gives inline links in `main p / main li / .hero-meta / footer` extra *vertical padding* — on inline elements that enlarges the tap box without changing the line box, so it's layout-safe — and sets 44px minimums on selects/inputs/textareas and the FAQ summaries. Chips (`.r-filter-btn`, `.dec-chip`, `.sh-chip`, `.subject-bar-link`) carry `min-height: 40px`; the testimonials carousel dots are an 8px visual dot inside a 40px button (`::before` draws the dot; the buttons touch, so the dots sit ~40px apart) — reuse that pattern for any small indicator control. On touch screens footer links are 40px `inline-flex` targets with tightened list spacing (Footer.astro), breadcrumb links get vertical padding (BaseLayout), and the author-bio link is a 40px target (AuthorBio.astro). Form controls (`button, input, select, textarea`) inherit the page font from global.css — without that, any button lacking its own `font-family` rendered in Arial.
- **Fixed bottom chrome**: every bar that can occupy the bottom edge — the cookie notice, the global sticky CTA (BaseLayout) and the homepage's own `.sticky-cta` — reports its visible height through `window.aworthyBottomBar(name, px)` (defined in BaseLayout's head script; `0` when hidden or dismissed). The registry publishes the **tallest** as `--sticky-bar-h` on `<html>`, and the WhatsApp float, chatbot toggle and back-to-top lift by `translate: 0 calc(var(--sticky-bar-h, 0px) * -1)` (with a `translate` transition), so they ride above whichever bar is showing. They used to add the variable to `bottom`, which re-laid out the page on every change and counted as layout shift. Never write `--sticky-bar-h` directly: each bar used to, the cookie notice didn't at all, and the floats sat on the notice's text and buttons for every first-time phone visitor. **Any new fixed bottom bar must report through the registry, and any new floating widget must lift by the variable through `translate`, not `bottom`.** Both sticky CTAs stay hidden while the cookie notice is up (they look it up on each check — its markup comes after their scripts). Desktop back-to-top sits left of the WhatsApp float (`right: 2rem + 68px`).
- **Landscape phones** (`(max-height: 500px) and (orientation: landscape)`, ~390px tall): the header drops to 56px, the subject bar and both bottom sticky CTAs are hidden (the menu lists every subject; the header shows the CTA), hero sections get compact padding, and the subject hero's mascot is sized by height (112px). Before this, headlines on the GP page, GP landing page and testimonials started below the first screen.
- **Short laptops** (`(min-width: 1025px) and (max-height: 820px)`, e.g. 1366×768, 1280×800): the bottom sticky CTAs are hidden — from 1025px the header always shows the CTA, and the duplicate cost ~8% of every screen.
- **Stats blocks** are 2×2 grids on phones (homepage `.stats-inner`, results `.r-stats-row`), never a single column of giant numbers.
- **Header on tablets** (641–1024px): hamburger nav plus the gold CTA pill; the CTA is hidden only ≤640px.

### Key CSS Classes (the LMS component vocabulary)

- `.container` — max-width: var(--container-max), centered with page-padding
- `.section` — standard vertical padding; `.section--sand` = `--bg-secondary` band; `.section--ink` = the navy #22304A ink band with light text (max one per page)
- `.section-title` / `.section-subtitle` — centered heading (+ red squiggle) / muted subtitle
- `.eyebrow` — grey uppercase micro-label above a heading
- `.btn` — **sticker pill**: 2px `--color-ink` border, white fill, weight 800, sentence case, hard shadow `0 4px 0 var(--ink-shadow)`; `:active` presses in (translateY(3px), shadow 0). `.btn-accent` / `.btn-primary` = red fill, white text, shadow `0 4px 0 var(--color-accent-press)`, hover `--color-accent-hover`. `.btn-secondary` = white fill, red text. `.btn-outline-light` = for the ink band only. `.btn--sm` = compact. Buttons never lift on hover (LMS: "quick, no bounce"); only cards lift. Every page-scoped CTA class must show through to this look — strip colour/border/shadow/radius from page rules rather than restating them.
- `.card` — white, 2px ink outline, 20px radius, flat at rest; hover = lift (`translateY(-2px)` + `0 6px 0 var(--ink-shadow), 0 12px 24px rgba(70,50,20,0.10)`). `.card-lift` applies the same lift to any element; global.css also lifts the known page families (`.programme-card`, `.t-card`, `.r-card`, `.pricing-card`, `.prog-card`, `.blog-card`, `.value-item`, `.wb-feature`, `.sh-card`, `.transformation-card`, `.story-card`, `.reading-card`, `.testimonial-card`, `.approach-card`). `.card--accent-left` = 6px subject-coloured left rule; `.card--featured` = subject-coloured outline.
- `.chip` + `.chip--green|pink|blue|gold|red|ink` — tinted pill with a 1.5px border in the colour, uppercase 700 0.72rem (LMS "SECURE / SINGAPORE / PWA"). Used for badges ("Most popular" → gold, "New" → blue), levels, categories, before/after grades (pink → green), filter chips (active = red).
- `.stat-dot` + `.stat-dot--green|pink|blue|gold|red` — 9px coloured dot with an ink ring, placed before a big 900-weight number; label underneath in grey micro-label. Every stats row uses it.
- `.icon-circle` + colour modifier — 40px tinted circle with a 2px coloured border around an SVG icon (feature grids).
- `.logo-tile` — 44px white rounded square with a 2px ink border holding the mascot; Header and Footer pair it with the wordmark "A-Worthy" (800) over the micro-label "Education".
- `.segmented` / `.segmented__btn` (+ `.active` or `aria-selected`) — LMS "Sign In | Register" control: muted track with ink border, active segment red with white text.
- `.well` — muted panel with ink border; `.divider-dashed` — 2px dashed ink-faint rule.
- `.accent-word` — solid red span for the emphasised headline word.
- **Subject artwork** (the LMS dashboard's "Your subjects" cards): every subject has a sticker, a dot colour and a pastel panel tint — tokens `--subject-{english,maths,preib,gp,econ,coaching}` (+ `-text`, + `-tint`), sampled from the LMS (English blue #3F72AB / #E4ECF3, Maths teal #3B7A73 / #D9E5E4, Pre-IB olive #647836 / #EDEFDC, GP green #53945F / #E3ECE1, Econ brick #993F36 / #EFE1DA, Coaching gold #A18234 / #F3EBD3; dark mode lightens the colours and makes the tints translucent). Put `.subject--<key>` on a container and `--subject-accent` / `--subject-accent-text` / `--subject-tint` resolve inside it. `.subject-panel` = the tinted panel with the sticker centred and a 2px dashed divider below; `.subject-card` = panel + `.subject-card__body` (title, `.subject-card__meta` with a `.subject-dot`); `.subject-panel--sm` for compact cards. Used on `/programmes/` cards, the pricing table headers + cards, the homepage programmes grid, and the SubjectBar (dots + subject-coloured active chip). Subject → sticker: English `grade-a`, Maths `maths`, Pre-IB `graph`, GP `lightbulb`, Econ `economics`, Coaching `teacher`.
- `.stat-card` (+ `__num`, `__label`, `--hot`) — the dashboard stat tile: white ink card, tinted `.icon-circle`, 900 number, grey label; `--hot` is the peach highlighted one.
- `.btn--tint-blue|green|gold|pink` — tinted secondary pills (dashboard "Take Attendance / View Progress / Community"); the single red `.btn-accent` stays the primary.
- `.speech-bubble` — ink-bordered callout with a tail (dashboard "2 submissions awaiting your review"); `.hero-card` — white ink card with a soft subject-tint wash in the top-right corner (the dashboard welcome card) for page heroes.
- Cards sit on a **3px hard rest shadow** (`0 3px 0 var(--ink-shadow)`) and lift to 6px on hover — global.css applies this to `.card` and every known card family; page rules must not set `box-shadow: none` on cards.
- `.sticker` / `.sticker--right` / `.sticker--hero` — see "Brand Mascots".
- Small helpers: `.btn-whatsapp` (WhatsApp-green sticker pill with dark text — white on that green fails AA), `.chip--lg` (1.05rem 900 chip for grade badges), `.chip.is-active` / `.chip--selected` (red fill), `.step-dot` (40px red numbered circle on an ink ring, for "how to enrol" steps), `.card--static` (a card that never lifts), `.card--popular` (red outline), `.hero-wash` (sun/sky radial wash behind a hero; children get `position: relative`), `select` chevron (drawn globally — see Pitfalls).
- Inputs (`input, select, textarea`) are global: `--bg-muted` fill, 2px ink border, 14px radius, red focus ring (`0 0 0 3px var(--color-accent-soft)`) — page styles must not restate borders/backgrounds.

### Dark Mode

Dark mode uses `[data-theme="dark"]` on `<html>` and swaps every token above to the LMS `html.dark` values: warm charcoal surfaces, ink becomes a *light* line (navy on charcoal disappears), red fills stay red, red text lifts to coral #E4796C, tints go translucent. The paper-dot texture drops to `rgba(255,255,255,0.015)`. Two surfaces are literal navy #22304A in both themes on purpose — the exam countdown strip and the chatbot header — because `var(--color-ink)` in dark mode is a translucent light line, not a fill. There is no dark-mode noise overlay or card glow any more. Theme is toggled by the Header component's theme button and persisted in `localStorage`.

## Animation System

**Motion layer** (bottom of `global.css`): cards lift off the paper on hover (`translateY(-2px)` + the 6px hard shadow) and settle on press; buttons do **not** bounce or lift — `.btn` is a quick colour change plus a physical press (`translateY(3px)`, shadow collapses), as on the LMS. Stickers straighten and scale 1.04 on hover with `--ease-bounce`. All of it is gated behind `@media (prefers-reduced-motion: no-preference)`. The celebration confetti helper is `window.aworthyCelebrate(opts)` from `public/celebrate.js`. Keep the site calm: the two games (`/kitchen/` and `/sharp-decoder/`) were removed in September 2026 because they distracted parents, and both URLs now 301-redirect (`vercel.json` `redirects` for production, `public/_redirects` for Cloudflare previews). Don't add game pages back.

Scroll-triggered animations via IntersectionObserver (defined in BaseLayout). `initScrollReveal` and `initCounters` run once per page load — there is no client-side router, so there is nothing to re-initialise after. Reveals fire at `threshold: 0` once an element's top edge is 40px into view, and run 0.7s over 24px; stagger steps `data-animate-delay="1"`–`"6"` are 0.06s apart. At the old 1s / 40px / `threshold: 0.1`, a tall section stayed blank until 10% of it was on screen and readers overtook the fade. Counters reserve the final number's width (`min-width` + tabular figures) before counting, and under reduced motion write the final number straight away. **Counter markup must hold the final number, never `0`** (`<span data-count="90" data-count-suffix="%">90%</span>`): no-JS visitors, crawlers and link previews read the markup as it is. The four landing pages shipped `0` and showed "0 A1–B3 rate" / "0 Google rating" to reduced-motion visitors until this was fixed.

The reveal styles animate the individual `translate` / `scale` properties, **not** `transform`, so a revealed card keeps its own hover `transform` lift; the reduced-motion and no-JS fallbacks reset `translate`/`scale` too. Don't rewrite them back to `transform: translateY(...)` — that overrides every card family's hover lift on the homepage, about, results, etc.

```html
<div data-animate="reveal-up">Fades in upward</div>
<div data-animate="reveal-up" data-animate-delay="1">Staggered delay</div>
<span data-count="95">95</span>                     <!-- Animated counter: markup holds the final number -->
<span data-count="95" data-count-suffix="%">95%</span> <!-- Counter with suffix -->
```

**Important**: every `data-animate` variant (including `reveal-up` / `reveal-left` / `reveal-right`) is now the same opacity + `translate` reveal. The old `clip-path: inset(100% 0 0 0)` hide was removed because it never revealed in Chromium: the browser computes IntersectionObserver geometry *after* the target's own clip-path, so a fully clipped element never intersects, never gets `.is-visible`, and whole sections (stats bands, review grids, CTA headings) stayed invisible for normal-motion visitors. The screenshot harness captures with `reducedMotion: 'reduce'`, which disables the hidden state and **masks this class of bug** — verify reveals with a normal-motion Playwright probe (`reducedMotion: 'no-preference'`, scroll the page, count `[data-animate]` vs `.is-visible`; the scratch script `probe_reveal.mjs` does exactly that). Never hide reveal targets with `clip-path`, `visibility`, `display` or zero size. `data-animate` stays **off** subject pages, landing pages, programmes and success-stories (their content must never depend on an observer); it remains on: homepage, about, results, testimonials, contact, pricing, resources, blog, and parent-portal.

Do NOT add `data-animate` back to subject pages, landing pages, programmes, or success-stories.

## Routing

- File-based: `src/pages/about.astro` → `/about/`
- Subject pages: `src/pages/h2-economics.astro` → `/h2-economics/`
- Trailing slashes enforced (`trailingSlash: 'always'` in astro.config.mjs)
- Build format: `directory` (creates `/page/index.html` not `/page.html`)
- Active nav link detection uses `Astro.url.pathname`
- Sitemap auto-generated via `@astrojs/sitemap` integration (filters out `/parent-portal/`, `/lp/*`, `/404`)

## Scroll performance

Measured on a 390px phone at 4× CPU throttle (September 2026): before these rules every page ran about one layout per scroll frame (English 283 layouts per scroll-through, pricing 157, testimonials 100), the homepage's 95th-percentile frame was 33ms, and the floats counted as layout shift. After: 0–9 layouts per scroll-through on every page except the homepage (whose ~160 are the stat counters changing text), homepage p95 17ms, scroll CLS 0. Keep it that way:

- **One scroll listener.** BaseLayout's head script owns a single passive `scroll` + `resize` listener and a `requestAnimationFrame` loop. Subscribe with `window.aworthyOnScroll(function (y) { … })`; the callback gets `window.scrollY` and runs at most once per frame. Never add another `window.addEventListener('scroll', …)`.
- **Write only on change.** A subscriber keeps its last state and touches the DOM only when that state flips (`if (next === shown) return;`). `aworthyBottomBar` does the same. Toggling a class every frame forces a style recalc every frame even when nothing changes.
- **Read before write.** Measure (`offsetHeight`, `getBoundingClientRect`, `scrollHeight`) first, then change classes and styles. Reading after a write forces a synchronous layout. Cache measurements that only change on resize (the progress bar caches its scroll range and re-measures on `resize`, `load` and a `ResizeObserver` on `<body>`).
- **Animate only `transform`, `translate`, `scale` and `opacity`.** The progress bar is `transform: scaleX()`, the results-page journey line is `scaleX()`, the floats move on `translate`. Animating `width`, `height`, `top` or `bottom` lays out the page every frame.
- **No `backdrop-filter` on fixed bars.** The header (once scrolled), the global sticky CTA and the homepage sticky CTA are solid `var(--bg-primary)`. The blur re-rendered everything under the bar on every scroll frame and roughly doubled the compositor's draw time. Modal overlays may keep a blur because nothing scrolls under them.
- **No `:has()` on `<body>` or `<html>`** in sitewide CSS. Chromium re-checks it after every DOM change on the page; `body:has(.breadcrumb)` re-matched `<main>`'s styles on every tick of the stat counters. Use a sibling combinator (`.breadcrumb ~ #main-content`) or a server-rendered class.
- **`html.is-scrolling`** is set while a mouse/trackpad scroll is in progress (hover devices only) and removed 150ms after it stops; `global.css` turns off `pointer-events` on `<body>` under it, so cards don't run their hover lift as they pass under a stationary cursor.
- **Anchor targets clear the fixed header.** In-page anchor targets carry `scroll-margin-top: var(--nav-offset)` (subject pages add the 48px nav strip). There is deliberately no `scroll-padding-top` on `<html>`: it would add to those margins.
- **Measure, don't guess.** The scratch harness from this round (`perf.mjs`) loads each page with 4× CPU throttle, wheel-scrolls it, and reports frame p95, frames over 50ms, layout and style counts, and layout shift. `inval.mjs` records Chromium's invalidation tracking to name the element and reason behind each style recalc or layout.

## Runtime: navigation, service worker, fonts, headers

These four were rebuilt together after visitors reported that the site "sometimes fails to load" and that Nunito "sometimes turns into another font". Each rule below exists because the previous design caused one of those symptoms.

- **Navigation** — no client-side router. Every link is a normal page load, so each page's scripts run exactly once. `global.css` ends with `@view-transition { navigation: auto; }` (inside `prefers-reduced-motion: no-preference`) for a native cross-fade in Chrome 126+ / Safari 18.2+; `astro.config.mjs` sets `prefetch: { prefetchAll: true, defaultStrategy: 'hover' }`.
- **Service worker** (`public/sw.js`, `VERSION = 'aworthy-v8'`):
  1. It never touches cross-origin requests. A worker's own `fetch()` is governed by the CSP sent with `sw.js`, and v7 re-fetched Google Fonts from inside the worker, where `connect-src` refused both hosts — Nunito fell back on every visit after the first.
  2. Pages are network-first; the cache is only a fallback when the network fails, then `/offline.html`. v7 precached 14 pages at install and answered in-page fetches cache-first, so returning visitors got frozen copies — old content, the old phone number, and stylesheet hashes that no longer existed.
  3. Only content-addressed files are cache-first: `/_astro/*` (hashed by the build) and `/fonts/*` (rename a font file if it changes).
  Bump `VERSION` whenever the worker's behaviour changes: activation deletes every other cache, which is how stale data gets purged from returning visitors. Navigation preload is on.
- **Fonts** — Nunito is same-origin (`public/fonts/`), so neither the worker nor any network/blocker/regional block on Google can take it down. `font-src 'self'`; no Google hosts remain in either CSP.
- **Headers** — production is **Vercel** (`vercel.json`); Cloudflare Pages serves previews (`public/_headers`). Keep the two identical (they had drifted: Vercel's CSP lacked the Clarity hosts). `X-Frame-Options: SAMEORIGIN`, `frame-ancestors 'self'` (needed by the Study Hub in Safari — see there), `/fonts/*` and `/_astro/*` immutable, `/sw.js` `no-cache`.
- **Verifying this layer** — Chromium only in the sandbox; Safari behaviour (e.g. inherited `frame-ancestors`) cannot be reproduced here. Test with a server that sends the production headers (`scratchpad/diag/prodserve.py` reads `vercel.json`), and test the *upgrade path*: install the old worker, then switch the same origin to the new build (`scratchpad/diag/switchserve.py` + `verify.mjs`). Beware test servers that answer `304` by mtime — they will hand the browser the previous build.

## Key Conventions

1. **Minimal dependencies** — Astro, @astrojs/sitemap, sharp (build); no UI frameworks or CSS libraries. fuse.js was removed as unused.
2. **CSS variables over hardcoded values** — always use design tokens from global.css
3. **Semantic HTML** — proper heading hierarchy, ARIA labels, landmark elements, skip-link
4. **Content is inline** — no CMS; all copy lives directly in `.astro` page files
5. **Images go in `public/images/`**, PDFs in `public/docs/samples/`, SVG illustrations are programmatic (not Canva)
6. **Mobile-first responsive** — design for small screens first, scale up with media queries
7. **Scoped styles** — component-specific CSS goes in `<style>` tags, global styles in `global.css`, shared blog styles in `blog.css`
8. **No build-time data fetching** — purely static, no API calls at build time
9. **Safe area insets** — all fixed/sticky elements account for notched device insets
10. **OG images** — source SVGs in `public/images/og-*.svg`, converted to PNG by `scripts/convert-og-images.mjs` at prebuild
11. **Service worker** — `public/sw.js`, registered in BaseLayout. Network-first for pages, cache-first only for content-hashed `/_astro/*` and `/fonts/*`, hands-off for anything cross-origin; see "Runtime" before changing it
12. **Storage keys** — localStorage: `theme` (dark/light), `email-popup-dismissed`, `privacy-accepted`, `resource-lead`. **Guard every read and write with `try/catch`** — storage throws (not just returns null) under Safari's "Block All Cookies" and in some in-app browsers, and an unguarded call kills the rest of its script

## Homepage Sections (index.astro)

The homepage (~2900 lines) was slimmed from ~4500 lines to a lean set of core sections, later augmented with a founder-credibility band and a grade-transformation strip for conversion. Removed sections (social proof ticker, trust strip, problem/solution, SHARP flow, approach cards, comparison table, resource vault, Google Reviews CTA, referral banner, portal teaser, trial booking) now live on their respective dedicated pages.

Current sections in order:
1. Hero with geometric SVG decoration and the letter-by-letter "You are A Worthy" display (Nunito 800; `PenAnimation.astro` is imported but not currently rendered), the `cheer` sticker floating in the right margin (≥1280px only), audience selector (parent/student), the intake line as a `.speech-bubble` callout + `/pricing/` link. There is **no scroll cue** — the old "Scroll" arrow printed over the audience paragraph and was removed along with its styles
2. Stats bar (animated counters)
3. Programmes grid (with SVG illustrations, embedded SHARP Method quiz, and a "Compare all plans & fees" link to `/pricing/`)
4. "Meet Your Tutor" founder-credibility band (Jeremy Lim → SHARP Method; links to `/about/`)
5. Testimonials (3 quotes) + grade-transformation strip (3 anonymised grade jumps linking to `/success-stories/`)
6. Results statistics
7. Contact form (risk-reversal subtitle — "no obligation, no sales pitch"; FAQ JSON-LD schema in head)

## Study Hub (`/study/`)

Students open study materials live in the browser — no downloads. Public (no gating), indexed, linked from the Header **Library** dropdown and the Footer.

**Adding a material** — two steps, the second optional:

1. Drop a self-contained `.html` file into `public/study/`. It is auto-discovered at build time (`fs.readdirSync` in `study.astro`'s frontmatter) and appears on the page immediately. Title falls back to the file's own `<title>`, blurb to its `<meta name="description">`. Style it like the two existing materials: LMS palette tokens in `:root` (a token is either a fill or a text colour, never both), Nunito via `@font-face` pointing at `/fonts/…`, and dark tokens under both `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }` and `:root[data-theme="dark"]`, with the one-line `<head>` script that copies `localStorage.theme` onto `data-theme` — so the material follows the site's theme toggle (the viewer also passes the current theme in).
2. Optionally add an entry to `src/data/study-materials.ts`, keyed by the filename without `.html`, to set `subject`, `title`, `description`, `level` and `order`. Subject determines the card's accent colour and the filter chip it appears under.

**How it renders — and why `srcdoc`, not `src`**: the viewer fetches the material and injects it into the iframe via **`srcdoc`**, with a `<base href="/study/">` prepended so relative asset URLs still resolve.

This is deliberate and must not be "simplified" back to `iframe.src`. A `srcdoc` document has no HTTP response of its own, so a response header like `X-Frame-Options` never applies to it, and a path-scoped header override does **not** work on the host: **Cloudflare Pages merges `_headers` rules rather than replacing them**, so a `/study/*` block would send both values and browsers intersect them.

**`frame-ancestors` must stay `'self'`, not `'none'`.** A `srcdoc` document *inherits* the parent page's CSP, and **Safari enforces the inherited `frame-ancestors` on it**: with the old `frame-ancestors 'none'` every material rendered as a blank white frame on iPhone and Mac while working in Chrome (Chromium does not enforce it there, which is why every Chromium test passed). The sitewide headers in `vercel.json` (production) and `public/_headers` (Cloudflare previews) are therefore `X-Frame-Options: SAMEORIGIN` and `frame-ancestors 'self'` — still no framing by other sites. Keep the two files identical.

The viewer builds a **fresh iframe for every open**, with `srcdoc` set before it is inserted (one navigation, nothing left over from the last material). The frame is never `display: none` — the loading state is an overlay on top of it — and the overlay only lifts when the frame's `load` event confirms a document with content. If the frame comes up empty, or doesn't load within 5s, the viewer opens the material as its own page instead, so a reader never sits in front of a blank frame. The iframe is script-created, so its scoped styles use `:global(.sh-viewer__frame)` (it never gets Astro's scoping attribute). The viewer also injects the self-hosted Nunito `@font-face` into each material, since fonts don't cross document boundaries.

The viewer also injects a small **anchor shim** into every material. In a `srcdoc` document, in-page links (`href="#section"`) resolve against the inherited base URL, so clicking one would *navigate the frame to `/study/#section`* instead of scrolling — silently breaking the table of contents in any long material. The shim intercepts same-document fragment clicks and scrolls instead, so materials need no modification.

The injected document inherits *this page's* CSP (`default-src 'self'` with `'unsafe-inline'` for scripts and styles), so materials must be **self-contained** — inline CSS/JS and same-origin files (e.g. `/fonts/…`) are fine; external CDN scripts and remote fonts are blocked. It is not sandboxed, so materials keep full same-origin access (localStorage etc.) and behave exactly as they do standalone.

Cards are real `<a href>` links, so every material is also its own standalone page — it works with JS disabled, and the viewer falls back to navigating there if the fetch fails.

**Deep links**: `/study/#<slug>` opens that material directly; Back closes the viewer. Handy for sending a student straight to one note.

## Key Stats (keep consistent across all pages)

- **O-Level English pass rate**: 90% A1–B3 (the 2025 figure on /results/). Always label it as O-Level English ("O-Level English A1–B3"), never as a bare "A1–B3 rate" beside GP or Economics, which don't use A1–B3 grades. Add the year and cohort size once the owner supplies the cohort size
- **Improvement speed (one line, used everywhere)**: "Our six documented case studies improved by 2–5 grades over 2–8 months" — derived from the success-stories records. The old "3 months avg. improvement", "2–3 grades within the first term", "2 grades within one term" and "results in weeks" claims were removed
- **No unsourced figures or superlatives**: "47 frameworks", "52 essay frameworks", GP "88% move up a band", Economics "96% pass" / "85% score B" and every "Best …" / "Top-rated …" headline were removed in September 2026 (the Singapore Code of Advertising Practice requires superlatives to be substantiated). Don't reintroduce a figure without its source
- **O-Level Mathematics lesson duration**: 90 min / week
- **H2 Economics lesson duration**: 90 min / week
- **Primary CTA (sitewide)**: "Book Free Assessment" (not "Book Assessment") — used on the homepage hero, both contact-form submit buttons (and their JS resets), and all subject pages
- **Students taught**: 500+
- **Max class size**: 6 students (display as "6", never "6:1")
- **Google rating**: 4.9. The review count is not shown anywhere: the old "127 five-star reviews" could not produce a 4.9 average. Don't add a count or `aggregateRating` / `Review` schema until the numbers come from the Google Business Profile.
- **Google review links**: `googleReviewsUrl` / `googleWriteReviewUrl` in `src/data/site-config.ts`, both empty until the real Google Business Profile links are supplied. Every Google button (homepage, testimonials, review page) renders only when its link is set. The old `g.page/r/aworthy-sg` link redirected to google.com
- **Refund policy (one wording, used everywhere)**: "If you're not satisfied after the first month of lessons, tell us within 7 days of that month's last lesson and we'll refund the first month's fees in full." Short label: "first-month money-back guarantee". It appears on the pricing page (includes card, CTA line, FAQ + its schema), in the chatbot's `refund` answer and in the homepage FAQ schema; change them together
- **Testimonials**: one entry per person in `src/pages/testimonials.astro`, quoted word for word on the homepage and the English landing page. Names are first name + surname initial (students are minors). The case studies in `src/pages/success-stories.astro` are the single source for every grade-jump record (Sarah T. C5→A2 3 months, Marcus L. D7→B3 4 months, Priya K. C6→A1 5 months, Wei Jie C. B4→A2 2 months, Aisha M. U→B 6 months, Daniel O. U→A 8 months); the results page, homepage, About page and landing pages must match them. No component-level results (SEAB publishes only overall grades). A quote may mention a grade jump only if it matches a case study (subject, sex, grades, time); in September 2026 the grade claims were removed from Linda T.'s and Angela W.'s quotes and from the unsourced Maths, GP and Economics quotes, and the invented "Aiden" card on /results/ was replaced by Marcus L.
- **Outstanding content issues** that need the owner's input are listed in `CONTENT-TODO.md` at the repo root (timetable, founder photo, empty resources, Google links, testimonial consent)
- **Contact email**: `jeremy@a-worthy.com` (footer, contact page, homepage contact card, privacy policy DPO contact, schema.org `email`). The earlier `hello@aworthy.sg` never worked — the `aworthy.sg` domain does not exist. The Instagram and TikTok handles are still `aworthy.sg`; those are usernames, not the mail domain
- **Subject accent colours**: every subject uses its LMS token from global.css (`--subject-english` / `-maths` / `-preib` / `-gp` / `-econ` / `-coaching`, each with a `-text` and `-tint` pair). Subject pages map them in their own `:root` (`--subject-accent: var(--subject-maths)`), never a literal — the old per-page hex accents (maths #7B5EA7, Pre-IB #B0436A, GP gold, English sky) are retired.
- **SHARP step headings**: See, Hit, Apply, Refine, Practise — no time durations (e.g. not "See (5 min)")

When changing any stat, grep the entire `src/` directory to update every occurrence — stats appear on the homepage, subject pages, results page, landing pages, about page, and chatbot widget in BaseLayout.

## Brand Mascots

The site's logo and decorative brand illustrations are a hand-drawn "eraser character" mascot set — 25 poses: the original 9 (heart ×2, avocado winking/hugging, rocket held, rocket flying away, ice cream, sunglasses, fishing) sourced as 400×400 JPGs on a flat white background, 5 "family/classroom" stickers (teacher at a chalkboard with a pupil, reading together, "#1 Dad" holding a baby, feeding a baby, and a two-character "You Can Do It!" cheer), and 6 **subject** stickers (`lightbulb` — reading with a lightbulb, `maths` — calculator + set square with π/√/Σ, `graph` — protractor + rising curve on a board, `economics` — suit, piggy bank + growth chart, `grade-a` — an "A" paper + pencil, `science` — lab coats + flasks + atom), and 5 **speech-bubble pair** stickers — a tall and a small character together: `ok` (thumbs up, "OK!"), `lets-go` (cheering, "Let's go!"), `sorry` (hands pressed together, "Sorry!"), `on-my-way` (walking with school bags, "On my way!") and `family` (a parent watering a sunflower with a partner and a ladybird child). The newer 16 were supplied as RGBA PNG/WebP with a **white die-cut sticker border already baked in** (the `maths` and `graph` poses arrived as one side-by-side image and were split at the thinnest alpha column). Every "full" variant in `public/images/mascots/` now carries that die-cut border — the original 9 had one synthesised to match — so the whole set reads as physical stickers and is legible on **any** background, cream or navy. New poses get added incrementally as they're supplied — check the directory for the current full list rather than assuming this doc is exhaustive. Processing scripts live only in session scratchpads (not checked into the repo) — if you need to reprocess or add a pose, redo the pipeline below. Before processing a newly-supplied pose, hash-compare it (e.g. `md5sum`) against the existing source set first — duplicates of already-processed poses have been sent before.

**Visual direction ("sticker-book", matched to the LMS)**: the whole site now uses the LMS's design system (see "Design System") — the stickers are the brand, and the UI is drawn the way they are: white shapes outlined in navy ink with a hard offset shadow, one red action colour, cream paper underneath. Keep new UI inside that system: ink outlines, red only for actions/emphasis, feature colours only for data, never gold, never gradients, never "gamified".

**Primary mark**: the "heart2" pose (simplest silhouette — reads best at favicon size) is the sitewide logo. It replaced the old navy "A|W" SVG wordmark everywhere: Header, Footer, favicon/apple-touch-icon/manifest icons, and the schema.org `logo` field.

**File locations**:
- `public/images/logo.webp` — the on-page mark (Header, Footer, chatbot toggle/header). WebP because this hand-drawn fabric-texture art compresses far worse as PNG (~90KB) than WebP (~20KB at q82, no visible quality loss) — this file loads on every single page, so it's worth the format choice.
- `public/images/logo.png` — same crop, PNG. Used **only** for the schema.org `logo` URL (in BaseLayout and every blog post's own Article JSON-LD) — Google's documented-supported formats for that property are JPG/PNG/GIF, not WebP, and this file is crawler-fetched rather than part of real user page weight, so the conservative format is worth it there specifically.
- `public/images/mascots/mascot-{heart,heart-alt,rocket,rocket-fly,avocado-wink,avocado-hug,icecream,sunglasses,fishing}.webp` — "full" versions of the original 9 (character + prop + the baked-in "A-Worthy Education" caption), ~300×400px, with a synthesised 8px white die-cut border and fully opaque bodies. Place these with the `.sticker` class.
- `public/images/mascots/mascot-{teacher,reading,dad,feeding,cheer}.webp` — the 5 family/classroom stickers, native die-cut, 508–640px on the long side (they were supplied larger, so they can be shown bigger — up to ~220px CSS — without softening). **No `-icon` variant exists for these**: the die-cut border keeps the caption legible on dark surfaces, and none of them is used as a UI glyph.
- `public/images/mascots/mascot-{lightbulb,maths,graph,economics,grade-a,science}.webp` — the 6 subject stickers, native die-cut, ~400×550px, no `-icon` variants. These are the hero art of the subject pages and landing pages (see placements) — each subject has its own pose, which is why the earlier "no large sticker on subject pages" restraint was lifted.
- `public/images/mascots/mascot-{ok,lets-go,sorry,on-my-way,family}.webp` — the 5 speech-bubble pair stickers, native die-cut, supplied at 512×512 and autocropped to ~390–480px, no `-icon` variants. **`family` was retouched before use**: the source showed a Chanel interlocking-C monogram on the handbag clasp, which was painted out and replaced with a plain silver clasp (a third-party trademark has no place on a commercial site). The watch has no logo and was left as drawn. If the illustrator re-supplies this pose, check for brand marks again.
- `public/images/mascots/mascot-*-icon.webp` — the original 9 with the caption cropped off and **no** die-cut border. These are the UI-glyph variants: the logo (`heart-alt-icon` = `logo.webp`), list bullets, checkbox marks, the audience-toggle tick, the email popup and the About sign-off. Dimensions are unchanged from the first pipeline (the width/height attributes in markup still match). They are no longer *required* for dark backgrounds — the die-cut full variants handle that now — use them where a small, caption-less mark is wanted.
- `public/favicon.ico` (multi-size), `public/favicon-16.png`, `public/favicon-32.png`, `public/apple-touch-icon.png` (180×180, opaque cream `#FDFBF7` background — Apple recommends against transparency), `public/icons/icon-{192,512}x192.png` (same opaque-cream treatment, for PWA manifest / Android home screen).

**Header/Footer pattern**: the logo image carries **no text** — "A-Worthy" is set as live HTML/CSS next to it (`.logo-text` / `.footer-logo-text`), not baked into the image. This is deliberate: it stays crisp at any zoom, adapts to theme automatically, and (critically for the footer) can be colored independently of the mascot artwork. Do not try to fold the wordmark back into the image.

**Footer-specific gotcha**: the old logo used a `filter: brightness(0) invert(1)` on `.footer-logo-img` to force a navy SVG white for the dark footer. **This filter was removed** and must not be reintroduced — applied to the full-color mascot it would crush it into a flat white silhouette, destroying the art. The mascot's native colors (cream body, navy outline, pink heart) already have enough contrast against `--bg-footer` on their own.

**Adding a mascot placement**: give the `<img>` the `.sticker` class (plus `.sticker--right` for a +5° tilt when it sits on the right of the copy) and use one of two layouts. (1) **Section head** — a flex row with the eyebrow/heading text in one child and the sticker as a sibling (`justify-content: space-between` or `center`), sticker `width` 130–150px, `display: none` under ~640px where it would crowd a dense layout: see the homepage `.wb-head` / `.testimonials-head`, Pricing `.includes-head`, Blog `.blog-head`, Results `.r-growth-head`, Contact `.contact-form-col__head`. (2) **Page hero** — for decorative (non-subject) heroes, drop `<img class="sticker sticker--hero">` as the last child of a `position: relative; overflow: hidden` hero section (the tool/page heroes listed at the bottom of global.css already are; Study and Success Stories set it locally): it floats in the right margin beside centred hero copy at ≥1280px and goes inline underneath on narrower screens. If the hero heading is long enough to reach the right margin, cap the hero container rather than shrinking the sticker. (3) **Subject hero** — subject pages and landing pages don't float the sticker; they use the `.hero-card` welcome-card layout (sticker in its own grid column beside the headline at ≥1024/1025px, stacked above the headline below) so a long headline can never run under the art — the floating variant caused exactly that on the GP and Maths landing pages at 1280–1536px. Always pass explicit `width`/`height` attributes (the asset's pixel dimensions) to avoid layout shift, `alt=""` (decorative — the heading carries the meaning; the header/footer logo `<a>` carries `aria-label="A-Worthy — Home"` instead), and `loading="lazy"` for anything below the fold. Never wrap a `.sticker` in `data-animate` — the reveal system's `transform` overrides the tilt.

**Current placements** (one pose per moment, each with a textual echo): Header/Footer/chatbot/email-popup (BaseLayout, icon variants) sitewide; homepage hero → `cheer` ("You Can Do It!" floating beside "You are A Worthy"), homepage Whiteboard band → `teacher` (chalkboard = the lesson), homepage testimonials → `dad` ("what parents say"); Programmes hero → `teacher`; About sign-off → `avocado-hug-icon`; Pricing "All programmes include" → `feeding` ("everything your child needs, no extras"); Blog, Study Hub and Resources heroes → `reading` (the library trio share one pose on purpose); L1R5 calculator hero → `cheer`; Success Stories hero → `family` (a family nurturing a growing sunflower beside "Real students, real transformations"); JC Subject Combinations hero → `science`; Testimonials → `heart`; Results → `rocket`; Contact form head → `heart-alt`; Contact "How to enrol" steps → `on-my-way` (setting off to class beside "Three simple steps to get started"); homepage "Get started" contact section → `lets-go`; Review page → `ok` (thumbs up above "How did we do?" / "Loved learning with A-Worthy?"); 404 → `sorry` (above "Page not found");  Parent Portal CTA → `rocket-fly` (the pose *is* a rocket launching and the copy says "launching soon" — don't reuse it without an equally direct echo). `mascot-fishing`, `mascot-avocado-wink`, `mascot-icecream` and `mascot-sunglasses` are in the library but **not placed** (icecream and sunglasses were the Kitchen and SHARP Decoder accents until those pages were removed) — no page has a natural, non-gimmicky fit (avocado-wink was the 404 art until `sorry` arrived); ask before forcing them in.

**Subject artwork placements** (the LMS "Your subjects" pattern — every subject always appears with *its own* sticker; see "Subject artwork" under Key CSS Classes for the token/class system): English `grade-a`, O-Level Maths `maths`, Pre-IB `graph`, GP `lightbulb`, Economics `economics`, One-to-One Coaching `teacher`. They appear as `.subject-panel` cards on the homepage programmes grid, `/programmes/`, the pricing table headers + pricing cards, and About "What we teach" (six `.subject-card`s; the old head-level teacher sticker was retired there because the Coaching card carries it); as the **hero art of the five subject pages** and the four landing pages (`.hero-card` welcome-card layout — sticker beside the headline at ≥1024/1025px, stacked above it below); and as `.subject-panel--sm` cards in every subject page's "Explore more → Other subjects" grid. The "no large sticker on subject pages" restraint from the earlier refresh was deliberately lifted for this: each subject has its own pose now, so the sticker *is* the subject's identity rather than a decoration. If asked to add more placements, keep the "does the copy already support this pose's meaning" bar rather than sprinkling stickers onto every section.

**Bullets and checked-state UI** (a separate, sitewide-consistent use, distinct from the accent placements above): the primary mark (`mascot-heart-alt-icon.webp`) doubles as a universal list-bullet and "you selected this" indicator across the site, replacing every plain CSS dot/checkmark `::before` marker and every native checkbox tick:

- **Bullet markers** — `.founder-band__creds` / `.founder-card__creds` (index.astro / about.astro), `.pricing-card__details` (pricing.astro), and `.prog-card__topics` (programmes.astro + all 5 subject pages — each page has its **own** scoped copy of this rule since Astro `<style>` blocks don't share across files; a sitewide bullet-style change means editing all 6). Same technique throughout: `::before { content:''; width/height; background: url('/images/mascots/mascot-heart-alt-icon.webp') center / contain no-repeat; }` in place of whatever the dot/checkmark used to be.
- **Checkboxes** — Contact's 7 "Programme of Interest" boxes, and the L1R5 calculator's 2 bonus-point boxes. Pattern: the native `<input type="checkbox">` stays in the DOM (visually hidden via `position:absolute;opacity:0`, **not** `display:none`, so it stays keyboard/screen-reader accessible) with a sibling `<span class="check-box" aria-hidden="true">` as the visible bordered box; the mascot icon is that span's `::after`, shown via `input:checked ~ .check-box::after { opacity:1 }`. Each page currently repeats this CSS locally (contact.astro and l1r5-calculator.astro each define their own copy under their own class name) — there's no shared checkbox component to import.
- **Parent/Student audience toggle** (index.astro hero) — same mascot icon, rendered inside each tab button at a fixed size but `opacity:0` until `.active`, so the icon fades in next to whichever tab is currently selected without shifting the pill's width.

A real, unrelated bug was found and fixed while wiring up the audience-toggle icon: index.astro's "Programme Quiz Logic (#8)" inline `<script>` block (around the SHARP-method programme-recommendation quiz) was missing its closing `</script>` tag, which silently merged it with every inline script after it on the page — including the Audience Toggle's own script — into one blob that failed to parse, breaking **both** features entirely (no JS error surfaced to a casual glance; the toggle just silently did nothing on click). If a future edit to index.astro's inline scripts breaks something else similarly non-obvious, check for unclosed `<script>` tags first — the file has ~10 separate inline `<script is:inline>` blocks back to back, and a missing close on any one of them silently swallows every block after it into a single broken parse.

**Reprocessing pipeline v2** (if poses are re-made or new ones arrive): for white-background JPG sources, remove **only the exterior white** — flood-fill the near-white mask (RGB distance-from-white ≤ 28) from the image border and apply the soft alpha ramp (transparent at ≤6, opaque at ≥28) to that exterior region alone. The first pipeline keyed on near-white *everywhere*, which left the characters' cream bodies semi-transparent — invisible on cream, but grey "ghosts" on navy; v2 keeps bodies and interior whites (chalk letters, speech bubbles, eyes) fully opaque. Then drop small opaque specks (<160px² touching an edge — scanner dust and caption-letter tops), blank any sliver of a neighbouring sticker that the sheet crop caught (the fishing source has one at its top-left), autocrop, and for the "full" variant synthesise the die-cut border: dilate the alpha mask by 8px (PIL `MaxFilter`), blur it 0.8px, fill white, composite the character on top. "Icon" variants skip the border; their caption crop lines are still picked **by eye** against a rulered render (automated gap detection was tried twice and fails where a prop runs into the caption) — sunglasses is cut at y=268, the rest at 275–305. Sources that already carry alpha + a die-cut border (the newer 11) need only autocrop + downscale to ≤640px; if two stickers arrive in one image, cut at the column with the least alpha coverage in the middle 30–70% of the width (their die-cut borders touch, so there is no fully empty gap) and autocrop each half. Export WebP q82 / method 6; regenerate `logo.webp`/`logo.png` from the heart-alt icon if that pose changes.

## Founder Details (for schema.org and about page)

- **Name**: Jeremy Lim
- **Credential**: LLB (Hons), NUS Faculty of Law
- **Background**: Corporate law (IPO listings) → tuition
- **Role**: Founder & Lead Tutor
- **Method**: SHARP (See, Hit, Apply, Refine, Practise) — adapted from legal analytical reasoning
- **Schema**: Person schema on about.astro, founder sub-schema in BaseLayout's EducationalOrganization

## Schema.org Notes

- **H1 GP courseCode**: `"8881"` (the SEAB syllabus examined since 2024; it replaced 8807). Use 8881 everywhere the code appears.
- **O-Level Mathematics courseCode**: `"4052"` (it replaced 4048). Both papers are 2 h 15 min and 90 marks (50% each); the Maths FAQ and the E-Maths blog post state this
- **H2 Economics courseCode**: `"9570"`
- **O-Level English courseCode**: `"1184"` (the current SEAB syllabus code; the site was migrated from the older `1128`)
- **OG images**: `og-english.png`, `og-gp.png`, `og-econs.png`, `og-maths.png` — the four national-stream subject pages have dedicated OG images. Source SVGs are in `public/images/og-*.svg`; PNGs are generated at build time by `scripts/convert-og-images.mjs`. `pre-ib-mathematics.astro` currently reuses `og-maths.png` (no dedicated OG yet).
- **Breadcrumbs**: Rendered entirely server-side by Astro in BaseLayout (lines ~226–242). There is no client-side JS breadcrumb script — do not add one, as it would duplicate items. The `breadcrumbLabels` map must include every page slug to avoid bad auto-capitalisation.
- **LocalBusiness `geo`**: the EducationalOrganization/LocalBusiness JSON-LD includes a `GeoCoordinates` block. Keep its lat/long in sync with the `geo.position`/`ICBM` meta tags in `<head>`. No `streetAddress` — the centre is online-only via Zoom, so do not add a fabricated physical address.
- **FAQPage schema**: the five subject pages (incl. `pre-ib-mathematics.astro`) and `pricing.astro` carry `FAQPage` JSON-LD backed by their visible FAQ sections; the homepage has a `FAQPage` block in its `<head>`. Per Google's guidelines, only add `FAQPage` entries that mirror FAQ content actually visible on the same page, and keep the schema answer text in sync with the visible copy (and with pricing/stats).

## Annual content freshness

When the academic year rolls over, update these in order — most date-sensitive content depends on them:

1. **`src/data/site-config.ts`** — the single source for `academicYear`, the Google review links (`googleReviewsUrl`, `googleWriteReviewUrl`) and the `exams` array (used by the BaseLayout exam-countdown via `define:vars`). There is no intake line on the site at present: the "Next intake" text was removed in September 2026 after its date passed. If an intake is announced, add it back through this file, not as hard-coded copy.
2. **Cut-off-points blog** (`src/pages/blog/o-level-cut-off-points-2026.astro`) — refresh the COP table, the year in the title/slug, and any references to "2025/2026" trends.
3. **L1R5 calculator** (`src/pages/l1r5-calculator.astro`) — the embedded `JCS` array of cut-off points must match the blog table.
4. **Subject pages** — schedule notes and syllabus year references.
5. **Blog post titles/slugs** ending in `-2026` — decide whether to refresh in place or publish a new yearly post (and redirect/archive the old one).
6. **Sitewide grep** — `grep -rn "2026" src/` to catch any straggling year mentions.

## Common Pitfalls

- The site URL is `https://a-worthy.com` — update `astro.config.mjs` if this changes
- CSS custom properties have separate light/dark values — always check both themes when modifying colors
- Pages can be large (index.astro is ~2700 lines) since content is inline — use offset/limit when reading
- The Header component handles both desktop and mobile nav with distinct markup sections
- The homepage has its own sticky CTA (`.sticky-cta`, a compact centred red pill on a solid cream strip — keep `.sticky-cta-btn` at `flex: 0 1 360px` on desktop; it goes full-width only ≤640px); the global sticky CTA bar in BaseLayout is hidden on `/`. In headless full-page screenshots the hidden global bar still shows up (it is translated below the first viewport, which a full-page capture includes) — that is a capture artifact, not a bug
- The action red is the same #C0392B in both themes (fills never change); only red *text* lifts to coral `--color-accent-text` #E4796C in dark mode. Never bring gold back as an accent — the old #D4853A / #E09850 pair is retired
- Font families: the entire site uses **Nunito only** — JetBrains Mono and Pinyon Script were both removed. The hero `PenAnimation.astro` and the `/about/` founder sign-off now render in Nunito too. Don't reintroduce a monospace or script font; keep mono-styled labels as uppercase + letter-spacing, and the pen animation / sign-off as Nunito.
- BaseLayout is ~900+ lines — use offset/limit when reading; many widgets are appended before `</body>`
- **There is no ClientRouter — don't add it back.** Astro's router keeps a session-wide record of every inline script it has run and never runs the same one twice, and runs bundled scripts once per session: after a single link click the phone menu and theme toggle stopped responding, and any page revisited by clicking around came back with its toggles, quizzes and calculators unwired, with no error anywhere. Every navigation is now a normal page load, so page scripts simply run once on load — don't add `astro:page-load` / `astro:after-swap` listeners (nothing fires them). Page-to-page fades are the native `@view-transition { navigation: auto; }` at the end of `global.css`; `astro.config.mjs` prefetches links on hover
- Subject pages have a sticky "On this page" TOC (**1920px+ only**) built from each section's `.eyebrow` text (not truncated h2 text) — ensure sections have `id` attributes. It is **JS-gated to appear only once the reader scrolls past the hero** (`html.js .sticky-toc` starts hidden; the page script adds `.is-ready` when the section-nav strip reaches `--nav-offset`). Without that gate the fixed card sat over the hero card and the nav strip — which has a higher z-index — painted straight through it on the pages with a shorter hero. Its `top` is `calc(var(--nav-offset) + 44px + 1.5rem)` on all five pages: the 44px is the breadcrumb strip, the 1.5rem clears the stuck nav. It shows only from 1920px because at every width from 1280 to 1680 the 190px card covered the page content by 46–155px and ran into the WhatsApp/chat/back-to-top floats; the sticky section-nav strip is the in-page navigation below that. At 1920+ it is 170px wide, `right: 1rem`, and its `max-height` stops it above the floats and `--sticky-bar-h`
- The prebuild step (`scripts/convert-og-images.mjs`) requires `sharp` — run `npm install` if missing
- Email popup and resource gating both collect emails but are independent systems with separate localStorage keys. Formspree endpoints: the contact form posts to `xgoppwye`; resource gating, newsletter, and the email popup post to `xreoozkk`
- **Analytics stack**: Plausible (`script.tagged-events.js`) is loaded unconditionally and tagged via `plausible-event-name=...` classes and `window.plausible('Event Name')` calls. Microsoft Clarity (heatmaps + session recordings) is gated on the `PUBLIC_CLARITY_PROJECT_ID` env var — the script only renders when the var is set, and the privacy-policy page's Clarity entries are conditional on the same var. To enable, set `PUBLIC_CLARITY_PROJECT_ID` in Vercel (and Cloudflare Pages) and redeploy. CSP in `public/_headers` already allows `*.clarity.ms` and `c.bing.com`.
- The chatbot widget in BaseLayout has its own CTA links — update these when changing CTA copy elsewhere
- Nav links go to dedicated pages (`/programmes/`, `/resources/`, `/results/`, `/testimonials/`) — no in-page `/#anchors` from the header
- SVG wave section dividers are disabled (`display: none` in global.css) — do not re-enable
- Subject pages, landing pages, programmes, and success-stories use hardcoded tight spacing — do not revert to `var(--space-*)` tokens
- Do NOT add `data-animate="reveal-up"` to subject pages, landing pages, programmes, or success-stories — their content must never depend on an observer firing
- When adding a new subject or programme, update: subject page, SubjectBar.astro, Footer.astro, BaseLayout.astro (breadcrumbLabels, knowsAbout, hasOfferCatalog, chatbot answers, exam countdown), programmes.astro, pricing.astro, index.astro (programme card, quiz), contact.astro, 404.astro, about.astro, all other subject pages' related links sections
- `parent-portal.astro` is a coming-soon stub — it has `noindex={true}` and should remain that way until the portal launches
- SHARP step card headings must not include time durations — use "See", "Hit", "Apply", "Refine & Practise" (not "See (5 min)" etc.)
- Blog posts import shared styles from `src/styles/blog.css` — only page-specific styles (e.g., `.cop-table-*`, `.compare-table-*`) go in inline `<style>` blocks
- PdfPreviewModal uses CSS custom properties (`--pdf-bg`, `--pdf-text`, etc.) for its intentionally dark media-viewer theme — do not tie these to the site's light/dark mode tokens
- `404.astro` has `noindex={true}` — keep it excluded from search indexing
- Study Hub materials live in `public/study/*.html` and are auto-discovered. The viewer loads them with `iframe.srcdoc`, **not** `iframe.src`, and the sitewide `frame-ancestors` must stay `'self'` — Safari enforces the page's *inherited* `frame-ancestors` on the srcdoc document, so `'none'` blanks every material on iPhone. See "Study Hub"
- The site logo (`public/images/logo.webp`/`.png`) is a hand-drawn mascot, not the old navy "A|W" SVG — see "Brand Mascots" above before touching Header/Footer logo markup, favicons, or the schema.org `logo` field
- Never reintroduce `filter: brightness(0) invert(1)` on `.footer-logo-img` — it crushes the full-color mascot into a flat white silhouette. The footer is now a *light* sand band (`--bg-footer` #F3EDE0 with a 2px ink top rule; charcoal in dark mode), so nothing in it needs inverting; the wordmark ("A-Worthy") stays live text (`.footer-logo-text`) beside the `.logo-tile`
- Mascot "full" variants now carry a white die-cut border, so their baked-in navy caption stays legible on dark surfaces — the old "use the `-icon` variant on navy" rule no longer applies. Reach for `-icon` only when a small caption-less mark is wanted (bullets, ticks, the logo)
- Below-the-fold stickers use `loading="lazy"`, so a headless full-page screenshot shows them **blank** unless the page is scrolled through first — that is a capture artifact, not a rendering bug. The verification harness scrolls before capturing; do the same rather than "fixing" it by removing `loading="lazy"`
- Grid columns must be `minmax(0, 1fr)`, not bare `1fr`, wherever a card holds `white-space: nowrap` pills side by side (resources cards do): `1fr` means `minmax(auto, 1fr)`, so the pills' min-content width forced the single phone column to 391px and the page scrolled sideways. Probe for this with a 390px Playwright run listing elements whose `getBoundingClientRect().right` exceeds the viewport (ignore the off-canvas `#mobile-nav` and the honeypot `.form-hp`)
- `.form-group label` is an uppercase 0.75rem micro-label selector with (0,1,1) specificity — any custom label class inside a form group (e.g. contact's `.check-label`) must be written as `.form-group .check-label` or it silently inherits the micro-label look
- `select` elements use `appearance: none`, so global.css draws the chevron as a background SVG (ink in light, cream in dark) with `padding-right: 2.6rem`; page styles must not set their own `background-image` on selects or the arrow disappears
- A four-column class-schedule table does not fit a phone. Every subject page breaks `.schedule-table` into labelled cards below 640px (`thead` hidden, rows become blocks, `td::before { content: attr(data-label) }`), so each `<td>` needs a `data-label`. Never hide the wrapper's scrollbar on a table that still scrolls — that is what made the old "slots left" chip unreachable (the slots banners and the Status column were removed in September 2026; availability figures must come from real enrolment data or not appear at all)
- When a declaration seems not to apply, check for a **later declaration of the same property inside the same rule**: the homepage scroll cue had `display: none` added at the top of a block that already ended with `display: flex`, so the "fix" was a silent no-op. Verify with a computed-style probe, not by reading the source
- The header CTA (`.header-cta`) is the red `.btn-accent` sticker pill (2px ink border, hard shadow); it used to be a ghost/outline button with a dark-mode override that re-asserted the ghost look. Don't resurrect that override — the filled pill has white text in both themes
- index.astro has ~10 back-to-back inline `<script is:inline>` blocks. A missing `</script>` on any one of them silently merges it with every script after it into a single blob that fails to parse — breaking all of them with no obvious error (this happened for real: it took out both the programme quiz and the audience toggle at once, with the toggle's click handler simply never attaching). If an inline script on this page mysteriously does nothing, check for an unclosed `<script>` tag earlier in the file before assuming the handler logic itself is wrong
- **Never select by a class *fragment* in shared CSS.** A landscape rule targeted `.hero, [class*="-hero"]`, which also matched every BEM child (`.sh-hero__title`, `.calc-hero__lead`) and the mascots (`sticker--hero`, `lp-hero-art`): each got a header-height of top padding and the art was squashed. Target the element you mean (`section[class*="-hero"]` at the very least)
- Sizes in `px` next to content in `rem` break at the big-screen root sizes (112.5% ≥1441, 125% ≥1921, 150% ≥2560): the subject bar's 1200px cap made its five rem-sized chips overflow at 2560 and the hidden-scrollbar row cut Pre-IB Maths off, unreachable by mouse. Cap such rows in `rem` (the subject bar uses `75rem`), and keep a component's padding rules together across breakpoints (the header's "Library" trigger missed the ≥1921 padding the links got, and sat 9px high)
- Elements created by script never get Astro's scoping attribute, so a plain scoped selector silently doesn't match them — style them with `:global()` inside the component's `<style>` (the Study Hub iframe fell back to the default 300×150 box until this was fixed)
- Verification harnesses must exercise **navigation**, not just fresh page loads: every bug fixed in the loading round (dead menus, dead widgets, stale pages, fonts failing under the service worker) only appeared on the second page or the second visit. `scratchpad/diag/verify.mjs` from that round installs the old service worker, switches the origin to the new build, and clicks between pages
- **A `var()` that names an undefined custom property invalidates the whole declaration, silently.** The homepage sticky CTA used `z-index: var(--z-sticky-cta)` — a token that never existed — so its z-index was `auto` and page content painted over the bar while scrolling. Use only tokens defined in `global.css` (the Z-Index table above is the real scale), or give `var()` a fallback. A scan for no-fallback `var(--x)` with no `--x:` definition anywhere in `src/` is quick and currently returns nothing
- **`order: -1` on a `.hero-card` child paints it *under* the card's `::before` tint wash.** Flex items paint in order-modified document order, and the absolutely positioned `::before` counts as `order: 0`, so a sticker moved first with `order: -1` is painted before the wash and looks grey. The landing pages and the Economics / Maths / Pre-IB heroes stack the sticker this way on phones, so each carries `z-index: 1`. Any new hero-card child reordered with a negative `order` needs the same.
- **global.css sets `.btn { width: 100% }` on phones (≤480px).** A button that must leave room beside it (the homepage sticky CTA reserves 44px for its ×) needs `width: auto` as well as its margin. Otherwise the 100% width wins, the margin pushes it past its box, and the × sits on top of the red pill.
- **Rem caps on stickers need a px ceiling.** The subject stickers are only ~400–425px wide, so an `11.25rem` hero sticker (270px at the 150% root) is upscaled on a 2x screen. The heroes use `min(11.25rem, 200–210px)` to keep the art at no more than half its source width.
