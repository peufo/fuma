<script lang="ts">
	import { createEventEmitter } from '$lib/utils/eventEmitter.js'

	type Item = { name: string }
	class Foo {
		static eventEmitter = createEventEmitter<{ new_item: Item }>()
		items = $state<Item[]>([])
		value = $state('')
		constructor() {
			Foo.eventEmitter.on('new_item', (item) => {
				this.items = [...this.items, item]
			})
		}
	}

	const foos = $state([new Foo(), new Foo()])
</script>

{#snippet foo(state: Foo)}
	<div class="flex flex-col gap-2">
		<form
			class="flex gap-2 rounded-lg border"
			onsubmit={() => {
				Foo.eventEmitter.emit('new_item', { name: state.value })
				state.value = ''
			}}
		>
			<input type="text" bind:value={state.value} class="w-full rounded-lg px-2" />
			<button class="btn m-1 btn-sm">Emit</button>
		</form>

		<ul class="flex flex-wrap gap-1">
			{#each state.items as item}
				<li class="badge badge-soft">{item.name}</li>
			{/each}
		</ul>
	</div>
{/snippet}

<div class="flex flex-wrap gap-4">
	{#each foos as state}
		{@render foo(state)}
	{/each}
	<div class="flex gap-1">
		<button class="btn" onclick={() => foos.pop()}>Remove</button>
		<button class="btn" onclick={() => foos.push(new Foo())}>Add</button>
	</div>
</div>
