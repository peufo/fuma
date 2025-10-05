<script lang="ts" generics="Item extends ItemBase">
	import type { ItemBase, TableField } from '$lib/ui/table/index.js'

	let { cell, field }: { cell: string; field: TableField<Item> } = $props()
</script>

<td data-field-key={field.key} data-field-type={field.type === 'textarea' ? 'textarea' : 'string'}>
	<!-- TODO: Sanitize -->
	<span>{@html cell}</span>
</td>
