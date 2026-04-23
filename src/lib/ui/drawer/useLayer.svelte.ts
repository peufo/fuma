import { untrack } from 'svelte'
import { page } from '$app/state'

let nbActives = $state(0)

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
	const offset = $derived(isActive && nbActives - index - 1)
	$effect(() => {
		if (isActive) untrack(() => nbActives++)
		else untrack(() => (nbActives = Math.max(nbActives - 1, 0)))
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
