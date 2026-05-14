<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import SidebarNavItem from './SidebarNavItem.svelte';
	import type { NavItem, SectionId } from '$lib/types';
	import { scrollToSection } from '$lib/state/navigation.svelte';

	interface Props {
		items: NavItem[];
		activeSection: SectionId;
		isMobile?: boolean;
	}

	let { items, activeSection, isMobile = false }: Props = $props();

	const [send, receive] = crossfade({
		duration: 220,
		easing: cubicOut,
		fallback: () => ({
			duration: 180,
			css: (t) => `opacity: ${t}; transform: scale(${0.96 + 0.04 * t});`
		})
	});
</script>

<nav
	aria-label={isMobile ? 'Section navigation mobile dock' : 'Section navigation'}
	class={[
		isMobile
			? 'fixed inset-x-4 bottom-4 z-40 rounded-[calc(var(--radius-xl)+0.25rem)] border border-[var(--color-line-dark)] bg-[color:rgba(21,41,30,0.92)] p-2 shadow-[var(--shadow-float)] backdrop-blur lg:hidden'
			: 'fixed top-1/2 left-4 z-40 hidden -translate-y-1/2 rounded-[calc(var(--radius-xl)+0.25rem)] border border-[var(--color-line-dark)] bg-[color:rgba(21,41,30,0.86)] p-2 shadow-[var(--shadow-float)] backdrop-blur lg:block'
	]}
>
	<ul class={isMobile ? 'grid grid-cols-4 gap-2' : 'flex flex-col gap-2'}>
		{#each items as item (item.id)}
			<li>
				<SidebarNavItem
					{item}
					active={activeSection === item.id}
					{isMobile}
					pillKey={isMobile ? 'nav-pill-mobile' : 'nav-pill-desktop'}
					pillSend={send}
					pillReceive={receive}
					onSelect={() => scrollToSection(item.id)}
				/>
			</li>
		{/each}
	</ul>
</nav>
