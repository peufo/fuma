<script lang="ts" generics="Item extends ItemBase">
	import {
		TableCellArray,
		TableCellBoolean,
		TableCellNumber,
		TableCellString
	} from '$lib/ui/table/cell/index.js'
	import type { ItemBase, TableField } from '$lib/ui/table/index.js'
	import TableCellDate from './cell/TableCellDate.svelte'

	let { item, field }: { item: Item; field: TableField<Item> } = $props()

	let cell = $derived(field.cell(item))
</script>

{#if Array.isArray(cell)}
	<TableCellArray {cell} />
{:else if typeof cell === 'number'}
	<TableCellNumber {cell} />
{:else if typeof cell === 'boolean'}
	<TableCellBoolean {cell} />
{:else if typeof cell === 'string'}
	<TableCellString {cell} />
{:else if cell instanceof Date}
	<TableCellDate {cell} />
{:else if cell === undefined || cell === null}
	<td>-</td>
{:else}
	<td>
		{@render cell(item)}
	</td>
{/if}
