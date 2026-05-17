<script lang="ts">
	interface Props {
		progress: number;
		label: string;
		stage: 'idle' | 'mounting' | 'document' | 'fonts' | 'ready';
	}

	let { progress, label, stage }: Props = $props();

	const stageTitles: Record<Props['stage'], string> = {
		idle: 'Preparing',
		mounting: 'Booting shell',
		document: 'Syncing route output',
		fonts: 'Loading type system',
		ready: 'Ready'
	};
</script>

<div
	class="loading-screen fixed inset-0 z-50 flex items-center justify-center px-6 py-10"
	role="status"
	aria-live="polite"
	aria-label="Application loading"
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
					<p class="text-muted-dark max-w-[22rem] text-sm leading-7 sm:text-right">
						{label}
					</p>
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

	@media (prefers-reduced-motion: reduce) {
		.loading-screen {
			backdrop-filter: none;
		}

		.loading-screen__meter-fill {
			transition: none;
		}
	}
</style>
