<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { ClassValue } from 'svelte/elements'
	import {
		type Placement,
		type PopoverOptions,
		type PopoverType,
		usePopover
	} from './popover.svelte.ts'

	let {
		children,
		trigger,
		class: klass = '',
		style = '',
		...popoverOptions
	}: {
		children: Snippet<[PopoverType]>
		trigger: Snippet<[PopoverType]>
		placement?: Placement
		class?: ClassValue
		style?: string
	} & PopoverOptions = $props()

	let popover = usePopover((() => popoverOptions)())
</script>

{@render trigger(popover)}

<div {...popover.content} {style} class={['rounded-box border bg-base-100 shadow-xl', klass]}>
	{@render children(popover)}
</div>

<style>
	div[popover] {
		border-color: color-mix(in oklab, var(--color-base-content) 20%, #0000);
	}

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
