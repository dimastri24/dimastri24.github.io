# Task Checklist

## Milestone 1: Foundation And Config

- [x] Add approved dependencies.
      Acceptance: `package.json` includes `svelte-inview` and the chosen icon solution only if required.
      Note: `svelte-inview` was added. No icon package was added because the selected approach is a lightweight local SVG strategy unless a package becomes necessary later.

- [x] Configure GitHub Pages-compatible static adapter output.
      Acceptance: `svelte.config.js` includes `adapter-static` fallback settings suitable for Pages.

- [x] Add environment-driven base-path handling.
      Acceptance: production builds can inject `BASE_PATH` while local dev still serves from `/`.

- [x] Add root page options file.
      Acceptance: root layout options define prerendering and trailing slash policy in one place.

- [x] Add static fallback error document.
      Acceptance: `src/error.html` exists and is branded enough to avoid default browser-feeling failure output.

## Milestone 2: Types, Data, And Theme

- [x] Create shared content and UI type definitions.
      Acceptance: `SectionId`, `NavItem`, `CareerEntry`, `ContactMethod`, and related interfaces compile without `any`.
      Note: these are currently scaffolded in `src/lib/types` and already compile cleanly.

- [x] Create typed portfolio content modules.
      Acceptance: hero, about, career, contact, and site metadata live in `src/lib/data`.
      Note: these are placeholder portfolio data modules created as Milestone 1 scaffolding and will be refined in later milestones.

- [ ] Replace starter global CSS with token-driven globals.
      Acceptance: global stylesheet defines theme variables for color, spacing, radius, border, shadow, and motion.

- [ ] Add shared shell and layout primitives.
      Acceptance: there is a reusable section wrapper and container strategy before section-specific styling begins.

## Milestone 3: Navigation

- [ ] Build desktop fixed sidebar navigation.
      Acceptance: desktop viewport shows four icon-based nav actions linked to all homepage anchors.

- [ ] Build mobile sidebar adaptation.
      Acceptance: navigation remains easy to reach on small screens without obscuring section content.

- [ ] Implement smooth section navigation.
      Acceptance: activating a nav item scrolls to the correct section target without broken base-path behavior.

- [ ] Implement active-section state.
      Acceptance: the current section is visibly indicated while scrolling through the homepage.

- [ ] Add keyboard and focus support to nav items.
      Acceptance: tabbing through navigation exposes clear focus states and fully usable actions.

## Milestone 4: Loading Screen

- [ ] Implement the fullscreen loading overlay.
      Acceptance: initial load shows "loading", animated dots, and a percentage counter.

- [ ] Wire loading completion to real app readiness.
      Acceptance: the loading screen does not wait for an arbitrary long fixed timeout.

- [ ] Add exit transition and reduced-motion fallback.
      Acceptance: default mode slides the overlay away; reduced motion simplifies or removes the effect.

## Milestone 5: Hero

- [ ] Build hero text composition.
      Acceptance: the hero renders code-tag accents, the main heading, role labels, and CTA.

- [ ] Implement CTA scroll-to-contact behavior.
      Acceptance: activating the CTA reaches the contact section reliably.

- [ ] Build the large decorative hero mark.
      Acceptance: the hero includes a prominent stylized "D" with depth and clear composition balance.

- [ ] Add selective hero motion.
      Acceptance: reveal and mark interaction feel polished without heavy libraries or distracting movement.

- [ ] Validate mobile hero layout.
      Acceptance: mobile view stacks cleanly with no overlap or clipped text.

## Milestone 6: About

- [ ] Add profile image handling.
      Acceptance: the profile image loads via an approved asset strategy and does not cause layout shift.

- [ ] Render about copy from typed data.
      Acceptance: no profile prose is hardcoded directly in the section component.

- [ ] Add reveal animation with reduced-motion support.
      Acceptance: section entrance degrades gracefully when reduced motion is active.

## Milestone 7: Career Timeline

- [ ] Build desktop timeline structure.
      Acceptance: dates, center line, markers, and content columns align correctly on desktop.

- [ ] Build mobile timeline adaptation.
      Acceptance: the timeline collapses into a readable single-column layout on narrow screens.

- [ ] Add detail disclosure behavior.
      Acceptance: hovering, focusing, or tapping a timeline item reveals detailed responsibilities or achievements.

- [ ] Add accessible popover or inline detail fallback.
      Acceptance: no timeline details are hover-only.

- [ ] Populate placeholder career entries from typed data.
      Acceptance: entries are latest-to-oldest and include role, org, summary, and detail fields.

## Milestone 8: Contact

- [ ] Render contact methods from typed data.
      Acceptance: GitHub, LinkedIn, Instagram, email, and CV action appear from a centralized data source.

- [ ] Add external-link semantics and states.
      Acceptance: outbound links are clear, keyboard accessible, and visually interactive.

- [ ] Style contact rows using shared patterns.
      Acceptance: contact rows feel consistent with the global UI system.

## Milestone 9: Error Handling And SEO

- [ ] Build root branded `+error.svelte`.
      Acceptance: in-app route errors render a custom experience with a return-home action.

- [ ] Ensure GitHub Pages `404.html` output exists.
      Acceptance: static build output contains a suitable fallback page for Pages hosting.

- [ ] Add title and description metadata.
      Acceptance: homepage and error route have explicit metadata rather than scaffold defaults.

- [ ] Validate heading and landmark structure.
      Acceptance: section hierarchy is semantically meaningful and not purely visual.

## Milestone 10: Polish And Deploy

- [ ] Review spacing, contrast, and section rhythm.
      Acceptance: dark/light alternation and token usage remain consistent across the homepage.

- [ ] Review reduced-motion behavior across all major interactions.
      Acceptance: the app remains fully usable with motion reduction enabled.

- [ ] Run type and Svelte checks.
      Acceptance: `npm run check` passes.

- [ ] Run linting.
      Acceptance: `npm run lint` passes.

- [ ] Run production build.
      Acceptance: `npm run build` passes and emits static output without deployment-blocking warnings.

- [ ] Validate base-path deployment.
      Acceptance: local verification confirms links and assets still resolve under a repo-name subpath assumption.

- [ ] Add GitHub Actions deployment workflow.
      Acceptance: the repo contains an automated Pages deployment workflow aligned with the documented build path.
