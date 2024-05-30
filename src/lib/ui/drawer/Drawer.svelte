<script lang="ts">
	import { onDestroy } from 'svelte'
	import { fade } from 'svelte/transition'
	import { mdiClose } from '@mdi/js'

	import { goto } from '$app/navigation'
	import { urlParam } from '$lib/store/param.js'
	import { Icon } from '$lib/ui/icon/index.js'
	import { subscibeDrawerLayers } from './layers.js'
	import { contextContainer } from '../context.js'
	import { drawerFly, type DrawerFlyParams } from './drawerFly.js'
	import { writable } from 'svelte/store'

	export let title = ''
	/** Key used in url query params */
	export let key: string

	let klass = ''
	export { klass as class }
	export let maxWidth = '32rem'
	export let classHeader = ''
	export let classBody = ''
	export let duration = 180
	export let noOverlay = false
	export let transitionX = 0

	type GotoOptions = Parameters<typeof goto>[1]
	export function open(value = 1, options: GotoOptions = {}) {
		return goto($urlParam.with({ [key]: value }), {
			...options,
			replaceState: true,
			noScroll: true
		})
	}
	export function close(options: GotoOptions = {}) {
		return goto($urlParam.without(key), { ...options, replaceState: true, noScroll: true })
	}

	const { offset, index, destroy, isActive } = subscibeDrawerLayers(key)
	onDestroy(destroy)
	contextContainer.set('drawer')
	let clientWidth = 0
</script>

{#if !noOverlay && $isActive}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		on:click={() => close()}
		on:keyup={() => close()}
		transition:fade={{ duration }}
		style="z-index: {10 + $index};"
		class="fixed inset-0 bg-black/15 backdrop-blur-[1.5px] dark:bg-white/15"
	/>
{/if}

{#if $isActive}
	<aside
		bind:clientWidth
		transition:drawerFly|local={{
			x: clientWidth,
			duration,
			opacity: 1,
			onTransition(pos) {
				transitionX = pos.x
			}
		}}
		style="
			z-index: {10 + $index};
			max-width: min(100%, {maxWidth});
			transform: translateX({-$offset * 4}rem);
			transition-duration: {duration}ms;
		"
		class:border-l={noOverlay}
		class="{klass} fixed
      bottom-0 right-0 top-0 z-10 flex
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
			<button on:click={() => close()} class="btn btn-square btn-sm">
				<Icon path={mdiClose} title="annuler" />
			</button>
		</div>

		<div class="{classBody} grow pl-8 pr-4">
			<slot {open} {close} />
		</div>
	</aside>
{/if}
