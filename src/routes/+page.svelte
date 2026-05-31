<script lang="ts">
	import CareerSection from '$lib/components/sections/CareerSection.svelte';
	import ContactSection from '$lib/components/sections/ContactSection.svelte';
	import { onMount, tick } from 'svelte';
	import AboutSection from '$lib/components/sections/AboutSection.svelte';
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import type { SectionId } from '$lib/types';
	import { navItems } from '$lib/data';
	import { scrollToSection } from '$lib/state/navigation.svelte';

	onMount(() => {
		const syncHashSection = async () => {
			const sectionId = window.location.hash.slice(1);

			if (navItems.some((item) => item.id === sectionId)) {
				await tick();
				window.setTimeout(() => {
					scrollToSection(sectionId as SectionId);
				}, 0);
			}
		};

		void syncHashSection();
		window.addEventListener('hashchange', syncHashSection);

		return () => {
			window.removeEventListener('hashchange', syncHashSection);
		};
	});
</script>

<HeroSection />

<AboutSection />

<CareerSection />

<ContactSection />
