<script lang="ts">
	import Icon from '$lib/components/ui/Icon.svelte';
	import type { NavItem } from '$lib/types';

	import { navigationState } from '$lib/state/navigation.svelte';

	interface Props {
		item: NavItem;
		active: boolean;
		onSelect: () => void;
	}

	let { item, active, onSelect }: Props = $props();

	const lightSections = ['about', 'contact', 'services'];

	let isCurrentSectionLight = $derived(lightSections.includes(navigationState.activeSection));
</script>

<button
	type="button"
	aria-label={item.label}
	aria-current={active ? 'location' : undefined}
	class={[
		'transition-standard flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium',

		isCurrentSectionLight
			? active
				? 'bg-[var(--color-line-light)] text-[var(--color-forest-800)]'
				: 'bg-transparent text-[var(--color-forest-900)] hover:bg-[var(--bg-panel-light)] hover:text-[var(--color-forest-800)]'
			: active
				? 'bg-[color:rgba(198,162,106,0.18)] text-[var(--accent-strong)]'
				: 'bg-transparent text-[var(--text-muted-dark)] hover:bg-white/6 hover:text-[var(--accent-strong)]'
	]}
	onclick={onSelect}
>
	<Icon name={item.icon} title={item.label} size="md" />
</button>
