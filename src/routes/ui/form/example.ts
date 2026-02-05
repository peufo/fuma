import {AmbulanceIcon, AirVentIcon, AppleIcon} from '@lucide/svelte'
import type { Options } from '$lib/utils/options.js'

export const options: Options = {
	a: { label: 'Option A', icon: AmbulanceIcon },
	b: { label: 'Option B', icon: AirVentIcon },
	c: { label: 'Option C', icon: AppleIcon }
}

export type Item = { id: string; name: string }
export const items: Item[] = [
	{ id: '1', name: 'Item A' },
	{ id: '2', name: 'Item B' },
	{ id: '3', name: 'Item C' }
]

export async function searchItems(search: string) {
	await wait(600)
	const reg = new RegExp(search, 'i')
	return items.filter((item) => item.name.match(reg))
}

export async function wait(ms: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), ms)
	})
}
