# docs/AGENT_GUIDELINES.md

## 1. Environment & MCP Tools

* **Stack**: SvelteKit 5 (Runes), TypeScript, npm, TailwindCSS, Prettier, ESLint, MDsvex, GitHub Pages.
* **Svelte MCP Server Tools** (Mandatory Workflow):
1. `list-sections`: Run FIRST on any Svelte/SvelteKit query to discover docs.
2. `get-documentation`: Run IMMEDIATELY after to fetch all relevant section contents.
3. `svelte-autofixer`: Run ALWAYS before presenting or saving Svelte code. Repeat until 0 errors.
4. `playground-link`: Ask user permission FIRST. Never use if writing directly to project files.

---

## 2. Code Architecture & Ownership

* **`src/lib/data`**: Owns all typed portfolio content. No hardcoded facts in components.
* **`src/lib/types`**: Owns public interfaces/unions. No `any`. Separate content types from UI helpers. Narrow unions for IDs/variants.
* **`src/lib/components`**: Owns rendering and localized behavior. Thin, reusable primitives. Do not extract shared components for single-use unless isolating complex motion/a11y.
* **`src/routes`**: Owns route composition and page options only. Keep generic UI free of route concerns.

---

## 3. Development Rules

### Svelte & TS Conventions

* Strict Svelte 5 runes mode. Use typed `$props`. Restrict `$effect` to actual side effects.
* Prefer direct component composition over complex abstractions.
* Favor explicitness over cleverness. Delete dead code/CSS/starter templates immediately.

### Styling & UI

* Themes must use CSS custom properties. Tailwind must map to the tokenized system.
* **Color Restriction**: Gold is accent-only. No large gold surfaces or gold body text.
* Maintain consistent border-radius, shadow, spacing, and alternating dark/light section rhythm.
* **Navigation**: No top navbar. Desktop = Sidebar. Mobile = Bottom/accessible nav (no content coverage). Active indicators must not rely on hover.

### Motion & Performance

* **Banned**: WebGL, Three.js, large icon packs, unapproved animation libraries.
* Default to native Svelte or CSS transitions. No client-side fetching for core homepage content (must render as static HTML).
* `svelte-inview` for viewport detection only. `svelte-motion` for selective spring/tween only.
* Do not animate every element. Disable/simplify parallax and extended motion if reduced-motion or coarse pointers are detected.

### Accessibility (A11y)

* Semantic landmarks, strict heading hierarchy, and obvious focus-visible states on all surfaces.
* 100% keyboard, touch, and screen-reader accessible (hide decorative icons via `aria-hidden`).
* Provide clear alt text. Hover-dependent details must have touch/focus fallbacks. Clear/safe external links.

### Deployment & Errors

* App must be 100% prerenderable with SSR enabled. No server-only dependencies.
* Account for GitHub Pages base path behavior in assets and navigation.
* Provide a root branded `+error.svelte` and a static `error.html` fallback.

---

## 4. Definition of Done (Verification)

Before completing any task, ensure:

1. `npm run check` & `npm run lint` pass perfectly.
2. `npm run build` succeeds and root page prerenders.
3. Custom 404 behavior for GitHub Pages is verified.
4. Manual check completed for: Mobile responsive, Keyboard nav, and Reduced-motion.