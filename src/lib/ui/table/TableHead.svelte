<script lang="ts" generics="Item extends {id: string}">
	import { component, type ComponentAndProps } from '$lib/utils/component.js'
	import { type TableField, TableFieldsEdition } from '$lib/ui/table/index.js'
	import { tableHeadComponent } from '$lib/ui/table/head/index.js'
	import TableHeadDefault from './head/TableHeadDefault.svelte'

	export let fields: TableField<Item>[]
	export let key: string
	export let onCreateField: (() => void) | undefined = undefined

	function getComponent(field: TableField): ComponentAndProps {
		if (field.type === 'select' || field.type === 'multiselect')
			return tableHeadComponent(field.type, { options: field.options || [] })(field)
		if (field.type) return tableHeadComponent(field.type, {})(field)
		if (!field.head) return component(TableHeadDefault, { field })
		if (typeof field.head === 'function') return field.head(field)
		if (typeof field.head === 'string') return tableHeadComponent(field.head, {})(field)
		return field.head
	}
</script>

<thead>
	<tr class="shadow">
		{#each fields.filter((f) => f.$visible) as field (field.key)}
			{@const { component, props } = getComponent(field)}
			<svelte:component this={component} {...props} />
		{/each}
		<TableFieldsEdition {fields} {key} {onCreateField} />
	</tr>
</thead>
