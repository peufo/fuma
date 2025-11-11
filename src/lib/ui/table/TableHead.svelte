<script lang="ts" generics="Item extends ItemBase">
	import { type ItemBase, type TableField, TableFieldsEdition } from '$lib/ui/table/index.js'
	import {
		TableHeadBoolean,
		TableHeadDate,
		TableHeadDefault,
		TableHeadNumber,
		TableHeadSelect,
		TableHeadString
	} from './head/index.js'

	let {
		fields,
		key,
		onCreateField
	}: {
		fields: TableField<Item>[]
		key: string
		onCreateField?: () => void
	} = $props()
</script>

<thead class="bg-base-100 sticky top-0 z-10">
	<tr class="shadow">
		{#each fields.filter((f) => f._visible) as field (field.key)}
			{#if !field.type}
				<TableHeadDefault {field} />
			{:else if field.type === 'string' || field.type === 'textarea'}
				<TableHeadString {field} />
			{:else if field.type === 'number'}
				<TableHeadNumber {field} />
			{:else if field.type === 'boolean'}
				<TableHeadBoolean {field} />
			{:else if field.type === 'date'}
				<TableHeadDate {field} />
			{:else if field.options}
				<TableHeadSelect {field} options={field.options} />
			{/if}
		{/each}
		<TableFieldsEdition {fields} {key} {onCreateField} />
	</tr>
</thead>
