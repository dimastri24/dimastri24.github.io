# Animation Spec

## Motion Policy

The site should feel refined and responsive, not theatrical. Every motion choice must support one of these goals:

- orientation
- emphasis
- affordance
- polish

If an animation does not improve one of those, remove it.

## Approved Motion Stack

- CSS transitions for simple hover, color, opacity, and transform changes
- Svelte native transitions for enter/exit behavior
- `svelte-inview` for viewport entry detection only
- `svelte-motion` for selective spring or tween interactions only

Do not add additional animation libraries.

## Reduced Motion Rules

- Respect `prefers-reduced-motion`.
- Remove parallax, spring drift, and large travel distances when reduced motion is enabled.
- Keep opacity transitions short or instantaneous if needed for continuity.
- Do not hide content behind delayed animation in reduced motion mode.

## Timing System

### Default Durations

- hover/focus transitions: `140ms` to `180ms`
- standard reveal transitions: `220ms` to `320ms`
- section-level reveal transitions: `320ms` to `420ms`
- loading-screen exit: `480ms` to `650ms`

### Easing

- default: smooth deceleration curve similar to `cubic-bezier(0.22, 1, 0.36, 1)`
- emphasis: slightly stronger ease for hero and loading transitions
- avoid bounce or elastic motion except for very small hero-mark interaction

## Loading Screen

### Behavior

- Appears on initial page load only
- Covers viewport fully
- Shows:
  - bottom-left "loading" label
  - animated dot sequence
  - bottom-right percentage counter

### Progress Model

- Progress should be driven by app readiness and a short staged interpolation, not a fake fixed delay.
- Total perceived loading time should usually remain under 900ms on normal loads.
- If readiness resolves quickly, allow a brief minimum display window so the transition does not flash.

### Exit Motion

- Screen slides upward
- Main page is revealed underneath
- Optional slight fade can accompany the upward movement

Recommended values:

- duration: `540ms`
- translateY: `0` to `-100%`
- opacity: `1` to `0.98` or none

Reduced motion:

- replace with quick fade or immediate removal

## Section Reveal Motion

### Trigger

- Use `svelte-inview` or equivalent observer logic
- Trigger once per section by default

### Threshold Guidance

- section wrappers: around `0.2`
- smaller cards/items: `0.15` to `0.25`

### Standard Reveal Pattern

- opacity from `0` to `1`
- translateY from `16px` or `24px` to `0`
- no scaling for paragraph-heavy content

Recommended values:

- duration: `280ms` to `360ms`
- stagger step: `60ms` to `90ms`

Reduced motion:

- use opacity-only or no reveal delay

## Sidebar Navigation Motion

### Hover

- icon color shift toward accent or stronger contrast
- subtle background tint or border emphasis
- optional `translateX(2px)` on desktop only

Duration:

- `160ms`

### Active State

- active item remains visually distinct even without hover
- preferred signals:
  - accent line or glow
  - filled or tinted background
  - icon contrast increase

### Mobile Variant

- keep transitions simpler
- avoid lateral movement that makes the dock feel unstable

Reduced motion:

- state changes remain immediate or near-immediate

## Hero Motion

### Text Reveal

- hero copy may reveal on initial mount in a short stagger
- avoid line-by-line theatrical sequencing

Recommended pattern:

- heading fades/slides in first
- supporting role labels follow
- CTA enters last

### Decorative Code Tags

- Small upward or lateral settle motion only
- duration should be shorter than the main heading

### Hero Mark "D"

Behavior:

- slight floating presence at rest
- subtle shadow depth
- optional pointer-responsive rotation/parallax

Implementation guidance:

- use `svelte-motion` spring or tween for pointer smoothing
- cap rotation to a small range
- disable on coarse pointers and reduced-motion mode

Recommended values:

- rotation range: `4deg` to `8deg` maximum
- translation range: `6px` to `12px`
- spring should feel controlled, not bouncy

### CTA Button

- hover lift of `1px` to `2px`
- shadow increase or border-brightness shift
- active press returns to baseline quickly

## About Section Motion

- image and text may reveal with a slight offset stagger
- no parallax
- no looping ambient movement

Recommended pattern:

- image reveals first or simultaneously
- body copy follows with a short delay

## Career Timeline Motion

### Section Entry

- section title and intro reveal first
- timeline items stagger in top-to-bottom order

### Timeline Item

- each item fades/slides in with a shorter distance than the hero
- marker may scale from `0.9` to `1`

### Popover / Detail Card

Desktop hover/focus:

- opacity from `0` to `1`
- translateY from `8px` to `0`
- duration `180ms` to `220ms`

Touch fallback:

- use tap-to-toggle or inline expand behavior
- avoid hover-only assumptions

Reduced motion:

- open/close with opacity only or immediate display

## Contact Section Motion

- row hover states should communicate interactivity
- outbound actions may use slight icon shift or underline expansion
- keep these subtle to preserve professional tone

Recommended values:

- color transition: `160ms`
- transform shift: `1px` to `2px`

## Motion Sequencing Rules

- Never animate more than one major scene transition at the same time if it harms readability.
- Prefer staggered children inside a stable parent over moving entire blocks long distances.
- Avoid continuous looping motion except for the loading dots and possibly a nearly imperceptible hero mark drift.

## Hard Limits

- No large background particles
- No heavy blur animations
- No scroll-jacking
- No dramatic zoom transitions
- No animation that delays access to contact information or career content
