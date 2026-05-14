import type { SectionId } from '$lib/types';

const state = $state({
	activeSection: 'home' as SectionId,
	isManualScrolling: false
});

export const navigationState = state;

export function setActiveSection(sectionId: SectionId) {
	state.activeSection = sectionId;
}

let scrollReleaseTimeout: number | undefined;

function releaseManualScrolling() {
	if (scrollReleaseTimeout) {
		clearTimeout(scrollReleaseTimeout);
		scrollReleaseTimeout = undefined;
	}

	state.isManualScrolling = false;
}

export function scrollToSection(id: SectionId) {
	if (typeof window === 'undefined') {
		setActiveSection(id);
		return;
	}

	const target = document.getElementById(id);
	if (!target) {
		setActiveSection(id);
		releaseManualScrolling();
		return;
	}

	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	state.isManualScrolling = true;
	setActiveSection(id);
	window.history.replaceState(window.history.state, '', `#${id}`);

	const finishScroll = () => {
		window.removeEventListener('scrollend', finishScroll);
		releaseManualScrolling();
	};

	scrollReleaseTimeout = window.setTimeout(finishScroll, reducedMotion ? 80 : 700);

	if ('onscrollend' in window) {
		window.addEventListener('scrollend', finishScroll, { once: true });
	}

	target.scrollIntoView({
		behavior: reducedMotion ? 'auto' : 'smooth',
		block: 'start'
	});
}
