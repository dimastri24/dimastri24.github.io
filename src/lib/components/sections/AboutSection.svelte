<script lang="ts">
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails } from 'svelte-inview';
	import SectionShell from '$lib/components/layout/SectionShell.svelte';
	import profilePortrait from '$lib/assets/profile-portrait.svg';
	import { aboutContent } from '$lib/data';

	let mediaRevealed = $state(false);
	let copyRevealed = $state(false);

	function revealMedia(event: CustomEvent<ObserverEventDetails>) {
		if (event.detail.inView) {
			mediaRevealed = true;
		}
	}

	function revealCopy(event: CustomEvent<ObserverEventDetails>) {
		if (event.detail.inView) {
			copyRevealed = true;
		}
	}
</script>

<SectionShell id="about" variant="light" label="About">
	<div
		class="grid gap-8 lg:grid-cols-[minmax(16rem,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-12"
	>
		<div
			use:inview={{ threshold: 0.2, unobserveOnEnter: true }}
			oninview_change={revealMedia}
			class:about-reveal={true}
			class:about-reveal--visible={mediaRevealed}
			class="about-media"
		>
			<div class="about-media__frame">
				<div class="about-media__glow" aria-hidden="true"></div>
				<img
					src={profilePortrait}
					alt={aboutContent.imageAlt}
					class="about-media__image"
					loading="eager"
					decoding="async"
				/>
			</div>
		</div>

		<div
			use:inview={{ threshold: 0.18, unobserveOnEnter: true }}
			oninview_change={revealCopy}
			class:about-reveal={true}
			class:about-reveal--visible={copyRevealed}
			class="about-copy space-y-6 sm:space-y-7"
			style="--about-reveal-delay: 80ms;"
		>
			<div class="space-y-4">
				<p class="text-code text-xs tracking-[0.24em] text-[var(--accent)] uppercase">About</p>
				<h2 class="text-display text-3xl leading-tight font-semibold sm:text-4xl">
					Engineer-minded product delivery.
				</h2>
			</div>

			<div class="space-y-5">
				{#each aboutContent.intro as paragraph (paragraph)}
					<p class="about-copy__body text-base leading-8 sm:text-lg">{paragraph}</p>
				{/each}
			</div>

			<div class="flex flex-wrap gap-3 pt-1">
				{#each aboutContent.tools as tool (tool)}
					<span
						class="about-copy__chip text-code rounded-[var(--radius-pill)] px-4 py-2 text-[0.72rem] tracking-[0.14em] uppercase"
					>
						{tool}
					</span>
				{/each}
			</div>
		</div>
	</div>
</SectionShell>

<style>
	.about-media {
		display: grid;
		place-items: center;
	}

	.about-media__frame {
		position: relative;
		overflow: hidden;
		width: min(100%, 23rem);
		border: var(--border-soft-light);
		border-radius: var(--radius-xl);
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.7), rgba(21, 41, 30, 0.04)),
			var(--color-cream-100);
		box-shadow: var(--shadow-card);
	}

	.about-media__glow {
		position: absolute;
		inset: auto auto 1rem 1rem;
		width: 8rem;
		height: 8rem;
		border-radius: 999px;
		background: radial-gradient(circle, rgba(176, 141, 87, 0.18), transparent 68%);
		pointer-events: none;
	}

	.about-media__image {
		aspect-ratio: 16 / 18;
		width: 100%;
		object-fit: cover;
	}

	.about-reveal {
		opacity: 0;
		transform: translate3d(0, 20px, 0);
		transition:
			opacity 300ms var(--ease-standard),
			transform 360ms var(--ease-standard);
		transition-delay: var(--about-reveal-delay, 0ms);
	}

	.about-reveal--visible {
		opacity: 1;
		transform: translate3d(0, 0, 0);
	}

	.about-copy {
		max-width: 39rem;
	}

	.about-copy__body {
		max-width: 34rem;
		color: rgba(16, 22, 18, 0.82);
	}

	.about-copy__chip {
		color: rgba(16, 22, 18, 0.8);
		border: 1px solid rgba(21, 41, 30, 0.16);
		background: rgba(255, 255, 255, 0.58);
		box-shadow: 0 10px 24px rgba(21, 41, 30, 0.06);
	}

	@media (min-width: 1024px) {
		.about-media {
			justify-items: start;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.about-reveal {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
</style>
