<script lang="ts">
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails } from 'svelte-inview';
	import type { SectionId } from '$lib/types';
	import { setActiveSection } from '$lib/state/navigation.svelte';

	interface Props {
		id: SectionId;
		threshold?: number | number[];
	}

	let { id, threshold = 0.3 }: Props = $props();

	function handleEnter(event: CustomEvent<ObserverEventDetails>) {
		if (event.detail.inView) {
			setActiveSection(id);
		}
	}
</script>

<div
	use:inview={{ rootMargin: '-32% 0px -52% 0px', threshold }}
	oninview_enter={handleEnter}
	aria-hidden="true"
	class="pointer-events-none absolute inset-x-0 top-0 h-px"
></div>
