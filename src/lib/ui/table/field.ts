import { page } from '$app/stores'
import { get } from 'svelte/store'
import type { ComponentAndProps, Primitive } from '$lib/utils/component.js'
import { jsonParse } from '$lib/utils/jsonParse.js'
import type { Options } from '$lib/utils/options.js'
import { createKeys } from './context.js'

export type TableFieldType =
	| 'string'
	| 'textarea'
	| 'number'
	| 'boolean'
	| 'select'
	| 'multiselect'
	| 'date'

export type TableField<Item = any> = TableFieldCommon &
	(
		| TableFieldUntyped<Item>
		| TableFieldPrimitive<Item>
		| TableFieldSelect<Item>
		| TableFieldMultiselect<Item>
	)

type TableFieldCommon = {
	key: string
	label: string
	type?: TableFieldType
	options?: Options
	hint?: string
	locked?: boolean
	visible?: boolean
	/** Internal usage */
	$visible?: boolean
}

type TableFieldUntyped<Item = any> = {
	getCell: (
		item: Item
	) => ComponentAndProps[] | ComponentAndProps | Primitive[] | Primitive | undefined | null
	head?: ComponentAndProps | ((field: TableField) => ComponentAndProps)
}

type TableFieldPrimitive<Item = any> = {
	type: Exclude<TableFieldType, 'select' | 'multiselect'>
	getCell: (item: Item) => ComponentAndProps[] | ComponentAndProps | Primitive | undefined | null
}

type TableFieldSelect<Item = any> = {
	type: 'select'
	getCell: (item: Item) => Primitive | undefined | null
	options: Options
}
type TableFieldMultiselect<Item = any> = {
	type: 'multiselect'
	getCell: (item: Item) => Primitive[] | undefined | null
	options: Options
}

/**
 * Initialise fields from url query
 */
export function syncFieldsWithParams(tablekey: string, fields: TableField[]) {
	const { KEY_FIELDS_VISIBLE, KEY_FIELDS_HIDDEN, KEY_FIELDS_ORDER } = createKeys(tablekey)
	const {
		url: { searchParams }
	} = get(page)

	const fieldsVisible = jsonParse<string[]>(searchParams.get(KEY_FIELDS_VISIBLE), [])
	const fieldsHidden = jsonParse<string[]>(searchParams.get(KEY_FIELDS_HIDDEN), [])
	const fieldsOrder = jsonParse(searchParams.get(KEY_FIELDS_ORDER), [])

	// Init correct visible prop
	const _fields = fields.map((field) => ({
		...field,
		$visible:
			field.locked ||
			(field.visible ? !fieldsHidden.includes(field.key) : fieldsVisible.includes(field.key))
	}))

	// Init correct order fields
	if (fieldsOrder.length === fields.length) {
		return _fields.map((f, index, self) => {
			const key = fieldsOrder[index]
			const field = self.find((_) => _.key === key)
			return field ? field : f
		})
	}

	return _fields
}
