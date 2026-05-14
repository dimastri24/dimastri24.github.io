import type { CareerEntry } from '$lib/types/content';

export const careerEntries: CareerEntry[] = [
	{
		id: 'latest-role',
		month: 'Now',
		year: '2026',
		rangeLabel: '2024 - Present',
		role: 'Software Engineer',
		organization: 'Current team placeholder',
		summary: 'Building and refining internal and customer-facing web experiences.',
		achievements: [
			'Shipped interface improvements across multiple product surfaces.',
			'Improved delivery confidence by tightening implementation and review quality.'
		],
		details: [
			{ label: 'Focus', value: 'Frontend architecture, UX polish, and API integration' },
			{ label: 'Mode', value: 'Cross-functional product delivery' }
		],
		technologies: ['TypeScript', 'Svelte', 'React', 'Node.js']
	},
	{
		id: 'previous-role',
		month: 'Jan',
		year: '2024',
		rangeLabel: '2023 - 2024',
		role: 'Web Developer',
		organization: 'Previous team placeholder',
		summary: 'Delivered responsive product pages and implementation support across the stack.',
		achievements: [
			'Translated design intent into maintainable production UI.',
			'Supported feature delivery with practical backend and data work.'
		],
		details: [
			{ label: 'Focus', value: 'Responsive UI development and feature support' },
			{ label: 'Mode', value: 'Fast iteration in a small engineering team' }
		],
		technologies: ['JavaScript', 'TypeScript', 'Tailwind CSS', 'SQL']
	}
];
