<script lang="ts">
	import { mdiDrag } from '@mdi/js'
	import { listEditable } from '$lib/index.js'
	import Icon from '$lib/ui/icon/Icon.svelte'

	let items = Array(16)
		.fill(0)
		.map((v, i) => ({
			label: `Item ${i}`,
			color: `rgb(${255 - i * 2}, ${255 - i * 5}, ${255 - i * 10})`,
			key: i
		}))

	let isDragged = false
</script>

<div class="mt-10 flex items-start justify-evenly gap-4">
	<div>
		<span>isDragged: {isDragged}</span>
	</div>

	<ul
		class="min-w-40 overflow-scroll rounded border p-1"
		use:listEditable={{
			items,
			onChange(newOrder) {
				items = newOrder
			},
			onDragStart() {
				console.log('START')
				isDragged = true
			},
			onDragMove() {
				console.log('MOVE')
			},
			onDragEnd() {
				console.log('END')
				isDragged = false
			}
		}}
	>
		{#each items as item (item.key)}
			<li class="menu-item" style="background: {item.color};">
				{item.label}
			</li>
		{/each}
	</ul>

	<ul
		class="flex h-80 min-w-40 flex-col gap-1 overflow-auto rounded-2xl border p-1"
		use:listEditable={{
			items,
			onChange(newOrder) {
				items = newOrder
			},
			dragElementsSelector: '.drag-button'
		}}
	>
		{#each items as item (item.key)}
			<li class="menu-item" style="background: {item.color};">
				<span>{item.label}</span>
				<Icon path={mdiDrag} class="drag-button btn btn-square btn-ghost btn-sm ml-auto" />
			</li>
		{/each}
	</ul>

	<div class="h-80 overflow-auto">
		<div
			class="flex min-w-40 flex-col gap-1 rounded-2xl border p-1"
			use:listEditable={{
				items,
				onChange(newOrder) {
					items = newOrder
				},
				dragElementsSelector: '.drag-button'
			}}
		>
			{#each items as item (item.key)}
				<li class="menu-item" style="background: {item.color};">
					<span>{item.label}</span>
					<Icon path={mdiDrag} class="drag-button btn btn-square btn-ghost btn-sm ml-auto" />
				</li>
			{/each}
		</div>
	</div>
</div>

<div class="divider"></div>

<table class="table border">
	<thead>
		<tr>
			<th>Label</th>
			<th>Color</th>
			<th>Action</th>
		</tr>
	</thead>

	<tbody
		use:listEditable={{
			items,
			onChange(newOrder) {
				items = newOrder
			},
			dragElementsSelector: '.drag-button'
		}}
	>
		{#each items as item (item.key)}
			<tr style="background: {item.color};">
				<td>{item.label}</td>
				<td>{item.color}</td>
				<td>
					<Icon path={mdiDrag} class="drag-button btn btn-square btn-ghost btn-sm ml-auto" />
				</td>
			</tr>
		{/each}
	</tbody>
</table>
