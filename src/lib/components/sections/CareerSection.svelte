<script lang="ts">
	import { inview } from 'svelte-inview';
	import { fade } from 'svelte/transition';
	import type { ObserverEventDetails } from 'svelte-inview';
	import SectionShell from '$lib/components/layout/SectionShell.svelte';
	import { careerEntries } from '$lib/data';

	let introRevealed = $state(false);
	let revealedEntryIds = $state<string[]>([]);
	let expandedEntryId = $state<string | null>(null);

	let activeEntry = $derived(careerEntries.find((e) => e.id === expandedEntryId) || null);

	// FIX UX POIN 5: Mengunci scroll body saat modal aktif agar terasa premium
	$effect(() => {
		if (expandedEntryId) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	});

	function revealIntro(event: CustomEvent<ObserverEventDetails>) {
		if (event.detail.inView) {
			introRevealed = true;
		}
	}

	function revealEntry(entryId: string, event: CustomEvent<ObserverEventDetails>) {
		if (event.detail.inView && !revealedEntryIds.includes(entryId)) {
			revealedEntryIds = [...revealedEntryIds, entryId];
		}
	}

	function isEntryRevealed(entryId: string) {
		return revealedEntryIds.includes(entryId);
	}

	function toggleDetails(entryId: string) {
		expandedEntryId = expandedEntryId === entryId ? null : entryId;
	}

	function dismissDetails() {
		expandedEntryId = null;
	}

	function handleWindowKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && expandedEntryId) {
			dismissDetails();
		}
	}
</script>

<svelte:window onkeydown={handleWindowKeydown} />

<SectionShell id="career" variant="dark" label="Career timeline">
	<div class="space-y-8 sm:space-y-10">
		<div
			use:inview={{ threshold: 0.2, unobserveOnEnter: true }}
			oninview_change={revealIntro}
			class:career-reveal={true}
			class:career-reveal--visible={introRevealed}
			class="max-w-3xl space-y-3"
		>
			<p class="text-code text-xs tracking-[0.22em] text-[var(--accent-strong)] uppercase">
				Career
			</p>
			<h2 class="text-display text-3xl font-semibold sm:text-4xl">Recent work.</h2>
		</div>

		<div class="career-timeline relative space-y-5 lg:space-y-6">
			{#each careerEntries as entry, index (entry.id)}
				<article
					use:inview={{ threshold: 0.18, unobserveOnEnter: true }}
					oninview_change={(event) => revealEntry(entry.id, event)}
					class:career-reveal={true}
					class:career-reveal--visible={isEntryRevealed(entry.id)}
					class="career-item grid gap-4 rounded-[var(--radius-lg)] border border-[var(--color-line-dark)] bg-[rgba(255,255,255,0.025)] p-5 shadow-[0_18px_42px_rgba(6,10,8,0.12)] sm:p-6 lg:grid-cols-[8rem_3rem_minmax(0,1fr)] lg:gap-0 lg:border-none lg:bg-transparent lg:p-0 lg:shadow-none"
					style={`--career-reveal-delay: ${index * 72}ms;`}
				>
					<div class="career-item__date hidden lg:block lg:pr-6">
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
						<div
							class:career-item__marker--visible={isEntryRevealed(entry.id)}
							class="career-item__marker"
						></div>
					</div>

					<div
						class:career-item__panel--active={expandedEntryId === entry.id}
						class="career-item__panel surface-card-dark rounded-[var(--radius-lg)] p-5 sm:p-6 lg:ml-2 lg:min-h-[12rem]"
					>
						<div
							class="career-item__mobile-date mb-5 flex items-start justify-between gap-4 border-b border-[var(--color-line-dark)] pb-4 lg:hidden"
						>
							<div>
								<p
									class="text-code text-[0.68rem] tracking-[0.2em] text-[var(--accent-strong)] uppercase"
								>
									{entry.month}
								</p>
								<p class="mt-2 text-2xl leading-none font-semibold text-[var(--text-on-dark)]">
									{entry.year}
								</p>
							</div>

							<p
								class="text-code text-right text-[0.68rem] tracking-[0.16em] text-[var(--text-muted-dark)] uppercase"
							>
								{entry.rangeLabel}
							</p>
						</div>

						<div class="space-y-3">
							<div class="space-y-2">
								<h3 class="text-xl font-semibold sm:text-2xl">{entry.role}</h3>
								<p
									class="text-code text-[0.72rem] tracking-[0.18em] text-[var(--text-muted-dark)] uppercase"
								>
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

						<div
							class="mt-6 flex items-center justify-between gap-3 border-t border-[var(--color-line-dark)] pt-4"
						>
							<p
								class="text-code text-[0.68rem] tracking-[0.18em] text-[var(--text-muted-dark)] uppercase"
							>
								{entry.achievements.length} highlights
							</p>

							<button
								type="button"
								aria-controls={expandedEntryId === entry.id
									? `career-detail-${entry.id}`
									: undefined}
								aria-expanded={expandedEntryId === entry.id}
								class:career-item__toggle--active={expandedEntryId === entry.id}
								class="career-item__toggle text-code rounded-[var(--radius-pill)] px-4 py-2 text-[0.68rem] tracking-[0.18em] uppercase"
								onclick={() => toggleDetails(entry.id)}
							>
								{expandedEntryId === entry.id ? 'Hide details' : 'View details'}
							</button>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</SectionShell>

{#if activeEntry}
	<div
		class="career-detail-backdrop"
		role="presentation"
		onclick={dismissDetails}
		transition:fade={{ duration: 180 }}
	></div>

	<div
		id={`career-detail-${activeEntry.id}`}
		class="career-detail-card space-y-5 rounded-[var(--radius-md)] border border-[rgba(255,251,221,0.16)] p-4 shadow-[0_24px_60px_rgba(6,10,8,0.85)] sm:p-5"
		role="dialog"
		aria-modal="true"
		aria-label={`${activeEntry.role} detail card`}
		transition:fade={{ duration: 180 }}
	>
		<div class="career-detail-card__header flex items-start justify-between gap-4">
			<div class="space-y-3">
				<p class="text-code text-[0.68rem] tracking-[0.18em] text-[var(--accent-strong)] uppercase">
					Key outcomes
				</p>

				<div class="space-y-1.5">
					<h4 class="text-lg font-semibold text-[var(--text-on-dark)]">
						{activeEntry.role}
					</h4>
					<p
						class="text-code text-[0.68rem] tracking-[0.16em] text-[var(--text-muted-dark)] uppercase"
					>
						{activeEntry.organization}
					</p>
				</div>
			</div>

			<button
				type="button"
				class="career-detail-card__close text-code rounded-[var(--radius-pill)] px-3 py-1.5 text-[0.64rem] tracking-[0.16em] uppercase"
				onclick={dismissDetails}
			>
				Close
			</button>
		</div>

		<ul class="space-y-3">
			{#each activeEntry.achievements as achievement (achievement)}
				<li class="career-detail-card__achievement">{achievement}</li>
			{/each}
		</ul>

		<dl class="grid gap-3 sm:grid-cols-2">
			{#each activeEntry.details as detail (detail.label)}
				<div class="career-detail-card__meta rounded-[var(--radius-sm)] px-3 py-3">
					<dt
						class="text-code text-[0.64rem] tracking-[0.16em] text-[var(--text-muted-dark)] uppercase"
					>
						{detail.label}
					</dt>
					<dd class="mt-2 text-sm leading-6 text-[var(--text-on-dark)]">
						{detail.value}
					</dd>
				</div>
			{/each}
		</dl>
	</div>
{/if}

<style>
	.career-detail-backdrop {
		position: fixed;
		inset: 0;
		z-index: 9998;
		background: rgba(6, 10, 8, 0.75);
		backdrop-filter: blur(4px);
		cursor: pointer;
	}

	.career-detail-card {
		position: fixed;
		/* FIX UX POIN 3 & 4: Trik pemusatan posisi absolut/fixed yang jauh lebih stabil browser-wide */
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 9999;
		width: min(34rem, calc(100vw - 2rem));
		height: fit-content;
		max-height: min(85vh, 36rem);
		overflow-y: auto;
		background-color: #0c1410 !important;
		box-shadow: 0 24px 60px rgba(6, 10, 8, 0.85);
	}

	.career-detail-card__achievement {
		position: relative;
		padding-left: 1.05rem;
		color: var(--text-muted-dark);
		line-height: 1.7;
	}

	.career-detail-card__achievement::before {
		content: '';
		position: absolute;
		top: 0.7rem;
		left: 0;
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 999px;
		background: var(--accent);
	}

	.career-detail-card__meta {
		border: 1px solid rgba(255, 251, 221, 0.1);
		background: rgba(255, 255, 255, 0.022);
	}

	.career-detail-card__close {
		border: 1px solid rgba(255, 251, 221, 0.14);
		color: var(--text-on-dark);
		background: rgba(255, 255, 255, 0.04);
		transition:
			border-color var(--duration-fast) var(--ease-standard),
			background-color var(--duration-fast) var(--ease-standard);
	}

	.career-detail-card__close:focus-visible,
	.career-detail-card__close:hover {
		outline: none;
		border-color: var(--accent-strong);
		background: rgba(255, 255, 255, 0.08);
	}

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

	.career-item__mobile-date {
		align-items: end;
	}

	.career-item__panel {
		position: relative;
		overflow: visible;
		transition:
			border-color var(--duration-base) var(--ease-standard),
			box-shadow var(--duration-base) var(--ease-standard),
			transform var(--duration-base) var(--ease-standard);
	}

	.career-item__panel--active {
		border-color: rgba(255, 251, 221, 0.2);
		box-shadow: 0 24px 48px rgba(6, 10, 8, 0.2);
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
		transform: translateX(-50%) scale(0.9);
		box-shadow: 0 0 0 0.4rem rgba(176, 141, 87, 0.08);
		transition:
			transform 320ms var(--ease-standard),
			box-shadow 320ms var(--ease-standard);
	}

	.career-item__marker--visible {
		transform: translateX(-50%) scale(1);
	}

	.career-item__toggle {
		border: 1px solid rgba(255, 251, 221, 0.14);
		color: var(--text-on-dark);
		background: rgba(255, 255, 255, 0.03);
		transition:
			transform var(--duration-fast) var(--ease-standard),
			border-color var(--duration-fast) var(--ease-standard),
			background-color var(--duration-fast) var(--ease-standard);
	}

	.career-item__toggle:hover {
		transform: translateY(-1px);
		border-color: rgba(255, 251, 221, 0.24);
		background: rgba(255, 255, 255, 0.05);
	}

	.career-item__toggle:focus-visible {
		outline: none;
		border-color: var(--accent-strong);
		box-shadow: 0 0 0 3px var(--focus-ring);
	}

	.career-item__toggle--active {
		border-color: rgba(198, 162, 106, 0.44);
		background: rgba(198, 162, 106, 0.08);
	}

	.career-reveal {
		opacity: 0;
		transform: translate3d(0, 20px, 0);
		transition:
			opacity 320ms var(--ease-standard),
			transform 380ms var(--ease-standard);
		transition-delay: var(--career-reveal-delay, 0ms);
	}

	.career-reveal--visible {
		opacity: 1;
		transform: translate3d(0, 0, 0);
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

	@media (prefers-reduced-motion: reduce) {
		.career-item__panel,
		.career-item__marker,
		.career-item__toggle,
		.career-reveal {
			transition: none;
		}

		.career-reveal {
			opacity: 1;
			transform: none;
		}

		.career-detail-card {
			transition: none;
		}
	}
</style>
