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

export function subscibeDrawerLayers(key: string, value: string) {
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
