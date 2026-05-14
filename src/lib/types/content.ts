export type SectionId = 'home' | 'about' | 'career' | 'contact';

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

export interface SiteMetadata {
	name: string;
	title: string;
	description: string;
	url: string;
	locale: string;
}
