<script lang="ts" module>
export const transitionX = writable(0);
</script>

<script lang="ts">
	import { type Snippet } from 'svelte';
	import { fade } from 'svelte/transition';
	import { XIcon } from '@lucide/svelte';

	import { goto } from '$app/navigation';
	import { urlParam } from '$lib/state/param.svelte.ts';
	import { drawerFly } from './drawerFly.js';
	import { writable } from 'svelte/store';
	import { useLayer } from './useLayer.svelte.js';

	let {
		key,
		title,
		class: klass = '',
		maxWidth = '32rem',
		classHeader = '',
		classBody = '',
		duration = 180,
		noOverlay = false,
		zIndex = 50,
		children
	}: {
		key: string;
		title?: string;
		class?: string;
		maxWidth?: string;
		classHeader?: string;
		classBody?: string;
		duration?: number;
		noOverlay?: boolean;
		zIndex?: number;
		children: Snippet<[{ open: typeof open; close: typeof close }]>;
	} = $props();

	type GotoOptions = Parameters<typeof goto>[1];
	export function open(value = 1, options: GotoOptions = {}) {
		return goto(urlParam.with({ [key]: value }), {
			...options,
			replaceState: true,
			noScroll: true
		});
	}

	export function close(options: GotoOptions = {}) {
		return goto(urlParam.without(key), { ...options, replaceState: true, noScroll: true });
	}
	let { offset, index, isActive } = $derived(useLayer(key));
	let clientWidth = $state(0);
</script>

{#if !noOverlay && isActive}
	<div
		role="button"
		onclick={() => close()}
		onkeyup={() => close()}
		tabindex={-1}
		transition:fade={{ duration }}
		style="z-index: {zIndex + index};"
		class="fixed inset-0 bg-black/15 backdrop-blur-[1.5px] dark:bg-white/15"
	></div>
{/if}

{#if isActive}
	<aside
		bind:clientWidth
		transition:drawerFly|local={{
			x: clientWidth,
			duration,
			opacity: 1,
			onTransition(pos) {
				$transitionX = pos.x;
			}
		}}
		style="
			z-index: {zIndex + index};
			max-width: min(100%, {maxWidth});
			transform: translateX({-offset * 4}rem);
			transition-duration: {duration}ms;
		"
		class:border-l={noOverlay}
		class="{klass} fixed
      		top-0 right-0 bottom-0 z-10 flex
			w-full flex-col overflow-y-scroll bg-base-100
			transition-transform
    	"
	>
		<div
			class="{classHeader}
				sticky top-0 z-20 flex items-center
				justify-between gap-2 border-b bg-base-100 p-4 pl-8
			"
		>
			<h2 class="title min-w-0 overflow-hidden">{title}</h2>
			<button onclick={() => close()} class="btn btn-square btn-sm">
				<XIcon title="Fermer" />
			</button>
		</div>

		<div class="{classBody} grow pr-4 pl-8">
			{@render children({ open, close })}
		</div>
	</aside>
{/if}
