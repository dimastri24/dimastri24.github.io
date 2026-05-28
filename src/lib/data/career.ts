import type { CareerEntry } from '$lib/types/content';

export const careerEntries: CareerEntry[] = [
	{
		id: 'one-news-developer',
		month: 'Now',
		year: '2026',
		rangeLabel: 'July 2025 - Present',
		role: 'Software Developer',
		organization: 'One.News',
		summary:
			'Driving efficiency across editorial and internal systems by architecting automation pipelines, modern backend APIs, and core CMS enhancements.',
		achievements: [
			'Spearheaded the development of LLM-based automation, reducing content generation and data processing time for the editorial team.',
			'Engineered automated web scraping and data processing pipelines using Python, streamlining data ingestion workflows.',
			'Maintained and enhanced core CMS features with PHP CodeIgniter, delivering updates in an Agile sprint cycle.',
			'Designed and built high-performance backend APIs with Golang and PostgreSQL, achieving seamless data integration across internal services.'
		],
		details: [
			{ label: 'Focus', value: 'LLM Automation, Data Pipelines, and Core API Architecture' },
			{ label: 'Mode', value: 'Agile sprint delivery and cross-functional integration' }
		],
		technologies: ['Python', 'Golang', 'PHP', 'CodeIgniter', 'PostgreSQL', 'LLM']
	},
	{
		id: 'anp-cipta-inovasi-junior',
		month: 'July',
		year: '2025',
		rangeLabel: 'September 2023 - July 2025',
		role: 'Junior Developer',
		organization: 'ANP Cipta Inovasi',
		summary:
			'Contributed to the full SDLC for over 8 high-impact web platforms, optimizing platform stability through full-stack enhancements and database tuning.',
		achievements: [
			'Delivered and maintained features for 8+ large-scale web platforms, including CMS, portals, and REST APIs using PHP CodeIgniter and MySQL.',
			'Collaborated closely with cross-functional teams in an Agile environment, participating in the full software development life cycle (SDLC) from testing to final deployment.',
			'Executed frontend and backend enhancements, API integrations, and database tuning to resolve critical bugs and improve platform stability.'
		],
		details: [
			{
				label: 'Key Projects',
				value:
					'Komparase, PON XXI Transportation System, AMSI, Monitoring DPR, Indonesia Business Post, LEMHANNAS, MPOWERMENT LMS, PPID Kemenpora'
			},
			{ label: 'Mode', value: 'Full SDLC in a fast-paced Agile environment' }
		],
		technologies: ['PHP', 'CodeIgniter', 'MySQL', 'REST APIs']
	},
	{
		id: 'katadata-intern',
		month: 'Aug',
		year: '2023',
		rangeLabel: 'March 2023 - August 2023',
		role: 'Intern Developer',
		organization: 'Katadata',
		summary:
			'Gained hands-on experience building internal enterprise tools from scratch and contributing to financial management ecosystems.',
		achievements: [
			'Independently engineered a Driver Management System from scratch using PHP Laravel and MySQL.',
			'Developed an internal Notice Board application using Node.js to improve internal company communication.',
			'Contributed to the feature enhancement of a financial management system using CodeIgniter, gaining deep insights into business workflow.'
		],
		details: [
			{ label: 'Focus', value: 'Greenfield internal tooling and business workflow integration' },
			{ label: 'Mode', value: 'Autonomous development and mentorship-driven learning' }
		],
		technologies: ['PHP', 'Laravel', 'CodeIgniter', 'Node.js', 'MySQL']
	}
];
