<script lang="ts" generics="Item extends ItemBase">
	import type { ItemBase, TableField } from '$lib/ui/table/index.js'
	import { tip } from '$lib/action/tip.js'
	let { field }: { field: TableField<Item> } = $props()
</script>

<th use:tip={{ disable: !field.hint, content: field.hint }}>
	{field.label}
</th>
