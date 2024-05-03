import { derived, get, writable, type Readable } from 'svelte/store'
import { page } from '$app/stores'

const layers = writable<string[]>([])
const layersOffset = derived<Readable<string[]>, Record<string, number>>(layers, ($layers) => {
	const nbDrawer = $layers.length
	return $layers.reduce((acc, layer, index) => {
		const drawerOffset = nbDrawer - index - 1
		console.log({ drawerOffset })
		return { ...acc, [layer]: drawerOffset }
	}, {})
})

export function subscibeDrawerLayers(key: string, value: string) {
	const layerId = Math.random().toString().slice(2, 12)
	let isInitialized = false
	const isActive = derived(page, ({ url }) => url.searchParams.get(key) === value, false)
	const isActiveUnsubscribe = isActive.subscribe(($isActive) => {
		if ($isActive) addLayer()
		else if (isInitialized) removeLayer()
		isInitialized = true
	})

	function addLayer() {
		layers.update((ids) => [...ids, layerId])
	}

	function removeLayer() {
		if (!get(layers).length) return
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
