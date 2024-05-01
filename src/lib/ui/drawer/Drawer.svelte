<script lang="ts">
	import { onDestroy } from 'svelte'
	import { fade, fly } from 'svelte/transition'
	import { mdiClose } from '@mdi/js'

	import { goto } from '$app/navigation'
	import { urlParam } from '$lib/store/param.js'
	import { Icon } from '$lib/ui/index.js'
	import { subscibeDrawerLayers } from './layers.js'
	import { contextContainer } from '../context.js'

	export let title = ''
	/** Key used in url query params */
	export let key: string
	/** Value need to match in url query params*/
	export let value = '1'

	let klass = ''
	export { klass as class }
	export let maxWidth = '32rem'
	export let classHeader = ''
	export let classBody = ''
	export function open() {
		goto($urlParam.with({ [key]: value }), { replaceState: true })
	}
	export function close() {
		goto($urlParam.without(key), { replaceState: true })
	}

	const { offset, destroy, isActive } = subscibeDrawerLayers(key, value)
	onDestroy(destroy)
	contextContainer.set('drawer')
</script>

<svelte:head>
	{#if $isActive}
		<style>
			:root {
				scrollbar-width: none;
			}
		</style>
	{/if}
</svelte:head>

{#if $isActive}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		on:click={close}
		on:keyup={close}
		transition:fade={{ duration: 200 }}
		class="
			fixed inset-0 z-10 bg-black/15 backdrop-blur-[1.5px]
			 dark:bg-white/15"
	/>

	<aside
		transition:fly|local={{ x: 500, duration: 200 }}
		style="max-width: min(100%, {maxWidth}); transform: translateX({-$offset * 4}rem);"
		class="{klass}
      fixed bottom-0 right-0 top-0 z-10 flex w-full
			flex-col overflow-y-scroll bg-base-100 transition-transform
    "
	>
		<div
			class="{classHeader}
				sticky top-0 z-10 flex items-center
				justify-between gap-32 border-b bg-base-100 p-4 pl-8
			"
		>
			<h2 class="title">{title}</h2>
			<button on:click={close} class="btn btn-square btn-sm">
				<Icon path={mdiClose} title="annuler" />
			</button>
		</div>

		<div class="{classBody} grow pl-8 pr-4">
			<slot {open} {close} />
		</div>
	</aside>
{/if}
