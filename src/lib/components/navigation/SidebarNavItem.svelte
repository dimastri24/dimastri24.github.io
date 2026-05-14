<script lang="ts">
	import type { TransitionConfig } from 'svelte/transition';
	import Icon from '$lib/components/ui/Icon.svelte';
	import type { NavItem } from '$lib/types';

	type CrossfadeTransition = (
		node: Element,
		params: { key: string }
	) => TransitionConfig | (() => TransitionConfig);

	interface Props {
		item: NavItem;
		active: boolean;
		isMobile?: boolean;
		onSelect: () => void;
		pillKey: string;
		pillSend: CrossfadeTransition;
		pillReceive: CrossfadeTransition;
	}

	let {
		item,
		active,
		isMobile = false,
		onSelect,
		pillKey,
		pillSend,
		pillReceive
	}: Props = $props();
</script>

<button
	type="button"
	aria-label={item.label}
	aria-current={active ? 'location' : undefined}
	class={[
		'transition-standard group relative flex overflow-hidden rounded-[var(--radius-pill)] border border-transparent text-sm font-medium',
		isMobile
			? 'min-w-0 flex-1 items-center justify-center px-2 py-2'
			: 'w-full items-center justify-center px-3 py-3 lg:min-w-[3.75rem]',
		active
			? 'text-[var(--accent-strong)]'
			: 'border-transparent bg-transparent text-inherit hover:border-[color:rgba(198,162,106,0.2)] hover:bg-white/6 hover:text-[var(--accent-strong)]'
	]}
	onclick={onSelect}
>
	{#if active}
		<span
			in:pillReceive={{ key: pillKey }}
			out:pillSend={{ key: pillKey }}
			class="pointer-events-none absolute inset-0 rounded-[var(--radius-pill)] border border-[color:var(--accent)] bg-[color:rgba(198,162,106,0.14)]"
		></span>
	{/if}

	<span
		class={[
			'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
			active ? 'bg-[color:rgba(198,162,106,0.16)]' : 'bg-transparent'
		]}
	>
		<Icon name={item.icon} title={item.label} size="md" />
	</span>
</button>
