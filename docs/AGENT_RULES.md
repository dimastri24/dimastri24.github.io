# Agent Rules

## Scope Rule

Implement only the portfolio described in these docs. Do not introduce extra pages, backend features, CMS plumbing, or libraries outside the approved stack unless a documented blocker requires it.

## Coding Conventions

### Svelte

- Use Svelte 5 runes mode conventions throughout app code.
- Use typed `$props` in components.
- Keep `$effect` for real side effects only.
- Prefer direct component composition over indirection-heavy abstraction.

### TypeScript

- Define shared interfaces in `src/lib/types`.
- Keep content types separate from UI helper types.
- Avoid `any`.
- Keep unions narrow and explicit for IDs and variants.

### File Ownership

- `src/lib/data` owns portfolio content.
- `src/lib/types` owns public interfaces and unions.
- `src/lib/components` owns rendering and localized behavior.
- `src/routes` owns route composition and page options only.

## Component Rules

- Components render data passed to them; they should not hardcode portfolio facts.
- Shared primitives should remain thin and reusable.
- Do not extract a new shared component after only one use unless it isolates complex motion or accessibility logic.
- Keep route-only concerns out of generic UI components.

## Styling Rules

- Theme values must come from CSS custom properties.
- Tailwind utilities should reference the tokenized system rather than ad hoc literal values wherever practical.
- Gold is accent-only. Do not build large gold surfaces or gold paragraph text blocks.
- Maintain consistent border radius, shadow, and spacing values across sections.
- Preserve the alternating dark/light section rhythm.

## Accessibility Rules

- Use semantic landmarks and heading hierarchy.
- Every interactive element must be keyboard accessible.
- Focus-visible states must be obvious on dark and light surfaces.
- Decorative icons should be hidden from assistive tech unless they convey unique meaning.
- Provide alt text for profile and meaningful imagery.
- Hover-dependent career details must have focus and touch-accessible behavior.
- External links should be labeled clearly and safely.
- Respect reduced motion across all non-essential animation.

## Performance Rules

- No WebGL
- No Three.js
- No large icon packages
- No animation libraries beyond the approved set
- No client-side fetching for essential homepage content
- No unnecessary stores or generalized state frameworks
- Keep the homepage payload small and renderable as static HTML

## Motion Rules

- Default to CSS or native Svelte transitions.
- Use `svelte-inview` only for viewport detection.
- Use `svelte-motion` only for selective spring/tween behavior.
- Disable or simplify parallax and extended motion under reduced motion or coarse pointer environments.
- Do not animate every element by default.

## Content Rules

- All editable portfolio content must live in typed data modules.
- Placeholder content must still be realistic and structurally complete.
- Do not bury core facts inside decorative copy.
- Keep CTA labels short and concrete.

## Navigation Rules

- No traditional top navbar.
- Sidebar is the primary navigation on desktop.
- Mobile navigation must remain easy to reach without covering content.
- Active section indication must be reliable and not depend on hover.

## Error And Deployment Rules

- Keep the app fully prerenderable.
- Do not introduce server-only dependencies.
- Keep SSR enabled for prerendered output.
- Ensure GitHub Pages base path behavior is accounted for in internal navigation and assets.
- Support a root branded `+error.svelte` and a static fallback `error.html`.

## Clean Code Expectations

- Favor explicitness over cleverness.
- Keep utility helpers small and named by behavior.
- Delete starter code once replaced.
- Avoid dead CSS and abandoned experimental components.
- If a pattern is one-off, keep it local instead of inventing a framework around it.

## Verification Expectations

Before considering implementation complete:

- `npm run check` passes
- `npm run lint` passes
- `npm run build` passes
- root page prerenders successfully
- custom 404 behavior exists for GitHub Pages
- keyboard, reduced-motion, and mobile checks are completed
