<script lang="ts">
	import CareerSection from '$lib/components/sections/CareerSection.svelte';
	import { onMount, tick } from 'svelte';
	import AboutSection from '$lib/components/sections/AboutSection.svelte';
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import SectionShell from '$lib/components/layout/SectionShell.svelte';
	import type { SectionId } from '$lib/types';
	import { contactMethods, navItems } from '$lib/data';
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

<SectionShell id="contact" variant="light" label="Contact scaffold">
	<div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-10">
		<div class="space-y-4">
			<p class="text-code text-xs tracking-[0.22em] text-[var(--accent)] uppercase">
				Contact layout shell
			</p>
			<h2 class="text-display text-3xl font-semibold sm:text-4xl">Navigation targets are ready</h2>
			<p class="text-muted-light max-w-2xl text-base leading-8 sm:text-lg">
				The current page uses the shared section wrapper and container system, with stable IDs
				already aligned to the future sidebar navigation model.
			</p>
		</div>

		<div class="surface-card-light rounded-[var(--radius-xl)] p-6 sm:p-8">
			<ul class="space-y-3">
				{#each navItems as item (item.id)}
					<li
						class="flex items-center justify-between gap-4 border-b border-[var(--color-line-light)] py-3 last:border-b-0"
					>
						<span class="font-medium">{item.label}</span>
						<span class="text-code text-muted-light text-sm">{item.href}</span>
					</li>
				{/each}
			</ul>

			<div
				class="text-muted-light mt-6 rounded-[var(--radius-lg)] bg-white/40 p-4 text-sm leading-7"
			>
				Primary contact methods scaffolded: {contactMethods.length}. Full interactive contact rows
				arrive in Milestone 8.
			</div>
		</div>
	</div>
</SectionShell>
