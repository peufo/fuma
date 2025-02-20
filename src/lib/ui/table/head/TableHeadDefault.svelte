<script lang="ts" generics="Item extends {id: string}">
	import type { TableField } from '$lib/ui/table/index.js'
	import { tip } from '$lib/action/tip.js'

	export let field: TableField<Item>
</script>

<th use:tip={{ disable: !field.hint, content: field.hint }}>
	{field.label}
</th>
