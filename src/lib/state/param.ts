import type { ResolvedPathname } from '$app/types'
import { page } from '$app/state'
import { SvelteURLSearchParams } from 'svelte/reactivity'

export const param = {
	get with() {
		return (params: Record<string, string | number>, ...keysToRemove: string[]) => {
			const searchParams = new SvelteURLSearchParams(page.url.searchParams)
			Object.entries(params).forEach(([key, value]) => {
				searchParams.set(key, String(value))
			})
			keysToRemove.forEach((key) => {
				searchParams.delete(key)
			})
			return searchParams.toString()
		}
	},
	get without() {
		return (...keys: string[]) => {
			const searchParams = new SvelteURLSearchParams(page.url.searchParams)
			keys.forEach((key) => {
				searchParams.delete(key)
			})
			return searchParams.toString()
		}
	},
	get toggle() {
		return (params: Record<string, string>, ...keysToRemove: string[]) => {
			const searchParams = new SvelteURLSearchParams(page.url.searchParams)
			Object.entries(params).forEach(([key, value]) => {
				if (searchParams.get(key) === value) searchParams.delete(key)
				else searchParams.set(key, value)
			})
			keysToRemove.forEach((key) => {
				searchParams.delete(key)
			})
			return searchParams.toString()
		}
	},
	get has() {
		return (key: string, value?: string) => page.url.searchParams.has(key, value)
	},
	get get() {
		return (key: string) => page.url.searchParams.get(key)
	},
	get keys() {
		return () => page.url.searchParams.keys()
	}
}

function addPathname<Args extends unknown[]>(
	fn: (...args: Args) => string
): (...args: Args) => ResolvedPathname {
	return (...args) => (page.url.pathname + '?' + fn(...args)) as ResolvedPathname
}

export const urlParam = {
	...param,
	get with() {
		return addPathname(param.with)
	},
	get without() {
		return addPathname(param.without)
	},
	get toggle() {
		return addPathname(param.toggle)
	}
}
