import type { SectionId } from '$lib/types';

const state = $state({
	activeSection: 'home' as SectionId
});

export const navigationState = state;

export function setActiveSection(sectionId: SectionId) {
	state.activeSection = sectionId;
}
