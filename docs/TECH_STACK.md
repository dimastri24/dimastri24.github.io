# Tech Stack

## Current Repository State

The repository currently contains:

- SvelteKit `^2.57.0`
- Svelte `^5.55.2`
- TypeScript `^6.0.2`
- Tailwind CSS `^4.2.2`
- `@sveltejs/adapter-static` `^3.0.10`
- mdsvex `^0.12.7`
- ESLint, Prettier, and Svelte tooling

The app is still the starter scaffold. No portfolio-specific dependencies have been added yet.

## Approved Runtime And Build Stack

### Framework

- SvelteKit 2
- Svelte 5 with runes mode enabled
- TypeScript for all shared logic and content definitions

### Styling

- Tailwind CSS 4 for utilities and responsive layout
- CSS custom properties for theme tokens
- Local component styles only when utility classes become too noisy or repeated

### Static Deployment

- `@sveltejs/adapter-static`
- Full prerendering enabled at the root layout level
- GitHub Pages as deployment target

## Planned Additions

### `svelte-inview`

Use for viewport entry detection only.

Why:

- Clean trigger point for reveal animations
- Simpler than manually wiring repeated `IntersectionObserver` logic
- Keeps section enter state consistent across the homepage

Do not use it as a general state or layout utility.

### `svelte-motion`

Use selectively for premium motion behavior only.

Why:

- Suitable for spring/tween-style motion where CSS transitions are too rigid
- Good fit for hero letter interaction and select micro-interactions
- Supports reduced-motion-aware fallbacks when paired with Svelte motion primitives

Do not use it for every animation. Default to CSS or native Svelte transitions first.

### Icon Strategy

Adopt a lightweight icon approach based on an SVG sprite or small hand-curated SVG component set.

Why:

- Avoid large per-icon Svelte packages that slow dependency optimization
- Keep icon payload explicit and limited to the 4 sidebar icons plus contact icons
- Preserve visual consistency by controlling stroke width, size, and hover treatment directly

Avoid icon packages that ship thousands of `.svelte` files.

## Why This Stack

### SvelteKit Static Prerendering

Why:

- Strong default SSR/HTML output for SEO and initial load quality
- Straightforward static export path
- Clean route, layout, and error primitives
- Works well for a single-page portfolio with a custom 404 page

Decision:

- Keep SSR intact
- Prerender the entire app
- Do not convert the site into an SPA shell

### Tailwind CSS 4

Why:

- Fast iteration for a visual-first build
- Strong responsive utility model
- Easy composition of spacing and typography patterns
- Can coexist cleanly with CSS variables for theme tokens

Decision:

- Use CSS variables as the single source of truth for theme values
- Use Tailwind utilities as the application layer over those tokens

### Typed TypeScript Content Modules

Why:

- The portfolio is structured and finite
- Data shapes should be validated at compile time
- Editing content in one place is simpler than scattering literals through components
- No CMS or MDsveX pipeline is required for this project scope

Decision:

- Store structured content in `src/lib/data`
- Store interfaces and unions in `src/lib/types`
- Keep markdown support available in the repo, but do not use mdsvex as the primary portfolio content source

### Imported Assets

Why:

- Imported assets receive hashed filenames and cache-safe output
- Better fit for profile image, decorative assets, and future social preview images
- Reduces manual path risk when deployed under a GitHub Pages base path

Decision:

- Prefer imported assets from `src/lib/assets`
- Reserve `static/` for host-level files such as `.nojekyll`, robots, or other fixed-name assets

## GitHub Pages Constraints

### Static Output

- Must build with `adapter-static`
- Must generate a fallback `404.html`
- Must not rely on server routes or runtime backend behavior

### Base Path

If the repository is not published as `username.github.io`, Pages serves the site from a subpath:

- Example: `/web-portfolio`

Decision:

- Configure `config.kit.paths.base` via `BASE_PATH` for production builds
- Keep dev builds at an empty base path
- Use `$app/paths` awareness when generating internal links or asset-aware helpers

### Page Options

Standardize the following:

- root-level `prerender = true`
- root-level trailing slash policy suitable for GitHub Pages
- SSR remains enabled

## Tooling Expectations

- `npm run check`
- `npm run lint`
- `npm run build`

All implementation work is expected to keep those commands passing.

## Dependency Policy

- Prefer platform-native features and Svelte primitives first
- Add libraries only when they reduce repeated logic materially
- Reject heavy animation, 3D, routing, or state libraries
- Keep the dependency surface understandable by one maintainer
