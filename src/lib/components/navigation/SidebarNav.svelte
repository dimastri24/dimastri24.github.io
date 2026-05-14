<script lang="ts">
	import SidebarNavItem from './SidebarNavItem.svelte';
	import type { NavItem, SectionId } from '$lib/types';

	interface Props {
		items: NavItem[];
		activeSection: SectionId;
		isMobile?: boolean;
	}

	let { items, activeSection, isMobile = false }: Props = $props();
</script>

<nav
	aria-label={isMobile ? 'Section navigation mobile dock' : 'Section navigation'}
	class={[
		isMobile
			? 'fixed inset-x-4 bottom-4 z-40 rounded-[calc(var(--radius-xl)+0.25rem)] border border-[var(--color-line-dark)] bg-[color:rgba(21,41,30,0.92)] p-2 shadow-[var(--shadow-float)] backdrop-blur'
			: 'fixed top-1/2 left-4 z-40 hidden -translate-y-1/2 rounded-[calc(var(--radius-xl)+0.25rem)] border border-[var(--color-line-dark)] bg-[color:rgba(21,41,30,0.86)] p-2 shadow-[var(--shadow-float)] backdrop-blur lg:block'
	]}
>
	<ul class={isMobile ? 'grid grid-cols-4 gap-2' : 'flex flex-col gap-2'}>
		{#each items as item (item.id)}
			<li>
				<SidebarNavItem {item} active={activeSection === item.id} {isMobile} />
			</li>
		{/each}
	</ul>
</nav>
