<script lang="ts">
	import type { IconName } from '$lib/types';

	interface Props {
		name: IconName;
		title?: string;
		size?: 'sm' | 'md' | 'lg';
	}

	const sizes = {
		sm: 'h-4 w-4',
		md: 'h-5 w-5',
		lg: 'h-6 w-6'
	} as const;

	let { name, title, size = 'md' }: Props = $props();
	let viewBox = $derived(name === 'linkedin' ? '0 0 93.06 93.06' : '0 0 24 24');
	let fill = $derived(name === 'linkedin' ? 'currentColor' : 'none');
	let stroke = $derived(name === 'linkedin' ? 'none' : 'currentColor');
	let strokeWidth = $derived(name === 'linkedin' ? undefined : '1.8');
</script>

<svg
	{viewBox}
	{fill}
	{stroke}
	stroke-width={strokeWidth}
	stroke-linecap="round"
	stroke-linejoin="round"
	class={sizes[size]}
	aria-hidden={title ? undefined : 'true'}
	role={title ? 'img' : undefined}
>
	{#if title}
		<title>{title}</title>
	{/if}

	{#if name === 'home'}
		<path d="M3 10.5 12 3l9 7.5" />
		<path d="M5.25 9.75V21h13.5V9.75" />
		<path d="M9.75 21v-6h4.5v6" />
	{:else if name === 'user'}
		<circle cx="12" cy="8" r="3.25" />
		<path d="M5 19.25c1.6-3 4-4.5 7-4.5s5.4 1.5 7 4.5" />
	{:else if name === 'briefcase'}
		<path d="M8.25 7.5V6a1.5 1.5 0 0 1 1.5-1.5h4.5A1.5 1.5 0 0 1 15.75 6v1.5" />
		<path
			d="M4.5 9h15a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18V10.5A1.5 1.5 0 0 1 4.5 9Z"
		/>
		<path d="M3 12.75c2.8 1.8 5.8 2.7 9 2.7s6.2-.9 9-2.7" />
	{:else if name === 'mail'}
		<path
			d="M4.5 6.75h15A1.5 1.5 0 0 1 21 8.25v7.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 15.75v-7.5a1.5 1.5 0 0 1 1.5-1.5Z"
		/>
		<path d="m4 8 8 6 8-6" />
	{:else if name === 'github'}
		<path
			d="M9 19c-4.5 1.35-4.5-2.4-6-3m12 6v-3.48a3 3 0 0 0-.84-2.34c2.8-.3 5.84-1.38 5.84-6.18A4.8 4.8 0 0 0 18.75 6.6 4.46 4.46 0 0 0 18.66 3S17.58 2.7 15 4.44a13 13 0 0 0-6 0C6.42 2.7 5.34 3 5.34 3A4.46 4.46 0 0 0 5.25 6.6 4.8 4.8 0 0 0 4 10c0 4.77 3 5.88 5.8 6.18A3 3 0 0 0 9 18.5V22"
		/>
	{:else if name === 'linkedin'}
		<path
			d="M11.185,0.08C5.004,0.08,0.001,5.092,0,11.259c0,6.173,5.003,11.184,11.186,11.184c6.166,0,11.176-5.011,11.176-11.184C22.362,5.091,17.351,0.08,11.185,0.08z"
		/>
		<rect x="1.538" y="30.926" width="19.287" height="62.054" />
		<path
			d="M69.925,29.383c-9.382,0-15.673,5.144-18.248,10.022h-0.258v-8.479H32.921H32.92v62.053h19.27V62.281c0-8.093,1.541-15.932,11.575-15.932c9.89,0,10.022,9.256,10.022,16.451v30.178H93.06V58.942C93.06,42.235,89.455,29.383,69.925,29.383z"
		/>
	{:else if name === 'instagram'}
		<rect x="4.75" y="4.75" width="14.5" height="14.5" rx="4" />
		<circle cx="12" cy="12" r="3.5" />
		<circle cx="16.6" cy="7.4" r="0.6" fill="currentColor" stroke="none" />
	{:else if name === 'download'}
		<path d="M12 4.5v10.25" />
		<path d="m8.5 11.75 3.5 3.5 3.5-3.5" />
		<path d="M4.5 19.5h15" />
	{:else if name === 'arrow-up-right'}
		<path d="M7.5 16.5 16.5 7.5" />
		<path d="M9 7.5h7.5V15" />
	{/if}
</svg>
