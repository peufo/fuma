import { page } from '$app/state'

class Param {
	with(params: Record<string, string | number>, ...keysToRemove: string[]) {
		const url = new URL(page.url)
		Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, String(value)))
		keysToRemove.forEach((key) => url.searchParams.delete(key))
		return url.search
	}
	without(...keys: string[]) {
		const url = new URL(page.url)
		keys.forEach((key) => url.searchParams.delete(key))
		return url.search
	}
	toggle(params: Record<string, string>, ...keysToRemove: string[]) {
		const url = new URL(page.url)
		Object.entries(params).forEach(([key, value]) => {
			if (url.searchParams.get(key) === value) url.searchParams.delete(key)
			else url.searchParams.set(key, value)
		})
		keysToRemove.forEach((key) => url.searchParams.delete(key))
		return url.search
	}
	has(key: string) {
		return page.url.searchParams.has(key)
	}
	get(key: string) {
		return page.url.searchParams.get(key)
	}
	hasValue(key: string, value: string) {
		return page.url.searchParams.get(key) === value
	}
}

export const param = new Param()

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
