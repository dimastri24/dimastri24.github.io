<script lang="ts">
	import { resolve } from '$app/paths';
	import Icon from '$lib/components/ui/Icon.svelte';
	import type { NavItem } from '$lib/types';
	import { setActiveSection } from '$lib/state/navigation.svelte';

	interface Props {
		item: NavItem;
		active: boolean;
		isMobile?: boolean;
	}

	let { item, active, isMobile = false }: Props = $props();

	function handleClick() {
		setActiveSection(item.id);
	}
</script>

<a
	href={resolve(item.href)}
	aria-label={item.label}
	aria-current={active ? 'location' : undefined}
	class={[
		'transition-standard group relative flex rounded-[var(--radius-pill)] border text-sm font-medium no-underline',
		isMobile
			? 'min-w-0 flex-1 items-center justify-center px-2 py-2'
			: 'w-full items-center justify-center px-3 py-3 lg:min-w-[3.75rem]',
		active
			? 'border-[color:var(--accent)] bg-[color:rgba(198,162,106,0.14)] text-[var(--accent-strong)]'
			: 'border-transparent bg-transparent text-inherit hover:border-[color:rgba(198,162,106,0.2)] hover:bg-white/6 hover:text-[var(--accent-strong)]'
	]}
	onclick={handleClick}
>
	<span
		class={[
			'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
			active ? 'bg-[color:rgba(198,162,106,0.16)]' : 'bg-transparent'
		]}
	>
		<Icon name={item.icon} title={item.label} size="md" />
	</span>
</a>
