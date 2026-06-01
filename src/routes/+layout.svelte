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
	<meta name="application-name" content={siteMetadata.name} />
	<meta name="theme-color" content="#15291e" />
	<meta property="og:title" content={siteMetadata.title} />
	<meta property="og:description" content={siteMetadata.description} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={siteMetadata.name} />
	<meta property="og:locale" content={siteMetadata.locale} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={siteMetadata.title} />
	<meta name="twitter:description" content={siteMetadata.description} />
	<link rel="icon" href={favicon} />
</svelte:head>

<AppShell showSidebar={true}>
	{@render children()}
</AppShell>
