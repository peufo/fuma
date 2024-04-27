<script lang="ts" context="module">
	import { derived, writable, type Readable } from 'svelte/store'
	import { page } from '$app/stores'

	const layers = writable<string[]>([])
	const layersOffset = derived<Readable<string[]>, Record<string, number>>(layers, (ids) => {
		const nbDrawer = ids.length
		return ids.reduce((acc, id, index) => {
			const drawerOffset = nbDrawer - index - 1
			return { ...acc, [id]: drawerOffset }
		}, {})
	})

	function subscibeDrawerLayers(key: string, value: string) {
		const layerId = Math.random().toString().slice(2, 12)
		const isActive = derived(page, ({ url }) => url.searchParams.get(key) === value)
		const isActiveUnsubscribe = isActive.subscribe((_isActive) => {
			if (_isActive) layers.update((ids) => [...ids, layerId])
			else removeLayer()
		})

		function removeLayer() {
			layers.update((ids) => {
				const index = ids.indexOf(layerId)
				return ids.toSpliced(index, 1)
			})
		}

		return {
			isActive,
			offset: derived(layersOffset, (drawers) => drawers[layerId]),
			destroy() {
				removeLayer()
				isActiveUnsubscribe()
			}
		}
	}
</script>

<script lang="ts">
	import { fade, fly } from 'svelte/transition'
	import { mdiClose } from '@mdi/js'

	import { goto } from '$app/navigation'
	import { Icon, urlParam } from 'fuma'
	import { onDestroy } from 'svelte'

	export let title = ''
	/** Key used in url query params */
	export let key: string
	/** Value need to match in url query params*/
	export let value = '1'

	let klass = ''
	export { klass as class }
	export let maxWidth = '32rem'
	export function open() {
		goto($urlParam.with({ key: value }), { replaceState: true })
	}
	export function close() {
		console.log('close')
		goto($urlParam.without(key), { replaceState: true })
	}

	const { offset, destroy, isActive } = subscibeDrawerLayers(key, value)
	onDestroy(destroy)
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
			fixed inset-0 z-10 bg-black/25 backdrop-blur-[1.5px]
			 dark:bg-white/25"
	/>

	<aside
		transition:fly|local={{ x: 500, duration: 200 }}
		style="max-width: min(100%, {maxWidth}); transform: translateX({-$offset * 4}rem);"
		class="{klass}
      fixed bottom-0 right-0 top-0 z-10 flex
			flex-col overflow-y-scroll bg-base-100 transition-transform
    "
	>
		<div
			class="
				sticky top-0 z-10 flex items-center justify-between
				gap-32 border-b bg-base-100 p-4 pl-8
			"
		>
			<h2 class="title">{title}</h2>
			<button on:click={close} class="btn btn-square btn-sm">
				<Icon path={mdiClose} title="annuler" />
			</button>
		</div>

		<div class="grow">
			<slot />
		</div>
	</aside>
{/if}
