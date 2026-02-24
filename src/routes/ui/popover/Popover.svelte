<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	const uid = $props.id();
	const anchorName = $derived(`--anchor-${uid}`);

	let { class: klass = '' }: { class?: ClassValue } = $props();

	let popover = $state<HTMLDivElement>();
	// onfocus={() => popover?.showPopover()}
	// onblur={() => popover?.hidePopover()}
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
	class="menu dropdown h-52 w-52 rounded-box bg-base-100 shadow-sm"
	style="position-anchor: {anchorName};"
>
	Popover content
</div>
