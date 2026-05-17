<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import type { TransitionConfig } from 'svelte/transition';

	interface Props {
		progress: number;
		label: string;
		stage: 'idle' | 'mounting' | 'document' | 'fonts' | 'ready';
		reducedMotion?: boolean;
	}

	let { progress, label, stage, reducedMotion = false }: Props = $props();

	const stageTitles: Record<Props['stage'], string> = {
		idle: 'Preparing',
		mounting: 'Booting shell',
		document: 'Syncing route output',
		fonts: 'Loading type system',
		ready: 'Ready'
	};

	function exitTransition(_node: Element): TransitionConfig {
		if (reducedMotion) {
			return {
				duration: 140,
				easing: cubicOut,
				css: (t) => `opacity: ${t}`
			};
		}

		return {
			duration: 900,
			easing: cubicOut,
			css: (t, u) => {
				const translateY = `${u * -100}%`;
				const opacity = 1 - u * 0.18;
				return `transform: translate3d(0, ${translateY}, 0); opacity: ${opacity};`;
			}
		};
	}
</script>

<div
	class="loading-screen fixed inset-0 z-50 flex items-center justify-center px-6 py-10"
	role="status"
	aria-live="polite"
	aria-label="Application loading"
	out:exitTransition
>
	<div
		class="loading-screen__panel w-full max-w-xl rounded-[var(--radius-xl)] px-6 py-8 sm:px-8 sm:py-10"
	>
		<div class="space-y-6">
			<div class="space-y-3">
				<p class="text-code text-xs tracking-[0.28em] text-[var(--accent-strong)] uppercase">
					{stageTitles[stage]}
				</p>
				<div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
					<h1 class="text-display max-w-[12ch] text-4xl leading-[0.95] font-semibold sm:text-5xl">
						Dimas portfolio
					</h1>
					<div class="flex max-w-[22rem] items-center gap-3 sm:justify-end">
						<p class="text-muted-dark text-sm leading-7 sm:text-right">
							{label}
						</p>
						<div class="loading-screen__dots" aria-hidden="true">
							<span></span>
							<span></span>
							<span></span>
						</div>
					</div>
				</div>
			</div>

			<div class="space-y-3">
				<div
					class="loading-screen__meter"
					role="progressbar"
					aria-valuemin="0"
					aria-valuemax="100"
					aria-valuenow={progress}
					aria-valuetext={`${progress}%`}
				>
					<div class="loading-screen__meter-fill" style={`width: ${progress}%`}></div>
				</div>
				<div class="flex items-center justify-between gap-4">
					<p class="text-code text-muted-dark text-xs tracking-[0.16em] uppercase">
						Initial load only
					</p>
					<p class="text-code text-xs tracking-[0.18em] text-[var(--accent-strong)] uppercase">
						{progress}%
					</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.loading-screen {
		background:
			radial-gradient(circle at top, rgba(198, 162, 106, 0.12), transparent 28rem),
			linear-gradient(180deg, rgba(21, 41, 30, 0.96) 0%, rgba(21, 41, 30, 0.985) 100%);
		backdrop-filter: blur(14px);
	}

	.loading-screen__panel {
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
		border: var(--border-soft-dark);
		box-shadow: var(--shadow-hero);
	}

	.loading-screen__meter {
		overflow: hidden;
		height: 0.875rem;
		border: var(--border-soft-dark);
		border-radius: var(--radius-pill);
		background: rgba(255, 251, 221, 0.08);
	}

	.loading-screen__meter-fill {
		height: 100%;
		border-radius: inherit;
		background: linear-gradient(90deg, var(--color-cream-100), var(--accent-strong));
		box-shadow: 0 0 24px rgba(198, 162, 106, 0.22);
		transition: width var(--duration-base) var(--ease-standard);
	}

	.loading-screen__dots {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding-top: 0.125rem;
	}

	.loading-screen__dots span {
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 999px;
		background: var(--accent-strong);
		animation: loading-dot 620ms var(--ease-standard) infinite alternate;
	}

	.loading-screen__dots span:nth-child(2) {
		animation-delay: 90ms;
	}

	.loading-screen__dots span:nth-child(3) {
		animation-delay: 180ms;
	}

	@keyframes loading-dot {
		from {
			transform: translateY(0);
			opacity: 0.45;
		}

		to {
			transform: translateY(-0.3rem);
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.loading-screen {
			backdrop-filter: none;
		}

		.loading-screen__meter-fill {
			transition: none;
		}

		.loading-screen__dots span {
			animation: none;
			opacity: 0.9;
		}
	}
</style>
