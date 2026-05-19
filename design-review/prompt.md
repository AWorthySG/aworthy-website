# A-Worthy Website — Design Review & Visual Upgrade

I'm sharing the complete codebase of my Singapore tuition centre website (https://a-worthy.com) in the attached file `codebase-bundle.txt`. I'd like you to act as a senior product designer and propose concrete visual improvements I can ship.

---

## About the business

**A-Worthy** is a premium small-group tuition centre in Singapore offering:
- O-Level English (Sec 1–4)
- H1 General Paper (JC 1–2)
- H2 Economics (JC 1–2)

Founded by an NUS Law graduate, the brand position is **"legal-analytical precision meets academic results."** Classes are capped at six students, delivered online via Zoom, and built around our proprietary **SHARP Method** (See, Hit, Apply, Refine, Practise).

The target audience is **Singapore parents of secondary and JC students** — analytically minded, evaluating multiple tuition options, sensitive to both quality cues and price. Secondary audience: the students themselves.

---

## Tech stack constraints (please respect these)

- **Astro 6.x** static site generator, file-based routing
- **Plain CSS** with CSS custom properties — no Tailwind, no preprocessors, no UI libraries
- **Vanilla JS only** — no React, Vue, jQuery, or framework components
- **Fonts** already loaded: `Fraunces` (serif heading), `Space Grotesk` (body), `JetBrains Mono` (mono), `Pinyon Script` (decorative)
- **Light + dark mode** both supported via `[data-theme="dark"]` on `<html>`
- **Mobile-first responsive**, with safe-area insets for notched devices
- **Accessibility** matters — keep WCAG 2.2 AA compliance (visible focus rings, semantic HTML, alt text, sufficient contrast)

Any change must work within these constraints. Don't suggest adopting Tailwind, swapping the framework, or pulling in a UI library.

---

## Design system already in place

See `src/styles/global.css`. Key tokens:

**Colour**
- `--color-primary` `#2B5A8C` (trust blue)
- `--color-accent` `#D4853A` light / `#E09850` dark (warm gold-orange)
- `--bg-primary` `#FDFBF7` (warm off-white) / `#0b0b0f` dark
- `--text-primary`, `--text-secondary`, `--text-muted` for content hierarchy

**Typography**
- h1: Fraunces 200 (very light)
- h2: Fraunces 400
- h3: Space Grotesk 700
- Body: Space Grotesk
- Eyebrows / labels: JetBrains Mono, uppercase, letter-spaced

**Spacing**
- `--space-xs` 0.5rem → `--space-3xl` 5rem (responsive)
- `--container-max` 1200px
- `--page-padding` 4rem

The brand voice is **precise, calm, slightly understated** — closer to a boutique law firm than a typical tuition flyer.

---

## What I want from you

Please review the codebase end-to-end and produce a **prioritised design upgrade plan** focused on visual polish, not content rewrites. For each item, I want:

1. **What** — the specific change in 1–2 sentences
2. **Why** — the user-experience or conversion rationale
3. **Where** — the exact file(s) and section(s) to modify
4. **How** — concrete CSS / markup snippets I can copy, respecting the design tokens above
5. **Effort** — small / medium / large

Group your output into these areas:

### A. Hero & first-impression polish
The homepage, subject pages, and landing pages all have hero sections. Are they doing enough visual work? Should there be more depth, motion, illustration, or restraint? Is the typographic hierarchy carrying enough weight?

### B. Trust signals & social proof
Founder card, success stories, testimonials, Google Reviews section, results page. What would a top-tier educational brand look like here? Where are we under-investing?

### C. Information density & rhythm
Some pages are very long (the homepage is ~4000 lines). Is the section pacing right? Are there places where a more compact layout, better visual breaks, or refined card design would help?

### D. Component-level polish
Buttons, form fields, cards, tables, navigation, modals. Identify any inconsistencies in radius, shadow, spacing, hover state, focus ring. Propose a unified treatment.

### E. Subject-page experience
`o-level-english.astro`, `h1-general-paper.astro`, `h2-economics.astro` follow a similar template. Anything we can do to make these visually richer without bloating page weight?

### F. Resources / lead-capture experience
The resources page has a gated download modal (`src/pages/resources.astro`). How can the gate feel less transactional and more rewarding?

### G. Dark mode
Walk through dark mode and flag any places where contrast, glow, or saturation feels off. Particularly check images, illustrations, and decorative SVGs that may not adapt.

### H. Anything I haven't asked about
Surprise me. If there's a visual problem I haven't named, call it out.

---

## Ground rules

- **Don't propose content changes.** Copy is already where I want it. Focus on visual, layout, and interaction design.
- **Don't propose framework or stack changes.** Stay within Astro + plain CSS + vanilla JS.
- **Don't propose new pages or sections.** Improve what's there.
- **Be specific.** "Use better spacing" is useless. "Increase section vertical padding from `--space-3xl` to `clamp(5rem, 10vw, 9rem)` on hero sections only" is what I need.
- **Show me code.** When you propose a CSS change, give me the exact selector and properties. When you propose markup, give me the snippet.
- **Prioritise.** If you list 30 changes, tell me which 5 will move the needle most.
- **Quantify where possible.** "Increases visual weight of CTA by ~20%" is more useful than "makes CTA stronger."

---

## Output format

Use this structure for each suggestion:

```
### [Area letter].[Number] Title

**What:** [1–2 sentences]
**Why:** [user/conversion rationale]
**Where:** [file paths and selectors]
**How:**
```css
/* code */
```
or
```html
<!-- markup -->
```
**Effort:** Small | Medium | Large
**Impact:** Low | Medium | High
```

End with a **"Top 5 to ship first"** section that ranks your highest-impact recommendations across all areas.

---

## What's in the bundle

The attached `codebase-bundle.txt` contains the project's `CLAUDE.md`, configuration files, the full design system (`global.css`), every layout and component, and every page (28 routes). Each file is delimited by a `FILE:` header. Total ~22,500 lines.

Take your time. I'd rather have 10 thoughtful suggestions than 50 superficial ones.
