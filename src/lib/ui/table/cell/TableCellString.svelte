<script lang="ts" generics="Item extends {id: string}">
	import type { TableField } from '$lib/ui/table/index.js'

	export let value: string
	export let field: TableField<Item>
</script>

<td data-field-key={field.key} data-field-type={field.type === 'textarea' ? 'textarea' : 'string'}>
	<span>{@html value}</span>
</td>
