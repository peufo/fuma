export { default as Tabs } from './Tabs.svelte'
export { default as TabsIcon } from './TabsIcon.svelte'

export type Tab = {
	href: string
	isActive?: boolean
	label: string
	icon: string
}
