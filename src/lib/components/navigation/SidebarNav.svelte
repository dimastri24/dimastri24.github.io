<script lang="ts">
	import SidebarNavItem from './SidebarNavItem.svelte';
	import type { NavItem, SectionId } from '$lib/types';
	import { scrollToSection } from '$lib/state/navigation.svelte';

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
			? 'fixed inset-x-4 bottom-4 z-40 lg:hidden'
			: 'fixed top-1/2 left-4 z-40 hidden -translate-y-1/2 lg:block'
	]}
>
	{#if isMobile}
		<div class="surface-card-dark rounded-[calc(var(--radius-xl)+0.25rem)] p-2 backdrop-blur">
			<ul class="grid grid-cols-4 gap-2 pb-[env(safe-area-inset-bottom)]">
				{#each items as item (item.id)}
					<li>
						<SidebarNavItem
							{item}
							active={activeSection === item.id}
							onSelect={() => scrollToSection(item.id)}
						/>
					</li>
				{/each}
			</ul>
		</div>
	{:else}
		<ul class="flex flex-col gap-2">
			{#each items as item (item.id)}
				<li>
					<SidebarNavItem
						{item}
						active={activeSection === item.id}
						onSelect={() => scrollToSection(item.id)}
					/>
				</li>
			{/each}
		</ul>
	{/if}
</nav>
