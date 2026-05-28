<script lang="ts">
	import SectionShell from '$lib/components/layout/SectionShell.svelte';
	import { careerEntries } from '$lib/data';
</script>

<SectionShell id="career" variant="dark" label="Career timeline">
	<div class="space-y-8 sm:space-y-10">
		<div class="max-w-3xl space-y-3">
			<p class="text-code text-xs tracking-[0.22em] text-[var(--accent-strong)] uppercase">
				Career
			</p>
			<h2 class="text-display text-3xl font-semibold sm:text-4xl">Recent work, newest first.</h2>
			<p class="text-muted-dark max-w-2xl text-base leading-8 sm:text-lg">
				A reverse-chronological timeline of product and engineering work, structured for quick
				scanning on desktop while staying readable as a single column on smaller screens.
			</p>
		</div>

		<div class="career-timeline relative space-y-5 lg:space-y-6">
			{#each careerEntries as entry (entry.id)}
				<article
					class="career-item grid gap-4 rounded-[var(--radius-lg)] border border-[var(--color-line-dark)] bg-[rgba(255,255,255,0.025)] p-5 shadow-[0_18px_42px_rgba(6,10,8,0.12)] sm:p-6 lg:grid-cols-[8rem_3rem_minmax(0,1fr)] lg:gap-0 lg:border-none lg:bg-transparent lg:p-0 lg:shadow-none"
				>
					<div class="career-item__date lg:pr-6">
						<p class="text-code text-xs tracking-[0.2em] text-[var(--accent-strong)] uppercase">
							{entry.month}
						</p>
						<p class="mt-2 text-2xl leading-none font-semibold text-[var(--text-on-dark)]">
							{entry.year}
						</p>
						<p class="text-muted-dark mt-3 text-sm leading-6">{entry.rangeLabel}</p>
					</div>

					<div class="career-item__rail relative hidden lg:block" aria-hidden="true">
						<div class="career-item__line"></div>
						<div class="career-item__marker"></div>
					</div>

					<div
						class="surface-card-dark rounded-[var(--radius-lg)] p-5 sm:p-6 lg:ml-2 lg:min-h-[12rem]"
					>
						<div class="space-y-3">
							<div class="space-y-2">
								<h3 class="text-xl font-semibold sm:text-2xl">{entry.role}</h3>
								<p class="text-code text-[0.72rem] tracking-[0.18em] text-[var(--text-muted-dark)] uppercase">
									{entry.organization}
								</p>
							</div>

							<p class="text-muted-dark max-w-2xl text-base leading-7">{entry.summary}</p>
						</div>

						<div class="mt-5 flex flex-wrap gap-2.5">
							{#each entry.technologies as technology (technology)}
								<span
									class="text-code rounded-[var(--radius-pill)] border border-[var(--color-line-dark)] bg-[rgba(255,255,255,0.03)] px-3 py-1.5 text-[0.68rem] tracking-[0.14em] text-[var(--text-muted-dark)] uppercase"
								>
									{technology}
								</span>
							{/each}
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</SectionShell>

<style>
	.career-timeline::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: calc(8rem + 1.5rem);
		width: 1px;
		background: linear-gradient(
			180deg,
			rgba(255, 251, 221, 0),
			rgba(255, 251, 221, 0.18) 12%,
			rgba(255, 251, 221, 0.18) 88%,
			rgba(255, 251, 221, 0)
		);
	}

	.career-item__date {
		text-align: left;
	}

	.career-item__line {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 50%;
		width: 1px;
		transform: translateX(-50%);
		background: transparent;
	}

	.career-item__marker {
		position: absolute;
		top: 1.6rem;
		left: 50%;
		width: 0.95rem;
		height: 0.95rem;
		border: 2px solid var(--accent-strong);
		border-radius: 999px;
		background: var(--color-forest-950);
		transform: translateX(-50%);
		box-shadow: 0 0 0 0.4rem rgba(176, 141, 87, 0.08);
	}

	@media (max-width: 1023px) {
		.career-timeline::before {
			content: none;
		}
	}

	@media (min-width: 1024px) {
		.career-item__date {
			text-align: right;
		}
	}
</style>
