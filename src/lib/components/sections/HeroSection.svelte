<script lang="ts" module>
	function nameplate(name: string) {
		return `<developer name="${name.toLowerCase()}">`;
	}
</script>

<script lang="ts">
	import { resolve } from '$app/paths';
	import SectionShell from '$lib/components/layout/SectionShell.svelte';
	import { heroContent, siteMetadata } from '$lib/data';
	import { scrollToSection } from '$lib/state/navigation.svelte';

	function handleCtaClick() {
		scrollToSection(heroContent.ctaTarget);
	}
</script>

<SectionShell id="home" variant="dark" size="hero" label="Introduction">
	<div
		class="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)] lg:items-end lg:gap-14"
	>
		<div class="space-y-8 lg:space-y-10">
			<div class="space-y-4">
				<p
					class="text-code text-xs tracking-[0.28em] text-[var(--accent-strong)] uppercase sm:text-sm"
				>
					{heroContent.eyebrowOpenTags.join(' ')}
				</p>

				<div class="space-y-4">
					<p
						class="text-code text-[0.7rem] tracking-[0.28em] text-[var(--text-muted-dark)] uppercase sm:text-xs"
					>
						{nameplate(siteMetadata.name)}
					</p>

					<h1
						class="text-display max-w-[13ch] text-5xl leading-[0.92] font-semibold text-balance sm:text-6xl lg:text-7xl"
					>
						{heroContent.heading}
					</h1>
				</div>

				<p class="text-muted-dark max-w-2xl text-base leading-8 sm:text-lg">
					Building interfaces that stay calm under pressure, with implementation detail that does
					not fall apart after launch.
				</p>
			</div>

			<div class="flex flex-wrap gap-3">
				{#each heroContent.roleLabels as label (label)}
					<span
						class="transition-standard text-code rounded-[var(--radius-pill)] border border-[var(--color-line-dark)] bg-[var(--bg-panel-dark)] px-4 py-2 text-[0.72rem] tracking-[0.14em] text-[var(--text-muted-dark)] uppercase"
					>
						{label}
					</span>
				{/each}
			</div>

			<div>
				<a
					href={resolve(`/#${heroContent.ctaTarget}`)}
					class="transition-standard text-code inline-flex items-center gap-3 rounded-[var(--radius-pill)] border border-[var(--accent)] bg-[rgba(255,251,221,0.06)] px-5 py-3 text-xs tracking-[0.2em] text-[var(--text-on-dark)] uppercase shadow-[0_18px_40px_rgba(6,10,8,0.22)] hover:-translate-y-[2px] hover:border-[var(--accent-strong)] hover:bg-[rgba(255,251,221,0.1)] focus-visible:-translate-y-[1px]"
					aria-label={`Scroll to ${heroContent.ctaTarget} section`}
					onclick={handleCtaClick}
				>
					<span>{heroContent.ctaLabel}</span>
					<span aria-hidden="true" class="text-[var(--accent-strong)]">01</span>
				</a>
			</div>

			<p
				class="text-code text-xs tracking-[0.24em] text-[var(--text-muted-dark)] uppercase sm:text-sm"
			>
				{heroContent.closingTags.join(' ')}
			</p>
		</div>

		<aside
			class="surface-card-dark rounded-[var(--radius-xl)] p-6 sm:p-8 lg:min-h-[26rem] lg:p-10"
			aria-label="Hero composition note"
		>
			<div class="flex h-full flex-col justify-between gap-8">
				<div class="space-y-4">
					<p class="text-code text-xs tracking-[0.24em] text-[var(--accent-strong)] uppercase">
						Current focus
					</p>
					<p class="text-display max-w-[10ch] text-3xl leading-tight font-semibold sm:text-4xl">
						Editorial intro with developer syntax cues.
					</p>
				</div>

				<div class="space-y-3">
					<p class="text-code text-xs tracking-[0.22em] text-[var(--text-muted-dark)] uppercase">
						CTA target
					</p>
					<p class="text-muted-dark max-w-sm text-sm leading-7">
						The primary action jumps straight to the contact section while the decorative mark
						remains the next hero task.
					</p>
				</div>
			</div>
		</aside>
	</div>
</SectionShell>
