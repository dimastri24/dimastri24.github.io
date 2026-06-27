# docs/UI_UX_SPEC.md

## 1. Design & Theme Tokens

### Core CSS Variables

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
	--color-shadow-float: rgba(6, 10, 8, 0.22);

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

	--radius-sm: 0.5rem;
	--radius-md: 0.875rem;
	--radius-lg: 1.25rem;
	--radius-xl: 1.75rem;
	--radius-pill: 999px;

	--border-soft-dark: 1px solid var(--color-line-dark);
	--border-soft-light: 1px solid var(--color-line-light);
	--shadow-card: 0 16px 40px var(--color-shadow-soft);
	--shadow-hero: 0 30px 60px var(--color-shadow-dark);
	--shadow-float: 0 24px 50px var(--color-shadow-float);

	--ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
	--ease-soft: cubic-bezier(0.25, 0.1, 0.25, 1);
	--ease-emphasis: cubic-bezier(0.2, 0.8, 0.2, 1);
	--duration-fast: 160ms;
	--duration-base: 260ms;
	--duration-slow: 420ms;
}
```

### UI Rules & Layout

- **Color Tone:** Calm, technical. Gold is accent-only (No large gold surfaces or text blocks).
- **Rhythm:** Alternate Section Treatments (Hero: dark $\rightarrow$ About: light $\rightarrow$ Career: dark $\rightarrow$ Contact: light/dark balance).
- **Padding (Top/Bottom):** Mobile (`4rem`-`5rem`), Tablet (`5rem`-`6rem`), Desktop (`6rem`-`8rem`).
- **Breakpoints:** Desktop = Fixed left sidebar, 2-column hero. Mobile = Bottom nav dock, single-column stacked layout.

---

## 2. Global Motion Policy

- **Approved Stack:** CSS transitions (hover/color/transform), Svelte native transitions (enter/exit), `svelte-inview` (viewport detection only), `svelte-motion` (selective spring/tween only). **No extra libraries.**
- **Reduced Motion:** Mandatory `prefers-reduced-motion` compliance. Remove parallax, spring drift, and long distance travel. Fallback to immediate removal or short opacity fades.
- **Timing System:** Hover (`140ms`-`180ms`), Reveal (`220ms`-`320ms`), Section-reveal (`320ms`-`420ms`), Loading-exit (`480ms`-`650ms`).
- **Limits:** No WebGL/Three.js, no scroll-jacking, no heavy blur animation, no looping animations (except loading dots & subtle hero drift).

---

## 3. Standard Shared Types (`src/lib/types`)

```ts
export type SectionId = 'home' | 'about' | 'career' | 'contact';
export interface NavItem {
	id: SectionId;
	label: string;
	href: `/#${SectionId}`;
	icon: string;
}
export interface HeroContent {
	eyebrowOpenTags: string[];
	heading: string;
	roleLabels: string[];
	ctaLabel: string;
	ctaTarget: SectionId;
	closingTags: string[];
	markLetter: string;
}
export interface AboutContent {
	imageAlt: string;
	intro: string[];
	tools: string[];
}
export interface CareerDetail {
	label: string;
	value: string;
}
export interface CareerEntry {
	id: string;
	month: string;
	year: string;
	rangeLabel: string;
	role: string;
	organization: string;
	summary: string;
	achievements: string[];
	details: CareerDetail[];
	technologies: string[];
}
export interface ContactMethod {
	id: string;
	label: string;
	value: string;
	href: string;
	icon: string;
	external: boolean;
}
export interface SocialLink {
	id: string;
	label: string;
	href: string;
	icon: string;
	external: boolean;
}
export interface MotionPreset {
	name: string;
	duration: number;
	easing: string;
	delay?: number;
}
```

---

## 4. Component Breakdown & Specific Motion Specs

### App Shell & Initial States

- **`+layout.svelte` / `+page.svelte` / `+error.svelte**`: Route-only containers. Layout hosts `AppShell` and handles initial global setup.
- **`AppShell.svelte`**: Coordinates global sidebar visibility, layout shift, and loading overlay.
- **`LoadingScreen.svelte`**: Covers viewport. Shows loading label, animated dots, and artificial percentage counter (under `900ms` total).
- _Exit Motion:_ Slide up (`translateY(0)` to `-100%`) + slight fade over `540ms` using `--ease-standard`.

### Navigation & Observers

- **`SidebarNav.svelte` & `SidebarNavItem.svelte**`: Fixed left panel (desktop) or bottom dock (mobile).
- _Hover (Desktop):_ `translateX(2px)`, color shift to accent, background tint over `160ms`.
- _Active State:_ Distinct accent line, glow, or background tint. Do not rely on hover. Simple transitions on mobile.

- **`SectionObserver.svelte`**: Bridge viewport entry via `svelte-inview`. Threshold: Section wrappers (`0.2`), cards/items (`0.15`-`0.25`).

### Layout Primitives

- **`SectionShell.svelte`**: Reusable container enforcing `dark`/`light` theme backgrounds and standard responsive padding.
- **`PageContainer.svelte`**: Enforces max widths (`content` | `wide` | `hero`).
- **`Button.svelte` / `CvButton.svelte**`: Universal CTA behavior. Hover: lift of `1px`-`2px`, shadow increase/border-brightness change. Active press: returns to baseline instantly.
- **`Icon.svelte`**: Centralized local SVG registry. Enforces stroke and size rules.
- **`Reveal.svelte` & `StaggerGroup.svelte**`: Declarative wrapper mapping opacity (`0`to`1`) and `translateY` (`16px`/`24px`to`0`). Stagger step: `60ms`to`90ms`.

### Page Sections

- **`HeroSection.svelte`**: Reveals copy on mount using a tight stagger hierarchy (Heading $\rightarrow$ Role Labels $\rightarrow$ CTA). No line-by-line sequencing.
- **`HeroMark.svelte`**: Handles decorative uppercase letter "D".
- _Motion:_ Gentle ambient floating drift at rest. Pointer smoothing using `svelte-motion` spring. Cap rotation to `4deg`-`8deg`, translation to `6px`-`12px`. Disable on coarse pointers/reduced motion.

- **`AboutSection.svelte`**: Profile image and intro layout. Image and text reveal simultaneously or via a minor offset stagger. No looping ambient effects or parallax.
- **`CareerSection.svelte` / `CareerTimeline.svelte` / `CareerTimelineItem.svelte**`: Displays ordered timeline blocks. Staggered from top to bottom. Item marker scales from `0.9`to`1` on reveal.
- **`CareerDetailPopover.svelte`**: Responsibilities overlay card.
- _Desktop Motion:_ Hover/focus triggers opacity (`0` to `1`) and `translateY` (`8px` to `0`) over `180ms`-`220ms`.
- _Touch Fallback:_ Tap-to-toggle or inline expansion. **No hover dependency.**

- **`ContactSection.svelte` / `ContactList.svelte` / `ContactLinkRow.svelte**`: Interactivity links with clean icon rows. Hover triggers color transition (`160ms`) and subtle transform shift (`1px`-`2px`). No intrusive animations.
