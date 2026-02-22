import { page } from '$app/state'

export const param = {
	get with() {
		return (params: Record<string, string | number>, ...keysToRemove: string[]) => {
			const url = new URL(page.url)
			Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, String(value)))
			keysToRemove.forEach((key) => url.searchParams.delete(key))
			return url.search
		}
	},
	get without() {
		return (...keys: string[]) =>  {
			const url = new URL(page.url)
			keys.forEach((key) => url.searchParams.delete(key))
			return url.search
		}
	},
	get toggle() {
		return (params: Record<string, string>, ...keysToRemove: string[]) => {
			const url = new URL(page.url)
			Object.entries(params).forEach(([key, value]) => {
				if (url.searchParams.get(key) === value) url.searchParams.delete(key)
				else url.searchParams.set(key, value)
			})
			keysToRemove.forEach((key) => url.searchParams.delete(key))
			return url.search
		}
	},
	get has() {
		return (key: string) => page.url.searchParams.has(key)
	},
	get get() {
		return (key: string) =>  page.url.searchParams.get(key)
	},
	get	hasValue() {
		return (key: string, value: string) => page.url.searchParams.get(key) === value
	},
	get keys() {
		return () => page.url.searchParams.keys()
	}
}

function addPathname<Args extends unknown[]>(fn: (...args: Args) => string): ((...args: Args) => string) {
	return (...args) => page.url.pathname + fn(...args)
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
