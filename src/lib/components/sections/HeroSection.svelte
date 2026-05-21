<script lang="ts" module>
	function nameplate(name: string) {
		return `<developer name="${name.toLowerCase()}">`;
	}
</script>

<script lang="ts">
	import SectionShell from '$lib/components/layout/SectionShell.svelte';
	import { heroContent, siteMetadata } from '$lib/data';
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
						Next in milestone
					</p>
					<p class="text-muted-dark max-w-sm text-sm leading-7">
						The contact CTA and the large decorative mark land in the next hero tasks.
					</p>
				</div>
			</div>
		</aside>
	</div>
</SectionShell>
