<script lang="ts" module>
	function nameplate(name: string) {
		return `<developer name="${name.toLowerCase()}">`;
	}
</script>

<script lang="ts">
	import { resolve } from '$app/paths';
	import HeroMark from '$lib/components/sections/HeroMark.svelte';
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
			<div class="hero-reveal space-y-4" style="--hero-delay: 0ms;">
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
			</div>

			<div class="hero-reveal flex flex-wrap gap-3" style="--hero-delay: 90ms;">
				{#each heroContent.roleLabels as label (label)}
					<span
						class="transition-standard text-code rounded-[var(--radius-pill)] border border-[var(--color-line-dark)] bg-[var(--bg-panel-dark)] px-4 py-2 text-[0.72rem] tracking-[0.14em] text-[var(--text-muted-dark)] uppercase"
					>
						{label}
					</span>
				{/each}
			</div>

			<div class="hero-reveal" style="--hero-delay: 160ms;">
				<a
					href={resolve(`/#${heroContent.ctaTarget}`)}
					class="transition-standard text-code inline-flex items-center gap-3 rounded-[var(--radius-pill)] border border-[var(--accent)] bg-[rgba(255,251,221,0.06)] px-5 py-3 text-xs tracking-[0.2em] text-[var(--text-on-dark)] uppercase shadow-[0_18px_40px_rgba(6,10,8,0.22)] hover:-translate-y-[2px] hover:border-[var(--accent-strong)] hover:bg-[rgba(255,251,221,0.1)] focus-visible:-translate-y-[1px]"
					aria-label={`Scroll to ${heroContent.ctaTarget} section`}
					onclick={handleCtaClick}
				>
					<span>{heroContent.ctaLabel}</span>
				</a>
			</div>

			<p
				class="hero-reveal text-code text-xs tracking-[0.24em] text-[var(--text-muted-dark)] uppercase sm:text-sm"
				style="--hero-delay: 220ms;"
			>
				{heroContent.closingTags.join(' ')}
			</p>
		</div>

		<div class="hero-reveal hidden lg:block" style="--hero-delay: 130ms;">
			<HeroMark letter={heroContent.markLetter} />
		</div>
	</div>
</SectionShell>

<style>
	.hero-reveal {
		animation: hero-reveal 360ms var(--ease-standard) both;
		animation-delay: var(--hero-delay, 0ms);
	}

	@keyframes hero-reveal {
		from {
			opacity: 0;
			transform: translate3d(0, 18px, 0);
		}

		to {
			opacity: 1;
			transform: translate3d(0, 0, 0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-reveal {
			animation: none;
		}
	}
</style>
