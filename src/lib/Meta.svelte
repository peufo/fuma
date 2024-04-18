<script lang="ts">
	import { type SvelteComponent } from 'svelte'
	import { Card } from './index.js'

	export let name = ''
	export let component: SvelteComponent

	type Props = { name: string; value: unknown }[]
	let props: Props = []

	$: initMeta(component)

	function initMeta(c: SvelteComponent | undefined) {
		if (!c) return
		props = getProps(c)
		component.$$.after_update.push(() => (props = getProps(c)))
	}

	function getProps(c: SvelteComponent): Props {
		const { ctx, props: propsIndex } = component?.$$ || { ctx: [], props: {} }
		return Object.entries(propsIndex as Record<string, number>).map(([name, index]) => ({
			name,
			value: ctx[index]
		}))
	}
</script>

<Card class="mx-auto max-w-4xl">
	<svelte:fragment slot="title">{name}</svelte:fragment>

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
					<td>{JSON.stringify(value)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</Card>
