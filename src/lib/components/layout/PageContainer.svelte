<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ContainerSize } from '$lib/types';

	interface Props {
		size?: ContainerSize;
		children: Snippet;
	}

	const widths: Record<ContainerSize, string> = {
		content: 'max-w-5xl',
		wide: 'max-w-6xl',
		hero: 'max-w-7xl'
	};

	let { size = 'content', children }: Props = $props();
</script>

<div class={`mx-auto w-full px-5 sm:px-8 lg:px-10 ${widths[size]}`}>
	{@render children()}
</div>
