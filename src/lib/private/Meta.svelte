<script lang="ts">
	import { type SvelteComponent } from 'svelte'
	import { slide } from 'svelte/transition'
	import { mdiEyeOffOutline, mdiEyeOutline } from '@mdi/js'
	import { Card } from '$lib/ui/card/index.js'
	import { Table } from '$lib/ui/table/index.js'
	import { Icon } from '$lib/ui/icon/index.js'

	export let name = ''
	export let description = ''
	export let component: SvelteComponent

	type Props = { id: string; value: string }[]
	let props: Props = []
	let isPropsVisible = false

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

<Card class="mx-auto mb-6 max-w-4xl">
	<div slot="title" class="flex items-center gap-4">
		<span class="grow">{name}</span>
		<button class="btn btn-square btn-sm" on:click={() => (isPropsVisible = !isPropsVisible)}>
			<Icon
				size={20}
				title="Affichage des props"
				path={isPropsVisible ? mdiEyeOutline : mdiEyeOffOutline}
			/>
		</button>
	</div>

	<svelte:fragment slot="subtitle">{description}</svelte:fragment>

	<slot />

	{#if isPropsVisible}
		<div transition:slide class="pt-6">
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
			/>
		</div>
	{/if}
</Card>
