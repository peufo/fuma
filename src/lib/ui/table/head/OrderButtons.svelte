<script lang="ts">
	import { Icon } from '$lib/ui/icon/index.js'
	import { mdiSortAscending, mdiSortDescending } from '@mdi/js'
	import { createEventDispatcher } from 'svelte'

	type Order = 'asc' | 'desc' | undefined
	export let order: Order
	export let iconAsc = mdiSortAscending
	export let iconDesc = mdiSortDescending

	const dispatch = createEventDispatcher<{ change: Order }>()

	const handleOrderClick = (orderBy: 'asc' | 'desc') => () => {
		if (order === orderBy) order = undefined
		else order = orderBy
		dispatch('change', order)
	}
</script>

<div class="p-1 pt-2">
	<span class="text-sm font-semibold opacity-70">Ordre:</span>
	<div class="grid grid-cols-2 gap-2 pt-2">
		<button
			class="btn ring-primary"
			class:ring-2={order === 'asc'}
			on:click={handleOrderClick('asc')}
		>
			<Icon path={iconAsc} />
			<span>Ascendant</span>
		</button>
		<button
			class="btn ring-primary"
			class:ring-2={order === 'desc'}
			on:click={handleOrderClick('desc')}
		>
			<Icon path={iconDesc} />
			<span>Descendant</span>
		</button>
	</div>
</div>
