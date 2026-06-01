import type { ContactMethod, SocialLink } from '$lib/types/content';

export const contactMethods: ContactMethod[] = [
	{
		id: 'email',
		label: 'Email',
		value: 'dimastriraharjo24@gmail.com',
		href: 'mailto:dimastriraharjo24@gmail.com',
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
		href: 'https://github.com/dimastri24',
		icon: 'github',
		external: true
	},
	{
		id: 'linkedin',
		label: 'LinkedIn',
		href: 'https://www.linkedin.com/in/dimas-tri-raharjo-a6613a220/',
		icon: 'linkedin',
		external: true
	},
	{
		id: 'instagram',
		label: 'Instagram',
		href: 'https://www.instagram.com/raharjodimastri',
		icon: 'instagram',
		external: true
	}
];
