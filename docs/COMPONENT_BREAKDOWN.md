# Component Breakdown

## Component Inventory

This breakdown defines the minimum component set required for implementation. Components should be introduced only when they create real reuse or isolate complex behavior.

## Shared Types To Standardize

```ts
export type SectionId = 'home' | 'about' | 'career' | 'contact';

export interface NavItem {
	id: SectionId;
	label: string;
	href: `/#${SectionId}`;
	icon: string;
}

export interface HeroBadge {
	label: string;
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

## Route-Level Components

### `src/routes/+layout.svelte`

Responsibility:

- import global styles
- render the application shell
- host loading-screen and sidebar layout integration

Props:

- framework-provided `children`

Reuse:

- route-only

### `src/routes/+page.svelte`

Responsibility:

- compose homepage sections in order
- connect section IDs with navigation state

Reuse:

- route-only

### `src/routes/+error.svelte`

Responsibility:

- render branded error state with return-home action

Reuse:

- route-only

## App And Shell Components

### `AppShell.svelte`

Responsibility:

- coordinate sidebar, main content wrapper, and initial loading state

Props:

- `showSidebar: boolean`
- `children`

Reuse:

- shared within route shell only

### `LoadingScreen.svelte`

Responsibility:

- show initial loading overlay with dots and percentage
- animate out when ready

Props:

- `visible: boolean`
- `reducedMotion?: boolean`

Motion ownership:

- owns enter and exit timing

Reuse:

- single-use app component

## Navigation Components

### `SidebarNav.svelte`

Responsibility:

- render primary fixed navigation
- handle desktop/mobile variant switching

Props:

- `items: NavItem[]`
- `activeSection: SectionId`
- `isMobile?: boolean`

Reuse:

- shared

### `SidebarNavItem.svelte`

Responsibility:

- render one icon button with active, hover, and focus states

Props:

- `item: NavItem`
- `active: boolean`

Reuse:

- shared

### `SectionObserver.svelte`

Responsibility:

- bridge viewport entry detection with active-section updates

Props:

- `id: SectionId`
- `threshold?: number`

Reuse:

- shared, if section reveal and nav tracking both need the same observer behavior

## Layout Components

### `SectionShell.svelte`

Responsibility:

- provide anchor ID, spacing, container width, and surface variant

Props:

- `id: SectionId`
- `variant: 'dark' | 'light'`
- `label?: string`
- `children`

Reuse:

- shared by every homepage section

### `PageContainer.svelte`

Responsibility:

- normalize max width and horizontal padding

Props:

- `size?: 'content' | 'wide' | 'hero'`
- `children`

Reuse:

- shared

## Section Components

### `HeroSection.svelte`

Responsibility:

- render hero composition, CTA, and decorative mark

Props:

- `content: HeroContent`

Motion ownership:

- owns hero reveal choreography
- delegates complex mark interaction to a child if needed

Reuse:

- shared section, single use

### `HeroMark.svelte`

Responsibility:

- render the large decorative "D"
- manage tilt/parallax interaction

Props:

- `letter: string`
- `interactive?: boolean`

Motion ownership:

- owns spring/tween logic

Reuse:

- single use

### `AboutSection.svelte`

Responsibility:

- render profile image, intro copy, and tools summary

Props:

- `content: AboutContent`

Reuse:

- shared section, single use

### `CareerSection.svelte`

Responsibility:

- render the timeline section wrapper and list

Props:

- `entries: CareerEntry[]`

Reuse:

- shared section, single use

### `ContactSection.svelte`

Responsibility:

- render contact methods and CV action

Props:

- `methods: ContactMethod[]`
- `socials: SocialLink[]`
- `cvHref: string`

Reuse:

- shared section, single use

## Timeline Components

### `CareerTimeline.svelte`

Responsibility:

- render the ordered timeline list
- switch between desktop and mobile layout rules

Props:

- `entries: CareerEntry[]`

Reuse:

- shared

### `CareerTimelineItem.svelte`

Responsibility:

- render date, marker, summary, and interaction affordance

Props:

- `entry: CareerEntry`
- `index: number`

Reuse:

- shared

### `CareerDetailPopover.svelte`

Responsibility:

- render detailed responsibilities and achievements
- support hover, focus, and touch-safe visibility modes

Props:

- `entry: CareerEntry`
- `open: boolean`

Reuse:

- shared

## Contact Components

### `ContactList.svelte`

Responsibility:

- render grouped contact rows

Props:

- `items: ContactMethod[]`

Reuse:

- shared

### `ContactLinkRow.svelte`

Responsibility:

- render one contact method with icon, label, and optional external indicator

Props:

- `item: ContactMethod | SocialLink`

Reuse:

- shared

### `CvButton.svelte`

Responsibility:

- render the CV view/download action consistently with other CTA styling

Props:

- `href: string`

Reuse:

- single use but keep shared if CTA style is reused elsewhere

## Motion And UI Primitives

### `Reveal.svelte`

Responsibility:

- apply one reveal preset to child content

Props:

- `preset: MotionPreset`
- `once?: boolean`
- `children`

Reuse:

- shared

### `StaggerGroup.svelte`

Responsibility:

- coordinate delayed reveals among sibling items

Props:

- `baseDelay?: number`
- `step?: number`
- `children`

Reuse:

- shared

### `Icon.svelte`

Responsibility:

- render inline SVG icons from a local registry or sprite

Props:

- `name: string`
- `title?: string`
- `size?: 'sm' | 'md' | 'lg'`

Reuse:

- shared

### `Button.svelte`

Responsibility:

- provide primary/secondary CTA styling with safe semantic variants

Props:

- `href?: string`
- `variant?: 'primary' | 'secondary' | 'ghost'`
- `children`

Reuse:

- shared

## Reuse Rules

- Extract only when at least two call sites or a clearly isolated complex behavior exist.
- Keep section-specific markup in section components, not in over-general primitives.
- Motion wrappers should remain thin and declarative.
- Icon rendering should be centralized so stroke and size stay consistent.
