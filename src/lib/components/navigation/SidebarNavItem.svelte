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
			? 'min-w-0 flex-1 flex-col items-center justify-center gap-1 px-2 py-2'
			: 'w-full justify-start px-4 py-3 lg:min-w-[3.75rem] lg:justify-center lg:px-3',
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

	<span class={isMobile ? 'text-[0.65rem] tracking-[0.12em] uppercase' : 'hidden xl:inline'}>
		{item.label}
	</span>

	{#if !isMobile}
		<span
			class="pointer-events-none absolute left-[calc(100%+0.75rem)] hidden rounded-[var(--radius-pill)] border border-[var(--color-line-dark)] bg-[color:rgba(21,41,30,0.88)] px-3 py-1 text-xs tracking-[0.14em] text-[var(--text-on-dark)] uppercase shadow-[var(--shadow-float)] group-hover:block xl:hidden"
		>
			{item.label}
		</span>
	{/if}
</a>
