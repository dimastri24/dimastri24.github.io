<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import LoadingScreen from '$lib/components/app/LoadingScreen.svelte';
	import SidebarNav from '$lib/components/navigation/SidebarNav.svelte';
	import { navItems } from '$lib/data';
	import { initializeAppLoading, appLoadingState } from '$lib/state/app-loading.svelte';
	import { navigationState } from '$lib/state/navigation.svelte';

	interface Props {
		showSidebar?: boolean;
		children: Snippet;
	}

	let { showSidebar = false, children }: Props = $props();

	onMount(() => {
		return initializeAppLoading();
	});
</script>

<div
	class="relative min-h-screen overflow-x-clip bg-[var(--bg-section-dark)]"
	class:lg={showSidebar}
	data-shell-sidebar={showSidebar ? 'enabled' : 'disabled'}
>
	<div class="pointer-events-none absolute inset-0 overflow-hidden">
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

	<!-- Wrap it in a div that controls the initial layout flash -->
	<div class="loading-wrapper" class:hydrated={!appLoadingState.active}>
		{#if appLoadingState.active}
			<LoadingScreen
				progress={appLoadingState.progress}
				label={appLoadingState.label}
				stage={appLoadingState.stage}
				reducedMotion={appLoadingState.reducedMotion}
			/>
		{/if}
	</div>

	<div class="relative z-10 min-h-screen pb-28 lg:pb-0">
		{@render children()}
	</div>
</div>

<style>
	/* By default, hide the loader using raw CSS. */
	.loading-wrapper {
		display: none;
	}

	/* Only show it on a fresh initial load */
	:global(html:not(.js-already-loaded)) .loading-wrapper {
		display: block;
	}

	/* Once the inner transition finishes and the block unmounts, hide it safely */
	.loading-wrapper.hydrated {
		display: none;
	}
</style>
