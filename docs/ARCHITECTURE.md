# Architecture

## Current State

The repository currently contains:

- a root layout
- a default scaffold homepage
- global route CSS
- static adapter configuration without GitHub Pages path tuning

No portfolio component structure exists yet.

## Target Application Shape

The finished app should remain small and explicit:

- one public homepage route
- one custom 404 experience
- one global layout shell
- shared data and shared UI in `src/lib`

## Target Folder Structure

```text
src/
  app.html
  error.html
  lib/
    assets/
      profile/
      icons/
      social/
    components/
      app/
      layout/
      navigation/
      sections/
      timeline/
      contact/
      motion/
      ui/
    data/
      site.ts
      hero.ts
      about.ts
      career.ts
      contact.ts
    types/
      content.ts
      ui.ts
      motion.ts
    utils/
      classnames.ts
      motion.ts
      scroll.ts
      paths.ts
  routes/
    +layout.ts
    +layout.svelte
    +page.svelte
    +error.svelte
  routes/
    layout.css
```

Notes:

- `+layout.ts` should own root-level page options such as prerendering and trailing slash policy.
- `+layout.svelte` should own the global shell only.
- `+page.svelte` should compose the homepage sections from shared data and components.
- `+error.svelte` should handle route-level errors and 404 presentation.
- `src/error.html` should exist as the static fallback failure page.

## Route Strategy

### `/`

Responsibilities:

- render the full portfolio homepage
- mount the loading screen and section stack
- provide all scroll targets used by sidebar navigation

### Root `+layout`

Responsibilities:

- import global CSS
- define root metadata defaults
- provide shell-level coordination for:
  - loading screen visibility
  - sidebar presence
  - reduced-motion-aware global classes if needed

Keep the root layout thin. It should not become a data layer or a catch-all behavior container.

### Root `+error.svelte`

Responsibilities:

- show custom branded error UI for in-app routing failures
- expose a clear return-home action
- preserve visual consistency with the main portfolio

### `src/error.html`

Responsibilities:

- act as the hard fallback page if SvelteKit cannot render the route tree
- remain simple and branded
- avoid dependency on app JavaScript

## Component Architecture

### Shared Component Families

`src/lib/components/app`

- Loading screen
- App shell helpers

`src/lib/components/layout`

- Section wrapper
- Page container
- Surface/background primitives

`src/lib/components/navigation`

- Sidebar navigation
- Sidebar nav item
- Section progress/active indicator

`src/lib/components/sections`

- Hero section
- About section
- Career section
- Contact section
- 404 section if shared patterns are reused

`src/lib/components/timeline`

- Timeline list
- Timeline item
- Timeline popover/detail card

`src/lib/components/contact`

- Contact list
- Contact link row
- CV button

`src/lib/components/motion`

- reveal wrapper
- stagger group wrapper
- reduced-motion helpers

`src/lib/components/ui`

- Button
- Icon
- Badge
- Eyebrow/meta text
- Popover surface

## State Management Decisions

### Default Rule

Use local component state with Svelte 5 runes.

Approved primitives:

- `$state`
- `$derived`
- `$effect`
- typed `$props`

### Shared State Policy

Do not introduce a global store by default.

Shared state is only justified for:

- active section tracking used by the sidebar
- initial loading-screen completion state if layout and page components both need it

Even in those cases, prefer:

- root layout state passed downward
- context only if prop threading becomes materially noisy

Do not use a store library.

## Content/Data Architecture

### Single Source Of Truth

All portfolio content must live in typed TypeScript data modules under `src/lib/data`.

Required content domains:

- site metadata
- hero content
- about content
- career timeline entries
- contact methods

### Required Type Families

At minimum, define:

- `SectionId`
- `NavItem`
- `HeroContent`
- `AboutContent`
- `CareerEntry`
- `CareerDetail`
- `ContactMethod`
- `SocialLink`
- `SiteMetadata`

### Content Rules

- Components render data; they do not own portfolio copy.
- Section IDs must be centralized and reused by navigation and scroll logic.
- Contact links must declare whether they open externally.

## Styling Architecture

### Source Of Truth

Theme values live as CSS custom properties in the global stylesheet layer.

Tailwind responsibilities:

- spacing application
- layout
- typography utilities
- responsive changes
- state styling

Local CSS responsibilities:

- custom keyframes
- complex layered backgrounds
- component-specific effects that are unreadable as utility chains

## Asset Strategy

### Imported Assets

Prefer imported assets for:

- profile image
- hero visual assets
- icons if packaged as local SVG files
- SEO/social preview assets

### `static/`

Reserve for:

- `.nojekyll` if needed
- robots.txt
- fixed-name files that must not be fingerprinted

## SEO And Metadata Architecture

- Site-level metadata should be centralized in a typed module.
- The root layout should provide metadata defaults.
- The homepage should override title/description if needed.
- The 404 experience should have explicit title handling.

## Error And Fallback Strategy

- Use `+error.svelte` for route-level branded errors.
- Use `src/error.html` for catastrophic fallback.
- Use GitHub Pages `404.html` output as required by static hosting.
- Do not rely on server hooks or backend-based recovery behavior.

## Architecture Constraints

- No backend modules
- No server-only content dependencies
- No route sprawl
- No unbounded generic component abstractions
- No animation framework wrappers that hide simple behavior behind unnecessary indirection
