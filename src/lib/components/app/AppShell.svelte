<script lang="ts">
	import type { Snippet } from 'svelte';
	import SidebarNav from '$lib/components/navigation/SidebarNav.svelte';
	import { navItems } from '$lib/data';
	import { navigationState } from '$lib/state/navigation.svelte';

	interface Props {
		showSidebar?: boolean;
		children: Snippet;
	}

	let { showSidebar = false, children }: Props = $props();
</script>

<div
	class="relative min-h-screen overflow-x-clip"
	class:lg={showSidebar}
	data-shell-sidebar={showSidebar ? 'enabled' : 'disabled'}
>
	<div class="pointer-events-none absolute inset-0">
		<div
			class="absolute top-[-8rem] left-[-12rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,_rgba(198,162,106,0.18)_0%,_rgba(198,162,106,0)_70%)] blur-3xl"
		></div>
		<div
			class="absolute right-[-8rem] bottom-[-10rem] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,_rgba(255,251,221,0.08)_0%,_rgba(255,251,221,0)_72%)] blur-3xl"
		></div>
	</div>

	{#if showSidebar}
		<SidebarNav items={navItems} activeSection={navigationState.activeSection} />
		<SidebarNav items={navItems} activeSection={navigationState.activeSection} isMobile={true} />
	{/if}

	<div class="relative z-10 min-h-screen pb-28 lg:pb-0 lg:pl-[7.5rem]">
		{@render children()}
	</div>
</div>
