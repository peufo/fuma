<script lang="ts">
	import { ArrowDownNarrowWideIcon, ArrowDownWideNarrowIcon, type IconProps } from '@lucide/svelte'
	import type { Component } from 'svelte'

	type Order = 'asc' | 'desc' | undefined
	let {
		order = $bindable(),
		IconAsc = ArrowDownNarrowWideIcon,
		IconDesc = ArrowDownWideNarrowIcon,
		labelAsc = 'Ascendant',
		labelDesc = 'Descendant',
		onChange
	}: {
		order: Order
		IconAsc?: Component<IconProps>
		IconDesc?: Component<IconProps>
		labelAsc?: string
		labelDesc?: string
		onChange?: (order: Order) => void
	} = $props()

	const handleOrderClick = (orderBy: 'asc' | 'desc') => () => {
		if (order === orderBy) order = undefined
		else order = orderBy
		onChange?.(order)
	}
</script>

<div class="m-2 grid grid-cols-2 gap-1">
	<button
		class="btn ring-primary btn-sm"
		class:ring-2={order === 'asc'}
		onclick={handleOrderClick('asc')}
	>
		<IconAsc size={16} />
		<span>{labelAsc}</span>
	</button>
	<button
		class="btn ring-primary btn-sm"
		class:ring-2={order === 'desc'}
		onclick={handleOrderClick('desc')}
	>
		<IconDesc size={16} />
		<span>{labelDesc}</span>
	</button>
</div>
