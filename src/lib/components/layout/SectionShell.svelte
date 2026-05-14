<script lang="ts">
	import type { Snippet } from 'svelte';
	import SectionObserver from '$lib/components/navigation/SectionObserver.svelte';
	import PageContainer from './PageContainer.svelte';
	import type { SectionId, SectionSurface, ContainerSize } from '$lib/types';

	interface Props {
		id: SectionId;
		variant: SectionSurface;
		label?: string;
		size?: ContainerSize;
		children: Snippet;
	}

	let { id, variant, label, size = 'content', children }: Props = $props();
</script>

<section
	{id}
	aria-label={label}
	class={`relative scroll-mt-24 py-16 sm:py-20 lg:py-24 ${
		variant === 'dark'
			? 'bg-[var(--bg-section-dark)] text-[var(--text-on-dark)]'
			: 'bg-[var(--bg-section-light)] text-[var(--text-on-light)]'
	}`}
	data-surface={variant}
>
	<SectionObserver {id} />

	{#if variant === 'dark'}
		<div
			class="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]"
		></div>
	{/if}

	<PageContainer {size}>
		<div class="relative z-10">
			{@render children()}
		</div>
	</PageContainer>
</section>
