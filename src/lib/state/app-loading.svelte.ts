import { browser } from '$app/environment';

type LoadStage = 'idle' | 'mounting' | 'document' | 'fonts' | 'ready';

// Read immediately when the module loads on the client side
const alreadyLoaded = browser && sessionStorage.getItem('portfolio_loaded') === 'true';

const state = $state({
	active: alreadyLoaded ? false : true, // 👈 Instant fix: Start as false if already loaded!
	complete: alreadyLoaded ? true : false, // 👈 Mark as complete immediately
	reducedMotion: false,
	progress: alreadyLoaded ? 100 : 0, // 👈 Skip progress if already done
	stage: (alreadyLoaded ? 'ready' : 'idle') as LoadStage,
	label: alreadyLoaded ? 'Ready' : 'Preparing portfolio'
});

export const appLoadingState = state;

function finishLoading() {
	state.stage = 'ready';
	state.progress = 100;
	state.label = 'Ready';
	state.active = false;
	state.complete = true;

	if (browser) {
		sessionStorage.setItem('portfolio_loaded', 'true');
	}
}

export function initializeAppLoading() {
	// If already loaded via sessionStorage or state says so, bail instantly
	if (!browser || alreadyLoaded || state.complete) {
		finishLoading();
		return () => {};
	}

	const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
	state.reducedMotion = motionQuery.matches;

	if (state.reducedMotion) {
		finishLoading();
		return () => {};
	}

	// Reset initial state (Only runs on a genuinely fresh visit!)
	state.active = true;
	state.complete = false;
	state.progress = 0;
	state.stage = 'mounting';
	state.label = 'Mounting shell';

	let currentProgress = 0;

	const interval = window.setInterval(() => {
		if (currentProgress < 30) {
			currentProgress += Math.random() * 2 + 2;
			state.stage = 'mounting';
			state.label = 'Mounting shell';
		} else if (currentProgress < 70) {
			currentProgress += Math.random() * 1 + 1.5;
			state.stage = 'document';
			state.label = 'Preparing sections';
		} else if (currentProgress < 95) {
			currentProgress += Math.random() * 1 + 0.5;
			state.stage = 'fonts';
			state.label = 'Polishing details';
		} else {
			currentProgress += 1.5;
		}

		state.progress = Math.min(Math.floor(currentProgress), 100);

		if (state.progress >= 100) {
			clearInterval(interval);
			finishLoading();
		}
	}, 20);

	return () => {
		clearInterval(interval);
	};
}
