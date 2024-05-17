<script lang="ts" context="module">
	import { createEventEmitter } from '$lib/utils/eventEmitter.js'
	import { onMount } from 'svelte'
	type Item = { name: string }
	const eventEmitter = createEventEmitter<{ new_item: Item }>()
</script>

<script lang="ts">
	let items: Item[] = []
	let value = ''

	onMount(() =>
		eventEmitter.on('new_item', (item) => {
			items = [...items, item]
		})
	)
</script>

<div class="flex flex-col gap-2">
	<form
		class="flex gap-2 rounded-lg border"
		on:submit={() => {
			eventEmitter.emit('new_item', { name: value })
			value = ''
		}}
	>
		<input type="text" bind:value class="rounded-lg" />
		<button class="btn"> Emit value </button>
	</form>

	<ul>
		{#each items as item}
			<li>{item.name}</li>
		{/each}
	</ul>
</div>
