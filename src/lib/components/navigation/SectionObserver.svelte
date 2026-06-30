<script lang="ts">
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails } from 'svelte-inview';
	import type { SectionId } from '$lib/types';
	import { navigationState, setActiveSection } from '$lib/state/navigation.svelte';

	interface Props {
		id: SectionId;
		threshold?: number | number[];
		children?: import('svelte').Snippet;
	}

	let { id, threshold = 0, children }: Props = $props();

	function handleEnter(event: CustomEvent<ObserverEventDetails>) {
		if (event.detail.inView && !navigationState.isManualScrolling) {
			setActiveSection(id);
		}
	}
</script>

<div
	use:inview={{
		rootMargin: '-20% 0px -60% 0px',
		threshold: threshold,
		unobserveOnEnter: false
	}}
	oninview_enter={handleEnter}
	class="relative w-full"
>
	{@render children?.()}
</div>
