import type { SectionId } from './content';

export type SectionSurface = 'dark' | 'light';
export type ContainerSize = 'content' | 'wide' | 'hero';
export type IconName =
	| 'home'
	| 'user'
	| 'briefcase'
	| 'mail'
	| 'github'
	| 'linkedin'
	| 'instagram'
	| 'download'
	| 'arrow-up-right';

export interface NavItem {
	id: SectionId;
	label: string;
	href: `/#${SectionId}`;
	icon: IconName;
}
