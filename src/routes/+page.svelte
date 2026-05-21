<script lang="ts">
	import { onMount, tick } from 'svelte';
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import SectionShell from '$lib/components/layout/SectionShell.svelte';
	import type { SectionId } from '$lib/types';
	import { aboutContent, careerEntries, contactMethods, navItems } from '$lib/data';
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

<SectionShell id="about" variant="light" label="About scaffold">
	<div class="grid gap-6 lg:grid-cols-[minmax(16rem,0.85fr)_minmax(0,1.15fr)] lg:gap-10">
		<div class="surface-card-light rounded-[var(--radius-xl)] p-6 sm:p-8">
			<p class="text-code text-xs tracking-[0.22em] text-[var(--accent)] uppercase">About shell</p>
			<h2 class="text-display mt-4 text-3xl font-semibold sm:text-4xl">Content contract ready</h2>
		</div>

		<div class="space-y-5">
			{#each aboutContent.intro as paragraph (paragraph)}
				<p class="text-muted-light max-w-3xl text-base leading-8 sm:text-lg">{paragraph}</p>
			{/each}
			<div class="flex flex-wrap gap-3 pt-2">
				{#each aboutContent.tools as tool (tool)}
					<span
						class="text-muted-light rounded-[var(--radius-pill)] border border-[var(--color-line-light)] bg-[var(--bg-panel-light)] px-4 py-2 text-sm"
					>
						{tool}
					</span>
				{/each}
			</div>
		</div>
	</div>
</SectionShell>

<SectionShell id="career" variant="dark" label="Career scaffold">
	<div class="space-y-8">
		<div class="max-w-3xl space-y-3">
			<p class="text-code text-xs tracking-[0.22em] text-[var(--accent-strong)] uppercase">
				Career timeline shell
			</p>
			<h2 class="text-display text-3xl font-semibold sm:text-4xl">Timeline primitives come next</h2>
		</div>

		<div class="grid gap-4">
			{#each careerEntries as entry (entry.id)}
				<article
					class="surface-card-dark rounded-[var(--radius-lg)] p-5 sm:p-6 lg:grid lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-6"
				>
					<div class="mb-4 lg:mb-0">
						<p class="text-sm tracking-[0.18em] text-[var(--accent-strong)] uppercase">
							{entry.rangeLabel}
						</p>
					</div>
					<div class="space-y-2">
						<h3 class="text-xl font-semibold">{entry.role}</h3>
						<p class="text-muted-dark text-sm tracking-[0.12em] uppercase">
							{entry.organization}
						</p>
						<p class="text-muted-dark max-w-3xl text-base leading-7">{entry.summary}</p>
					</div>
				</article>
			{/each}
		</div>
	</div>
</SectionShell>

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
