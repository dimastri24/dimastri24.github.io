<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		letter: string;
	}

	let { letter }: Props = $props();

	let ratioX = $state(0);
	let ratioY = $state(0);
	let allowDrift = $state(false);
	let allowTilt = $state(false);

	let rotateY = $derived(allowTilt ? ratioX * 25 : 0);
	let rotateX = $derived(allowTilt ? ratioY * -25 : 0);

	function handlePointerMove(event: PointerEvent) {
		if (!allowTilt) return;

		const currentTarget = event.currentTarget as HTMLDivElement | null;
		if (!currentTarget) return;

		const bounds = currentTarget.getBoundingClientRect();
		const centerX = bounds.left + bounds.width / 2;
		const centerY = bounds.top + bounds.height / 2;

		ratioX = (event.clientX - centerX) / (bounds.width / 2);
		ratioY = (event.clientY - centerY) / (bounds.height / 2);
	}

	function resetPointerState() {
		ratioX = 0;
		ratioY = 0;
	}

	onMount(() => {
		const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		const finePointerQuery = window.matchMedia('(pointer: fine)');

		const syncMotionPreferences = () => {
			allowDrift = !reducedMotionQuery.matches;
			allowTilt = !reducedMotionQuery.matches && finePointerQuery.matches;

			if (!allowTilt) resetPointerState();
		};

		syncMotionPreferences();
		reducedMotionQuery.addEventListener('change', syncMotionPreferences);
		finePointerQuery.addEventListener('change', syncMotionPreferences);

		return () => {
			reducedMotionQuery.removeEventListener('change', syncMotionPreferences);
			finePointerQuery.removeEventListener('change', syncMotionPreferences);
		};
	});
</script>

<div
	class="hero-mark-shell"
	aria-hidden="true"
	onpointermove={handlePointerMove}
	onpointerleave={resetPointerState}
>
	<div class="hero-mark-stage">
		<div class="hero-mark-orbit hero-mark-orbit-a"></div>
		<div class="hero-mark-orbit hero-mark-orbit-b"></div>

		<div
			class:hero-mark-drift={allowDrift}
			class="hero-mark-letter-wrap"
			style:transform="rotateX({rotateX}deg) rotateY({rotateY}deg)"
		>
			<span class="hero-mark-letter text-display">{letter}</span>
		</div>
	</div>
</div>

<style>
	.hero-mark-shell {
		position: relative;
		display: grid;
		place-items: center;
		min-height: clamp(12rem, 52vw, 31rem);
		padding: 0.25rem 0 0.5rem;
		perspective: 1200px;
	}

	.hero-mark-stage {
		position: relative;
		display: grid;
		place-items: center;
		width: 100%;
		min-height: inherit;
		transform-style: preserve-3d;
	}

	.hero-mark-orbit {
		position: absolute;
		border-radius: 999px;
		border: 1px solid rgba(255, 251, 221, 0.1);
		transform: translateZ(-40px);
	}

	.hero-mark-orbit-a {
		width: min(18rem, 100%);
		height: min(18rem, 100%);
	}

	.hero-mark-orbit-b {
		width: min(12rem, 72%);
		height: min(12rem, 72%);
	}

	.hero-mark-letter-wrap {
		position: relative;
		z-index: 1;
		display: grid;
		place-items: center;
		will-change: transform;
		transform-style: preserve-3d;
		transition: transform 0.25s cubic-bezier(0.25, 1, 0.5, 1);
	}

	.hero-mark-drift {
		animation: hero-mark-drift 6s ease-in-out infinite alternate;
	}

	.hero-mark-letter {
		font-size: clamp(6.5rem, 28vw, 15rem);
		line-height: 0.84;
		color: rgba(255, 251, 221, 0.96);
		transform: translateZ(80px);
		text-shadow:
			0 0 32px rgba(198, 162, 106, 0.16),
			0 26px 48px rgba(6, 10, 8, 0.2);
	}

	@keyframes hero-mark-drift {
		from {
			margin-top: -4px;
		}

		to {
			margin-top: 4px;
		}
	}

	@media (min-width: 640px) {
		.hero-mark-shell {
			padding-top: 0.5rem;
		}

		.hero-mark-orbit-a {
			width: min(22rem, 100%);
			height: min(22rem, 100%);
		}

		.hero-mark-orbit-b {
			width: min(15rem, 74%);
			height: min(15rem, 74%);
		}

		.hero-mark-letter {
			font-size: clamp(9rem, 23vw, 15rem);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-mark-drift {
			animation: none;
		}

		.hero-mark-letter-wrap {
			transition: none;
		}
	}
</style>
