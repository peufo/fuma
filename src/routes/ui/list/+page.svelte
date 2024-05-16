<script lang="ts">
	import { listEditable } from '$lib/index.js'
	import Icon from '$lib/ui/icon/Icon.svelte'
	import { mdiDrag } from '@mdi/js'

	let items = Array(10)
		.fill(0)
		.map((v, i) => `Item ${i}`)
</script>

<div class="flex items-start justify-evenly gap-4">
	<ul
		class="min-w-40 rounded border"
		use:listEditable={{
			items,
			onChange(newOrder) {
				items = newOrder
			}
		}}
	>
		{#each items as item}
			<li class="menu-item">{item}</li>
		{/each}
	</ul>

	<ul
		class="min-w-40 rounded border"
		use:listEditable={{
			items,
			onChange(newOrder) {
				items = newOrder
			},
			dragElementsSelector: '.drag-button'
		}}
	>
		{#each items as item}
			<li class="menu-item">
				<span> {item}</span>
				<Icon path={mdiDrag} class="drag-button btn btn-square btn-ghost btn-sm ml-auto" />
			</li>
		{/each}
	</ul>
</div>
