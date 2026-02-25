<script lang="ts">
	import { CarrotIcon } from '@lucide/svelte';
	import type { ClassValue } from 'svelte/elements';

	const uid = $props.id();
	const anchorName = $derived(`--anchor-${uid}`);

	let { class: klass = '' }: { class?: ClassValue } = $props();

	let popover = $state<HTMLDivElement>();
</script>

<button
	onclick={() => popover?.togglePopover()}
	style="anchor-name: {anchorName};"
	class={['btn', klass]}
>
	Toggle the popover
</button>

<div
	bind:this={popover}
	popover
	class="rounded-box border bg-base-100 shadow-sm"
	style="position-anchor: {anchorName};"
>
	<div class="grid h-52 w-52 place-content-center">
		<CarrotIcon size={42} opacity={0.4} />
	</div>
</div>

<style>
	div[popover] {
		inset: auto;
		position-area: bottom span-right;
		position-visibility: anchors-visible;
		position-try: flip-block, flip-inline;
	}

	div[popover]:popover-open {
		transition-property: opacity, translate, scale;
		transition-duration: 150ms;
		transform-origin: top;
		opacity: 1;
		scale: 1;
		translate: 0px 5px;
		@starting-style {
			opacity: 0;
			scale: 0.85;
			translate: 0px 0px;
		}
	}
</style>
