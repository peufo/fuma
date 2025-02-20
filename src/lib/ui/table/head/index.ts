import type { ComponentProps, ComponentType } from 'svelte'

import type { ComponentAndProps } from '$lib/utils/component.js'
import type { ItemBase, TableField, TableFieldType } from '$lib/ui/table/field.js'
import { default as TableHeadSelect } from './TableHeadSelect.svelte'
import { default as TableHeadDate } from './TableHeadDate.svelte'
import { default as TableHeadBoolean } from './TableHeadBoolean.svelte'
import { default as TableHeadNumber } from './TableHeadNumber.svelte'
import { default as TableHeadString } from './TableHeadString.svelte'

const tableHeadComponentRecord = {
	boolean: TableHeadBoolean,
	string: TableHeadString,
	textarea: TableHeadString,
	number: TableHeadNumber,
	multiselect: TableHeadSelect,
	select: TableHeadSelect,
	date: TableHeadDate
} satisfies Record<TableFieldType, ComponentType>

export function tableHeadComponent<T extends TableFieldType>(
	type: T,
	props: Omit<ComponentProps<InstanceType<(typeof tableHeadComponentRecord)[T]>>, 'field'>
): <Item extends ItemBase>(field: TableField<Item>) => ComponentAndProps {
	return (field) => {
		const component = tableHeadComponentRecord[type]
		if (type !== 'multiselect') return { component, props: { ...props, field } }
		return { component, props: { ...props, field, multiSelect: true } }
	}
}
