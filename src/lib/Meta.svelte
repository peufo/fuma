<script lang="ts">
	import { type SvelteComponent } from 'svelte'
	import { Card, Table } from './index.js'

	export let name = ''
	export let description = ''
	export let component: SvelteComponent

	type Props = { id: string; value: string }[]
	let props: Props = []

	$: initMeta(component)

	function initMeta(c: SvelteComponent | undefined) {
		if (!c) return
		updateComponentMeta(c)
		component.$$.after_update.push(() => updateComponentMeta(c))
	}

	function updateComponentMeta(c: SvelteComponent) {
		const ctx = c.$$.ctx
		const propsIndex = Object.entries<number>(c.$$.props)
		props = propsIndex.map(([id, index]) => ({
			id,
			value: ctx[index] as string
		}))
	}
</script>

<Card class="mx-auto mt-6 max-w-4xl">
	<svelte:fragment slot="title">{name}</svelte:fragment>
	<svelte:fragment slot="subtitle">{description}</svelte:fragment>

	<slot />

	<div class="my-10" />

	<Table
		items={props}
		fields={[
			{
				key: 'name',
				label: 'Prop',
				getCell: (p) => p.id,
				locked: true
			},
			{
				key: 'type',
				label: 'Type',
				getCell: (p) => typeof p.value
			},
			{
				key: 'value',
				label: 'Value',
				getCell: (p) => p.value,
				visible: true
			}
		]}
	></Table>
</Card>
