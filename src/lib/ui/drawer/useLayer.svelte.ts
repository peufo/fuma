import { SvelteSet } from 'svelte/reactivity'
import { page } from '$app/state'

// Un ensemble et non un compteur: chaque tiroir monté fait tourner son effet, et des
// incréments/décréments dans un ordre non garanti finissaient à zéro au chargement direct
// d'une URL portant déjà un tiroir ouvert — `offset` valait alors -1 et poussait le tiroir
// hors de l'écran par la droite.
const activeKeys = new SvelteSet<string>()

export function useLayer(key: string) {
	const index = $derived.by(() => {
		let i = 0
		for (const k of page.url.searchParams.keys()) {
			if (k === key) return i
			i++
		}
		return -1
	})
	const isActive = $derived(index !== -1)
	const offset = $derived(isActive ? Math.max(activeKeys.size - index - 1, 0) : 0)
	$effect(() => {
		if (!isActive) return
		activeKeys.add(key)
		return () => activeKeys.delete(key)
	})
	return {
		get index() {
			return index
		},
		get offset() {
			return offset
		},
		get isActive() {
			return isActive
		}
	}
}
