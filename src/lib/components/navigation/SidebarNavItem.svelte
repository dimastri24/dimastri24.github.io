<script lang="ts">
	import Icon from '$lib/components/ui/Icon.svelte';
	import type { NavItem } from '$lib/types';

	interface Props {
		item: NavItem;
		active: boolean;
		onSelect: () => void;
	}

	let { item, active, onSelect }: Props = $props();
</script>

<button
	type="button"
	aria-label={item.label}
	aria-current={active ? 'location' : undefined}
	class={[
		'transition-standard flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium',
		active
			? 'bg-[color:rgba(198,162,106,0.18)] text-[var(--accent-strong)]'
			: 'bg-transparent text-inherit hover:bg-white/6 hover:text-[var(--accent-strong)]'
	]}
	onclick={onSelect}
>
	<Icon name={item.icon} title={item.label} size="md" />
</button>
