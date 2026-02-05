<script lang="ts">
	import { ArrowDownNarrowWideIcon, ArrowDownWideNarrowIcon, type IconProps } from '@lucide/svelte'
	import type { Component } from 'svelte'

	type Order = 'asc' | 'desc' | undefined
	let {
		order = $bindable(),
		IconAsc = ArrowDownNarrowWideIcon,
		IconDesc = ArrowDownWideNarrowIcon,
		onChange
	}: {
		order: Order
		IconAsc?: Component<IconProps>
		IconDesc?: Component<IconProps>
		onChange?: (order: Order) => void
	} = $props()

	const handleOrderClick = (orderBy: 'asc' | 'desc') => () => {
		if (order === orderBy) order = undefined
		else order = orderBy
		onChange?.(order)
	}
</script>

<div class="p-1 pt-2">
	<span class="text-sm font-semibold opacity-70">Ordre:</span>
	<div class="grid grid-cols-2 gap-2 pt-2">
		<button
			class="btn ring-primary"
			class:ring-2={order === 'asc'}
			onclick={handleOrderClick('asc')}
		>
			<IconAsc />
			<span>Ascendant</span>
		</button>
		<button
			class="btn ring-primary"
			class:ring-2={order === 'desc'}
			onclick={handleOrderClick('desc')}
		>
			<IconDesc />
			<span>Descendant</span>
		</button>
	</div>
</div>
