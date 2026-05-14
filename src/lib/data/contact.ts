import type { ContactMethod, SocialLink } from '$lib/types/content';

export const contactMethods: ContactMethod[] = [
	{
		id: 'email',
		label: 'Email',
		value: 'dimas@example.com',
		href: 'mailto:dimas@example.com',
		icon: 'mail',
		external: false
	},
	{
		id: 'cv',
		label: 'Curriculum Vitae',
		value: 'View CV',
		href: 'https://drive.google.com/',
		icon: 'download',
		external: true
	}
];

export const socialLinks: SocialLink[] = [
	{
		id: 'github',
		label: 'GitHub',
		href: 'https://github.com/dimas',
		icon: 'github',
		external: true
	},
	{
		id: 'linkedin',
		label: 'LinkedIn',
		href: 'https://linkedin.com/in/dimas',
		icon: 'linkedin',
		external: true
	},
	{
		id: 'instagram',
		label: 'Instagram',
		href: 'https://instagram.com/dimas',
		icon: 'instagram',
		external: true
	}
];
