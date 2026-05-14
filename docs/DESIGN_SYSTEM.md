# Design System

## System Principles

- The interface should feel calm, intentional, and technically literate.
- Contrast and reading comfort take priority over decorative density.
- Gold is an accent, not a base surface color.
- Each section should feel distinct, but all sections must read as one system.

## Theme Tokens

Define tokens in global CSS variables and consume them through Tailwind-friendly classes.

### Core Color Tokens

```css
:root {
  --color-forest-950: #15291e;
  --color-forest-900: #1b3326;
  --color-forest-800: #254131;
  --color-cream-50: #fffbdd;
  --color-cream-100: #f7f1d2;
  --color-gold-500: #b08d57;
  --color-gold-400: #c6a26a;
  --color-ink-900: #101612;
  --color-ink-700: #2d372f;
  --color-line-dark: rgba(255, 251, 221, 0.14);
  --color-line-light: rgba(21, 41, 30, 0.14);
  --color-shadow-dark: rgba(6, 10, 8, 0.28);
  --color-shadow-soft: rgba(21, 41, 30, 0.12);
}
```

### Semantic Color Tokens

```css
:root {
  --bg-page: var(--color-forest-950);
  --bg-panel-dark: rgba(255, 255, 255, 0.04);
  --bg-panel-light: rgba(21, 41, 30, 0.04);
  --bg-section-dark: var(--color-forest-950);
  --bg-section-light: var(--color-cream-50);
  --text-on-dark: var(--color-cream-50);
  --text-on-light: var(--color-ink-900);
  --text-muted-dark: rgba(255, 251, 221, 0.72);
  --text-muted-light: rgba(16, 22, 18, 0.72);
  --accent: var(--color-gold-500);
  --accent-strong: var(--color-gold-400);
  --focus-ring: rgba(176, 141, 87, 0.45);
}
```

### Spacing Tokens

```css
:root {
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
}
```

### Radius Tokens

```css
:root {
  --radius-sm: 0.5rem;
  --radius-md: 0.875rem;
  --radius-lg: 1.25rem;
  --radius-xl: 1.75rem;
  --radius-pill: 999px;
}
```

### Border And Shadow Tokens

```css
:root {
  --border-soft-dark: 1px solid var(--color-line-dark);
  --border-soft-light: 1px solid var(--color-line-light);
  --shadow-card: 0 16px 40px var(--color-shadow-soft);
  --shadow-hero: 0 30px 60px var(--color-shadow-dark);
  --shadow-float: 0 24px 50px rgba(6, 10, 8, 0.22);
}
```

### Motion Tokens

```css
:root {
  --ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-soft: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-emphasis: cubic-bezier(0.2, 0.8, 0.2, 1);
  --duration-fast: 160ms;
  --duration-base: 260ms;
  --duration-slow: 420ms;
}
```

## Typography System

Use a primary readable text face plus a distinct display face if licensing and performance remain acceptable. If custom fonts are introduced, keep the number of families to two maximum.

### Text Roles

- `display-hero` - primary homepage heading
- `display-mark` - large decorative "D"
- `heading-section` - section title
- `body-base` - standard paragraph copy
- `body-compact` - short supporting text
- `label-ui` - buttons, nav labels, meta chips
- `meta-date` - timeline dates and side labels
- `code-accent` - `<html>`, `<body>`, closing tags

### Type Rules

- Hero heading should be compact and bold, never wide and airy.
- Section headings should be strong enough to anchor navigation state.
- Body text should maintain generous line-height for cream-background readability.
- Code-accent text should look intentional and sparse, not like a repeated gimmick.

## Layout And Spacing Rules

### Section Rhythm

- Each major section should feel like a full-width scene with its own internal grid.
- Vertical spacing must scale between mobile and desktop without leaving dead space.
- Alternate dark and light section treatments to reinforce progression.

### Container Rules

- Max content width should remain readable on large screens.
- Use wider hero composition width than body-content width.
- Sidebar offset must be part of desktop layout calculations, not an afterthought.

### Section Padding Guidance

- Mobile: `4rem` to `5rem` top and bottom
- Tablet: `5rem` to `6rem`
- Desktop: `6rem` to `8rem`

## Responsive Breakpoints

Use Tailwind defaults unless the implementation introduces a documented reason to customize them.

### Mobile

- Default baseline
- Stacked layout for hero
- Sidebar becomes bottom dock or compact floating rail
- Timeline becomes single-column with compressed detail interactions

### Tablet

- Reintroduce more horizontal spacing
- Sidebar can remain fixed if it does not obstruct content
- About section may shift to image + text split

### Desktop

- Fixed left sidebar
- Hero uses a two-column composition
- Career timeline uses left date / center line / right content structure

## Reusable UI Patterns

### Section Shell

- Shared section wrapper with consistent padding, anchor ID support, and background mode
- Supports `dark` and `light` variants

### Icon Button

- Used for sidebar items and possibly compact contact links
- Circular or rounded-rect hit area
- Visible active, hover, focus, and reduced-motion-safe states

### CTA Button

- Primary action style for "CONTACT ME" and CV access
- Strong contrast, compact uppercase or small-caps treatment, and subtle elevation

### Popover Card

- Used for career detail disclosure
- Soft border, controlled shadow, and clear separation from timeline body
- Must remain readable on both dark and light adjacent surfaces

### Timeline Item

- Standardized structure for date, marker, summary, and detail affordance
- Must adapt to touch devices where hover is unavailable

### External Link Row

- Shared pattern for GitHub, LinkedIn, Instagram, email, and CV link
- Icon + label + optional outbound hint

## Contrast Rules

- All text on forest surfaces must meet accessible contrast targets.
- Muted text may be softer, but never low enough to look disabled unless actually disabled.
- Gold text alone must not carry key information on light surfaces.

## Surface Alternation Rules

Recommended section order:

- Hero: dark
- About: light
- Career: dark
- Contact: light or dark depending on final visual balance

The sidebar surface should always remain distinguishable from the current section background.

## Decorative Rules

- Use gradients, layered opacity, and linework sparingly.
- Visual noise must be concentrated at the edges or as background atmosphere, not behind dense copy.
- The large hero "D" may carry the boldest styling, but must not make text alignment feel secondary.
