import { browser } from '$app/environment';

type LoadStage = 'idle' | 'mounting' | 'document' | 'fonts' | 'ready';

const state = $state({
	active: browser,
	complete: !browser,
	reducedMotion: false,
	progress: browser ? 0 : 100,
	stage: 'idle' as LoadStage,
	label: browser ? 'Preparing portfolio' : 'Ready'
});

export const appLoadingState = state;

function finishLoading() {
	state.stage = 'ready';
	state.progress = 100;
	state.label = 'Ready';
	state.active = false;
	state.complete = true;
}

export function initializeAppLoading() {
	if (!browser || state.complete) {
		finishLoading();
		return () => {};
	}

	const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
	state.reducedMotion = motionQuery.matches;

	if (state.reducedMotion) {
		finishLoading();
		return () => {};
	}

	// Reset state awal
	state.active = true;
	state.complete = false;
	state.progress = 0;
	state.stage = 'mounting';
	state.label = 'Mounting shell';

	let currentProgress = 0;

	// Jalankan setiap 20ms (lebih cepat dari sebelumnya yang 30ms)
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
			// UBAH BAGIAN INI JADI ELSE SAJA
			// Semua angka di atas 95 akan masuk ke sini dan ditambah 1.5 terus sampai tembus 100
			currentProgress += 1.5;
		}

		state.progress = Math.min(Math.floor(currentProgress), 100);

		// JIKA SUDAH 100%, LANGSUNG BERHENTI
		if (state.progress >= 100) {
			clearInterval(interval);
			finishLoading();
		}
	}, 20); // Mengubah dari 30ms ke 20ms membuat kalkulasi berjalan lebih sering

	return () => {
		clearInterval(interval);
	};
}
