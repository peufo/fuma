<script lang="ts" generics="Item extends ItemBase">
	import { maxHeightScreen } from '$lib/action/maxHeightScreen.js'
	import { TableCell, type ItemBase, type TableField } from '$lib/ui/table/index.js'
	import type { Snippet } from 'svelte'

	let {
		items,
		fields,
		actions,
		classRow,
		onclick,
		screenPadding
	}: {
		items: Item[]
		fields: TableField<Item>[]
		actions?: Snippet<[item: Item]>
		classRow?: string
		onclick?: (item?: Item) => void
		screenPadding?: number
	} = $props()

	let fieldsVisible = $derived(fields.filter((f) => f._visible))
</script>

<tbody use:maxHeightScreen={{ padding: screenPadding }}>
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
