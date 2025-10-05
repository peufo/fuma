<script lang="ts" generics="Item extends ItemBase">
	import { TableCell, type ItemBase, type TableField } from '$lib/ui/table/index.js'
	import type { Snippet } from 'svelte'

	let {
		items,
		fields,
		actions,
		classRow,
		onclick
	}: {
		items: Item[]
		fields: TableField<Item>[]
		actions?: Snippet<[item: Item]>
		classRow?: string
		onclick?: (item?: Item) => void
	} = $props()

	let fieldsVisible = $derived(fields.filter((f) => f._visible))
</script>

<tbody>
	{#each items as item (item.id)}
		<tr class={classRow} onclick={() => onclick?.(item)}>
			{#each fieldsVisible as field (field.key)}
				<TableCell {item} {field} />
			{/each}
			<td align="right">
				{#if actions}
					{@render actions(item)}
				{/if}
			</td>
		</tr>
	{/each}
</tbody>
