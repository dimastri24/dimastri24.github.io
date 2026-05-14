# Implementation Plan

## Execution Order

Implementation should follow dependency order, not visual order alone. Foundation and data contracts come first so later components do not need rework.

## Milestone 1: Foundation And Configuration

### Objectives

- Prepare the app for static GitHub Pages deployment
- Establish root-level page options
- Add approved dependencies
- Create content/type/theme scaffolding

### Tasks

1. Add `svelte-inview` and the selected lightweight icon strategy dependency if needed.
2. Configure `adapter-static` with GitHub Pages-compatible fallback behavior.
3. Add `BASE_PATH`-driven `kit.paths.base` handling in `svelte.config.js`.
4. Add root `+layout.ts` for:
   - `prerender = true`
   - chosen trailing slash policy
5. Add `src/error.html` and plan for root `+error.svelte`.
6. Create `src/lib/types` and `src/lib/data` modules with placeholder content contracts.

### Exit Criteria

- Static build path is defined
- Page options are centralized
- Content structure exists before UI rendering begins

## Milestone 2: Design Tokens And Global Shell

### Objectives

- Install the visual system before section implementation
- Create the shell that all sections depend on

### Tasks

1. Replace starter global CSS with token-driven global styling.
2. Define color, spacing, radius, border, z-index, and motion variables.
3. Build the root layout shell.
4. Add page-level background handling and default metadata.
5. Introduce shared section wrapper and base UI primitives.

### Exit Criteria

- Global tokens exist
- Base shell renders cleanly
- Shared layout primitives are available

## Milestone 3: Sidebar Navigation

### Objectives

- Implement the primary navigation pattern before section polish

### Tasks

1. Define the `SectionId` and nav-item content contract.
2. Build the fixed desktop sidebar.
3. Build the mobile-adapted sidebar or dock variant.
4. Add smooth in-page section navigation.
5. Add active-section indication driven by viewport awareness or scroll state.
6. Add keyboard and focus-visible support.

### Exit Criteria

- Sidebar navigates correctly to all homepage sections
- Active state is reliable on desktop and mobile

## Milestone 4: Loading Screen

### Objectives

- Implement the initial branded loading experience before hero reveal logic

### Tasks

1. Build the fullscreen loading component.
2. Implement a lightweight progression model tied to app readiness, not a fake delay.
3. Add animated dots and percentage display.
4. Add upward exit transition with reduced-motion fallback.
5. Ensure the homepage is still usable if the loading screen is skipped in reduced motion.

### Exit Criteria

- Load screen appears only on initial load
- Exit transition is smooth and short
- No artificial long wait is introduced

## Milestone 5: Hero Section

### Objectives

- Establish the page's strongest identity moment

### Tasks

1. Build the left-side developer typography composition.
2. Render code-tag accents and main headline.
3. Add CTA scroll-to-contact behavior.
4. Build the large decorative "D" visual treatment.
5. Add selective motion:
   - reveal transitions
   - subtle parallax/tilt if pointer capabilities allow
6. Validate mobile stacking and spacing.

### Exit Criteria

- Hero communicates identity immediately
- Decorative motion does not hurt readability

## Milestone 6: About Section

### Objectives

- Introduce professional profile details with clean editorial layout

### Tasks

1. Add profile image asset handling.
2. Build image + copy layout.
3. Render typed intro content and technology/tool summary.
4. Add scroll reveal behavior.
5. Validate contrast and text width on light background.

### Exit Criteria

- About content is readable, concise, and visually balanced

## Milestone 7: Career Timeline

### Objectives

- Implement the highest-complexity section with layout and interaction rigor

### Tasks

1. Define the `CareerEntry` contract and sample placeholder data.
2. Build desktop vertical timeline layout:
   - date column
   - center line and marker
   - content column
3. Build mobile single-column adaptation.
4. Add detail disclosure behavior for hover/focus/touch.
5. Add subtle section and item reveal motion.
6. Ensure popover behavior remains accessible without hover.

### Exit Criteria

- Timeline is readable on mobile and desktop
- Detail interaction works with mouse, keyboard, and touch

## Milestone 8: Contact Section

### Objectives

- Make contact actions direct and complete

### Tasks

1. Define `ContactMethod` and `SocialLink` contracts.
2. Build contact list rows with icons and labels.
3. Add email and external links with clear semantics.
4. Add CV action using the Google Drive URL from content data.
5. Add hover/focus states and optional outbound indicators.

### Exit Criteria

- All contact methods are obvious and easy to use

## Milestone 9: 404, SEO, And Metadata

### Objectives

- Finish route completeness and search-facing basics

### Tasks

1. Build root `+error.svelte`.
2. Ensure static `404.html` output is generated for GitHub Pages.
3. Add page title and description metadata.
4. Add meaningful heading structure and landmarks.
5. Validate normalized URL behavior and internal-link correctness under base path.

### Exit Criteria

- 404 behavior is branded and navigable
- SEO baseline is in place

## Milestone 10: Polish, Verification, And Deploy

### Objectives

- Stabilize the build and validate constraints

### Tasks

1. Review motion timing consistency.
2. Review reduced-motion behavior.
3. Review spacing and section transitions across breakpoints.
4. Run `npm run check`.
5. Run `npm run lint`.
6. Run `npm run build`.
7. Validate generated output for GitHub Pages assumptions.
8. Add GitHub Actions workflow and deployment docs.

### Exit Criteria

- The site builds cleanly
- Static output is deployable
- All planned UX patterns are present

## Dependency Ordering Rules

- Configure deployment before writing route logic that depends on path behavior.
- Define theme tokens before building section visuals.
- Define content types before rendering any section.
- Define reduced-motion policy before implementing premium motion.
- Build shared primitives before route-specific section markup.
- Build timeline interaction after base popover and icon patterns exist.

## Recommended Build Sequence

1. Config and root options
2. Theme tokens and global CSS
3. Content types and data modules
4. Shared UI primitives
5. Sidebar navigation
6. Loading screen
7. Hero
8. About
9. Career timeline
10. Contact
11. Error and SEO work
12. Verification and deployment
