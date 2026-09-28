import { SvelteSet } from 'svelte/reactivity'
import { page } from '$app/state'

// Un ensemble et non un compteur: chaque tiroir monté fait tourner son effet, et des
// incréments/décréments dans un ordre non garanti finissaient à zéro au chargement direct
// d'une URL portant déjà un tiroir ouvert — `offset` valait alors -1 et poussait le tiroir
// hors de l'écran par la droite.
const activeKeys = new SvelteSet<string>()

export function useLayer(key: string) {
	const isActive = $derived(page.url.searchParams.has(key))
	// Les tiroirs ouverts, dans l'ordre de l'URL; les autres paramètres (recherche, filtres d'une
	// liste) sont ignorés. `key` y figure avant que son effet l'ait ajouté à `activeKeys`.
	const layers = $derived(
		[...page.url.searchParams.keys()].filter(
			(k, i, keys) => keys.indexOf(k) === i && (k === key || activeKeys.has(k))
		)
	)
	const index = $derived(layers.indexOf(key))
	const offset = $derived(isActive ? layers.length - index - 1 : 0)
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
