<script lang="ts">
	import AppShell from '$lib/components/app/AppShell.svelte';
	import { siteMetadata } from '$lib/data';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>{siteMetadata.title}</title>
	<meta name="description" content={siteMetadata.description} />
	<link rel="icon" href={favicon} />
</svelte:head>

<AppShell showSidebar={true}>
	{@render children()}
</AppShell>
