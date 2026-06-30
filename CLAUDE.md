# CLAUDE.md - Single Source of Truth for Claude Code

## Project Overview

This is a SvelteKit 5 (Runes) static portfolio website for Dimas, a software engineer with 2+ years of experience. The site is fully compatible with GitHub Pages and uses static HTML generation.

## Core Goals

- Build a clean, professional portfolio with forest/earthy aesthetic
- Implement mobile-first responsive design
- Ensure 100% static prerenderable output
- Follow strict accessibility and performance guidelines

## Technology Stack

- **Core Framework**: SvelteKit 5 & Svelte 5 (Strict Runes Mode)
- **Language**: TypeScript (Strict mode, no `any`)
- **Styling**: Tailwind CSS 4 + CSS Custom Properties
- **Animation**: `svelte-inview` (viewport detection), `svelte-motion` (micro-interactions)
- **Tooling**: ESLint, Prettier
- **Deployment**: GitHub Pages with static adapter

## Folder Structure & Conventions

```
src/
  app.html, error.html (Hard fallback, no JS dependency)
  lib/
    assets/ (Profile, icons, social - imported for asset hashing)
    components/ (app, layout, navigation, sections, timeline, contact, motion, ui)
    data/ (site.ts, hero.ts, about.ts, career.ts, contact.ts - SINGLE source of truth)
    types/ (content.ts, ui.ts, motion.ts)
    utils/ (classnames.ts, motion.ts, scroll.ts, paths.ts)
  routes/
    +layout.ts (Owns page options: prerender = true, trailingSlash policy)
    +layout.svelte (Global layout shell & initialization)
    +page.svelte (Homepage implementation & section composition)
    +error.svelte (Branded 404/error page with clear return-home action)
    layout.css (Global styles & theme custom properties)
```

## Code Architecture & Ownership

- **`src/lib/data`**: Owns all typed portfolio content. No hardcoded facts in components.
- **`src/lib/types`**: Owns public interfaces/unions. No `any`. Separate content types from UI helpers. Narrow unions for IDs/variants.
- **`src/lib/components`**: Owns rendering and localized behavior. Thin, reusable primitives. Do not extract shared components for single-use unless isolating complex motion/a11y.
- **`src/routes`**: Owns route composition and page options only. Keep generic UI free of route concerns.

## Environment & MCP Tools

**Mandatory Workflow for Svelte/SvelteKit queries:**

1. `list-sections`: Run FIRST on any Svelte/SvelteKit query to discover docs.
2. `get-documentation`: Run IMMEDIATELY after to fetch all relevant section contents.
3. `svelte-autofixer`: Run ALWAYS before presenting or saving Svelte code. Repeat until 0 errors.
4. `playground-link`: Ask user permission FIRST. Never use if writing directly to project files.

## Development Rules

### Svelte & TS Conventions

- Strict Svelte 5 runes mode. Use typed `$props`. Restrict `$effect` to actual side effects.
- Prefer direct component composition over complex abstractions.
- Favor explicitness over cleverness. Delete dead code/CSS/starter templates immediately.

### Styling & UI

- Themes must use CSS custom properties. Tailwind must map to the tokenized system.
- **Color Restriction**: Gold is accent-only. No large gold surfaces or gold body text.
- Maintain consistent border-radius, shadow, spacing, and alternating dark/light section rhythm.
- **Navigation**: No top navbar. Desktop = Sidebar. Mobile = Bottom/accessible nav (no content coverage). Active indicators must not rely on hover.

### Motion & Performance

- **Banned**: WebGL, Three.js, large icon packs, unapproved animation libraries.
- Default to native Svelte or CSS transitions. No client-side fetching for core homepage content (must render as static HTML).
- `svelte-inview` for viewport detection only. `svelte-motion` for selective spring/tween only.
- Do not animate every element. Disable/simplify parallax and extended motion if reduced-motion or coarse pointers are detected.

### Accessibility (A11y)

- Semantic landmarks, strict heading hierarchy, and obvious focus-visible states on all surfaces.
- 100% keyboard, touch, and screen-reader accessible (hide decorative icons via `aria-hidden`).
- Provide clear alt text. Hover-dependent details must have touch/focus fallbacks. Clear/safe external links.

### Deployment & Errors

- App must be 100% prerenderable with SSR enabled. No server-only dependencies.
- Account for GitHub Pages base path behavior in assets and navigation.
- Provide a root branded `+error.svelte` and a static `error.html` fallback.

## Definition of Done (Verification)

Before considering implementation complete, the agent MUST execute and pass these commands:

1. `npm run check` (Must pass with 0 errors)
2. Lint & Formatting Validation:
   - Run `npm run lint`.
   - **CRITICAL AUTO-FIX RULE:** If Prettier warnings/errors (`[warn] Code style issues found...`) are detected during linting, the agent has full authorization and IS REQUIRED to run `npx prettier --write .` immediately to sync the formatting across all files.
   - Re-run `npm run lint` to ensure it passes perfectly before declaring the task finished.
3. `npm run build` succeeds and root page prerenders.
4. Custom 404 behavior for GitHub Pages is verified.
5. Manual check completed for: Mobile responsive, Keyboard nav, and Reduced-motion.
