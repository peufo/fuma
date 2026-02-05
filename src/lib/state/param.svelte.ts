import { page } from '$app/state'

export let param = $derived({
	with(params: Record<string, string | number>, ...keysToRemove: string[]) {
		const url = new URL(page.url)
		Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, String(value)))
		keysToRemove.forEach((key) => url.searchParams.delete(key))
		return url.search
	},
	without(...keys: string[]) {
		const url = new URL(page.url)
		keys.forEach((key) => url.searchParams.delete(key))
		return url.search
	},
	toggle(params: Record<string, string>, ...keysToRemove: string[]) {
		const url = new URL(page.url)
		Object.entries(params).forEach(([key, value]) => {
			if (url.searchParams.get(key) === value) url.searchParams.delete(key)
			else url.searchParams.set(key, value)
		})
		keysToRemove.forEach((key) => url.searchParams.delete(key))
		return url.search
	},
	has: (key: string) => page.url.searchParams.has(key),
	get: (key: string) => page.url.searchParams.get(key),
	hasValue: (key: string, value: string) => page.url.searchParams.get(key) === value,
})

function addPathname<Args extends unknown[]>(fn: (...args: Args) => string): ((...args: Args) => string) {
	return (...args) => page.url.pathname + fn(...args)
}
export let urlParam = $derived({
	with: addPathname(param.with),
	without: addPathname(param.without),
	toggle: addPathname(param.toggle)
})
