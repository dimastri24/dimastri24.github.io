# docs/CORE_BLUEPRINT.md

## 1. Project Summary & Goals

- **Target:** Single-page portfolio website for Dimas (Software Engineer, 2+ years of experience) + Custom 404 page.
- **Output:** 100% Static HTML (`adapter-static`), rendered via SSR at build time, fully compatible with **GitHub Pages** (Supports `BASE_PATH` configuration via `config.kit.paths.base`).
- **Visual Persona:** A blend of forest/earthy atmosphere (_deep forest green_, _warm cream_, minimalist _antique gold_) with a clean editorial layout and elegant code-inspired typography.
- **What to BANNED:** Gamer aesthetics, neon cyberpunk, heavy glassmorphism, over-the-top hero illustrations, scroll-jacking, WebGL/Three.js, and heavy animations that delay access to information.

---

## 2. Target Folder Structure

```text
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

---

## 3. Approved Tech Stack & Constraints

- **Core Framework:** SvelteKit 2 (`^2.57.0`) & Svelte 5 (Strict Runes Mode: `$state`, `$derived`, `$effect`, typed `$props`).
- **Language & Tooling:** TypeScript (Strict compile-time validation, **NO `any**`), ESLint, Prettier.
- **Styling:** Tailwind CSS 4 (For layout/spacing/responsive utilities) combined with CSS Custom Properties as the _source of truth_ for color tokens and themes.
- **Animation Libraries:**
- `svelte-inview`: Exclusively for viewport entry detection during _reveal animations_ (Threshold: shell `0.2`, card `0.15-0.25`).
- `svelte-motion`: Exclusively for precise micro-interactions like spring/tween (e.g., pointer interaction on the letter "D").

- **Icon Strategy:** Use locally crafted custom SVG components or SVG sprites. **Installing large, third-party icon packages is strictly forbidden.**

---

## 4. Homepage Section Inventory

### Hero Section

- **Content:** Introduction of name + role, code-like decorative tags, and a CTA to scroll down to contact.
- **Visual Anchor:** An interactive large letter "D" featuring a _floating presence_ effect that responds to pointer movements via `svelte-motion`.

### About Section

- **Content:** Profile picture, a curated self-description (avoiding generic text templates), and a summary of the daily _tech stack_.

### Career Section

- **Content:** A timeline displayed in reverse chronological order (newest to oldest).
- **Detail Interaction:** In-depth achievement descriptions are revealed via popovers or detail cards that are touch-safe and focus/hover-aware.

### Contact Section

- **Content:** Direct access without contact forms. Provides external links to GitHub, LinkedIn, Instagram, Email, and CV download.

---

## 5. Architecture & State Policy

- **State Management:** Prioritize _local component state_ via runes. Global store libraries are not allowed. If state sharing is required (e.g., tracking active navigation or loading screen status), use the _root layout state passing downward_ approach or Svelte Context if severe _prop-drilling_ occurs.
- **Content Isolation:** Components are solely responsible for rendering data. All copywriting text and portfolio data must be isolated within TypeScript modules inside the `src/lib/data` directory.
- **Static Assets:** The `static/` folder must only be used for host-level files such as `.nojekyll` or `robots.txt`. All portfolio images and icons must be placed in `src/lib/assets` and imported directly into components to ensure safe path resolution when deployed to GitHub Pages sub-paths.
- **Quality Assurance:** All written code must pass local validation without errors using the following commands: `npm run check`, `npm run lint`, and `npm run build`.
