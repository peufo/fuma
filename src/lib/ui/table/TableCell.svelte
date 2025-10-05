<script lang="ts" generics="Item extends {id: string | number}">
	import {
		TableCellArray,
		TableCellBoolean,
		TableCellNumber,
		TableCellString
	} from '$lib/ui/table/cell/index.js'
	import type { TableField } from '$lib/ui/table/index.js'

	export let item: Item
	export let field: TableField<Item>

	$: value = field.getCell(item)
</script>

{#if Array.isArray(value)}
	<TableCellArray {value} />
{:else if typeof value === 'number'}
	<TableCellNumber {value} />
{:else if typeof value === 'boolean'}
	<TableCellBoolean {value} />
{:else if typeof value === 'string'}
	<TableCellString {value} {field} />
{:else if value === undefined || value === null}
	<td>-</td>
{:else}
	<td>
		<svelte:component this={value.component} {...value.props} />
	</td>
{/if}
