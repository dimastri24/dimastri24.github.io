<script lang="ts">
	import { resolve } from '$app/paths';
	import type { RouteId } from '../../../routes/$types';
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails } from 'svelte-inview';
	import SectionShell from '$lib/components/layout/SectionShell.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import { contactMethods, socialLinks } from '$lib/data';

	let introRevealed = $state(false);
	let methodsRevealed = $state(false);
	let socialsRevealed = $state(false);

	const isExternalOrProtocol = (url: string) => {
		return (
			url.startsWith('mailto:') ||
			url.startsWith('tel:') ||
			url.startsWith('http:') ||
			url.startsWith('https:')
		);
	};

	function revealIntro(event: CustomEvent<ObserverEventDetails>) {
		if (event.detail.inView) {
			introRevealed = true;
		}
	}

	function revealMethods(event: CustomEvent<ObserverEventDetails>) {
		if (event.detail.inView) {
			methodsRevealed = true;
		}
	}

	function revealSocials(event: CustomEvent<ObserverEventDetails>) {
		if (event.detail.inView) {
			socialsRevealed = true;
		}
	}
</script>

<SectionShell id="contact" variant="light" label="Contact">
	<div class="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-12">
		<div
			use:inview={{ threshold: 0.2, unobserveOnEnter: true }}
			oninview_change={revealIntro}
			class:contact-reveal={true}
			class:contact-reveal--visible={introRevealed}
			class="max-w-2xl space-y-4 sm:space-y-5"
		>
			<p class="text-code text-xs tracking-[0.22em] text-[var(--accent)] uppercase">Contact</p>
			<h2 class="text-display text-3xl font-semibold sm:text-4xl">
				Let&apos;s keep the conversation direct.
			</h2>
			<p class="contact-copy text-base leading-8 sm:text-lg">
				For product collaboration, engineering roles, or a focused technical discussion, use the
				channel that fits best. No forms, no routing maze, just clear ways to reach me.
			</p>
		</div>

		<div class="space-y-5">
			<section
				use:inview={{ threshold: 0.18, unobserveOnEnter: true }}
				oninview_change={revealMethods}
				class:contact-reveal={true}
				class:contact-reveal--visible={methodsRevealed}
				class="surface-card-light rounded-[var(--radius-xl)] p-5 shadow-[var(--shadow-card)] sm:p-6"
				style="--contact-reveal-delay: 70ms;"
			>
				<div class="space-y-1">
					<h3 class="text-lg font-semibold text-[var(--text-on-light)] sm:text-xl">
						Primary contact
					</h3>
					<p class="text-muted-light text-sm leading-6">
						Core ways to get in touch or review credentials.
					</p>
				</div>

				<ul class="mt-5 space-y-3">
					{#each contactMethods as method, index (method.id)}
						{@const methodLinkAttributes = {
							href:
								method.external || isExternalOrProtocol(method.href)
									? method.href
									: resolve(method.href as RouteId),
							target: method.external ? '_blank' : undefined,
							rel: method.external ? 'noreferrer' : undefined
						}}
						<li>
							<a
								{...methodLinkAttributes}
								class:contact-row-item={true}
								class:contact-row-item--visible={methodsRevealed}
								class="contact-row"
								aria-label={`${method.label}: ${method.value}${method.external ? ' (opens in a new tab)' : ''}`}
								style={`--contact-row-delay: ${index * 70}ms;`}
							>
								<span class="contact-row__icon" aria-hidden="true">
									<Icon name={method.icon} size="md" />
								</span>

								<span class="min-w-0 flex-1">
									<span class="contact-row__label">{method.label}</span>
									<span class="contact-row__value">{method.value}</span>
								</span>
							</a>
						</li>
					{/each}
				</ul>
			</section>

			<section
				use:inview={{ threshold: 0.18, unobserveOnEnter: true }}
				oninview_change={revealSocials}
				class:contact-reveal={true}
				class:contact-reveal--visible={socialsRevealed}
				class="surface-card-light rounded-[var(--radius-xl)] p-5 shadow-[var(--shadow-card)] sm:p-6"
				style="--contact-reveal-delay: 140ms;"
			>
				<div class="space-y-1">
					<h3 class="text-lg font-semibold text-[var(--text-on-light)] sm:text-xl">
						Social presence
					</h3>
					<p class="text-muted-light text-sm leading-6">
						Public profiles for code, network, and day-to-day presence.
					</p>
				</div>

				<ul class="mt-5 space-y-3">
					{#each socialLinks as link, index (link.id)}
						{@const socialLinkAttributes = {
							href:
								link.external || isExternalOrProtocol(link.href)
									? link.href
									: resolve(link.href as RouteId),
							target: link.external ? '_blank' : undefined,
							rel: link.external ? 'noreferrer' : undefined
						}}
						<li>
							<a
								{...socialLinkAttributes}
								class:contact-row-item={true}
								class:contact-row-item--visible={socialsRevealed}
								class="contact-row"
								aria-label={`${link.label}${link.external ? ' (opens in a new tab)' : ''}`}
								style={`--contact-row-delay: ${index * 70}ms;`}
							>
								<span class="contact-row__icon" aria-hidden="true">
									<Icon name={link.icon} size="md" />
								</span>

								<span class="min-w-0 flex-1">
									<span class="contact-row__label">{link.label}</span>
									<span class="contact-row__value">{link.href}</span>
								</span>
							</a>
						</li>
					{/each}
				</ul>
			</section>
		</div>
	</div>
</SectionShell>

<style>
	.contact-copy {
		max-width: 36rem;
		color: rgba(16, 22, 18, 0.78);
	}

	.contact-reveal {
		opacity: 0;
		transform: translate3d(0, 20px, 0);
		transition:
			opacity 320ms var(--ease-standard),
			transform 380ms var(--ease-standard);
		transition-delay: var(--contact-reveal-delay, 0ms);
	}

	.contact-reveal--visible {
		opacity: 1;
		transform: translate3d(0, 0, 0);
	}

	.contact-row {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 1rem 1rem 0.95rem;
		border: 1px solid rgba(21, 41, 30, 0.12);
		border-radius: var(--radius-lg);
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.76), rgba(21, 41, 30, 0.03)),
			rgba(255, 255, 255, 0.58);
		color: var(--text-on-light);
		text-decoration: none;
		transition:
			transform var(--duration-fast) var(--ease-standard),
			border-color var(--duration-fast) var(--ease-standard),
			box-shadow var(--duration-fast) var(--ease-standard),
			background-color var(--duration-fast) var(--ease-standard);
	}

	.contact-row-item {
		opacity: 0;
		transform: translate3d(0, 16px, 0);
		transition:
			opacity 260ms var(--ease-standard),
			transform 320ms var(--ease-standard),
			border-color var(--duration-fast) var(--ease-standard),
			box-shadow var(--duration-fast) var(--ease-standard),
			background-color var(--duration-fast) var(--ease-standard);
		transition-delay: var(--contact-row-delay, 0ms);
	}

	.contact-row-item--visible {
		opacity: 1;
		transform: translate3d(0, 0, 0);
	}

	.contact-row__icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex: 0 0 auto;
		width: 2.75rem;
		height: 2.75rem;
		border: 1px solid rgba(21, 41, 30, 0.12);
		border-radius: 999px;
		background: rgba(247, 241, 210, 0.84);
		color: var(--color-forest-900);
	}

	.contact-row__label,
	.contact-row__value {
		display: block;
		min-width: 0;
	}

	.contact-row__label {
		font-size: 0.95rem;
		font-weight: 600;
	}

	.contact-row__value {
		margin-top: 0.18rem;
		font-size: 0.9rem;
		line-height: 1.65;
		color: rgba(16, 22, 18, 0.7);
		word-break: break-word;
	}

	.contact-row:hover {
		transform: translateY(-1px);
		border-color: rgba(21, 41, 30, 0.2);
		box-shadow: 0 12px 28px rgba(21, 41, 30, 0.08);
	}

	.contact-row:focus-visible {
		outline: none;
		border-color: var(--accent);
		box-shadow: 0 0 0 3px var(--focus-ring);
	}

	@media (prefers-reduced-motion: reduce) {
		.contact-reveal,
		.contact-row-item,
		.contact-row {
			transition: none;
		}

		.contact-reveal,
		.contact-row-item {
			opacity: 1;
			transform: none;
		}
	}
</style>
