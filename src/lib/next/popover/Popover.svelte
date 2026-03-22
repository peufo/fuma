<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';
	import {
		type Placement,
		type PopoverOptions,
		type PopoverType,
		usePopover
	} from './popover.svelte.ts';

	let {
		children,
		activator,
		class: klass = '',
		...popoverOptions
	}: {
		children: Snippet<[PopoverType]>;
		activator: Snippet<[PopoverType]>;
		placement?: Placement;
		class?: ClassValue;
	} & PopoverOptions = $props();

	let popover = usePopover(popoverOptions);
</script>

{@render activator(popover)}

<div {...popover.content} class={['shadow-sm" rounded-box border bg-base-100', klass]}>
	{@render children(popover)}
</div>

<style>
	div[popover]:popover-open {
		inset: 5px;
		transition-property: opacity, scale;
		transition-duration: 150ms;
		opacity: 1;
		scale: 1;
		@starting-style {
			opacity: 0;
			scale: 0.95;
		}
	}
</style>
