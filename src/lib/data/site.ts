import type { SiteMetadata } from '$lib/types/content';
import type { NavItem } from '$lib/types/ui';

export const siteMetadata: SiteMetadata = {
	name: 'Dimas',
	title: 'Dimas | Software Engineer',
	description:
		'Personal portfolio for Dimas, a software engineer focused on polished frontend and reliable backend work.',
	url: 'https://dimas.example',
	locale: 'en'
};

export const navItems: NavItem[] = [
	{ id: 'home', label: 'Home', href: '/#home', icon: 'home' },
	{ id: 'about', label: 'About', href: '/#about', icon: 'user' },
	{ id: 'career', label: 'Career', href: '/#career', icon: 'briefcase' },
	{ id: 'contact', label: 'Contact', href: '/#contact', icon: 'mail' }
];
