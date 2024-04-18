<script lang="ts">
	import { type SvelteComponent } from 'svelte'
	import { Card } from './index.js'

	export let name = ''
	export let description = ''
	export let component: SvelteComponent

	type Props = { name: string; value: unknown }[]
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
		props = propsIndex.map(([name, index]) => ({
			name,
			value: ctx[index]
		}))
	}
</script>

<Card class="mx-auto mt-6 max-w-4xl">
	<svelte:fragment slot="title">{name}</svelte:fragment>
	<svelte:fragment slot="subtitle">{description}</svelte:fragment>

	<slot />

	<div class="my-10" />

	<table>
		<thead>
			<tr>
				<th>Props</th>
				<th>Type</th>
				<th>Value</th>
			</tr>
		</thead>
		<tbody>
			{#each props as { name, value }}
				<tr>
					<td>{name}</td>
					<td>{typeof value}</td>
					<td>{value}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</Card>
