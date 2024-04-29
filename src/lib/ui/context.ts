import { getContext, setContext } from 'svelte'

const KEYS = {
	container: 'container'
} as const

type Container = 'drawer' | 'card'

export const contextContainer = {
	set(container: Container) {
		return setContext(KEYS.container, container)
	},
	get() {
		return getContext<Container | null>(KEYS.container)
	}
}
