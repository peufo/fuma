import { page } from '$app/state'
import { jsonParse } from '$lib/utils/jsonParse.js'
import type { Options } from '$lib/utils/options.js'
import { createKeys } from './context.js'
import type { SnippetLike } from './type.js'

export type Primitive = string | number | boolean | Date

export type ItemBase = { id: string | number }

export type TableField<Item extends ItemBase> =
	| (TableFieldCommon<Item> & TableFieldPrimitve)
	| (TableFieldCommon<Item> & TableFieldSelect)

type TableFieldCommon<Item extends ItemBase> = {
	key: string
	label: string
	options?: Options
	hint?: string
	locked?: boolean
	visible?: boolean
	sortable?: boolean
	/** Internal usage */
	_visible?: boolean
	cell:
		| ((item: Item) => SnippetLike<[Item]>)
		| ((item: Item) => null | undefined | Primitive | Primitive[])
	head?: SnippetLike<[Item]>
}

type TableFieldPrimitve = {
	type?: 'string' | 'textarea' | 'number' | 'boolean' | 'date'
}

type TableFieldSelect = {
	type: 'select' | 'multiselect'
	options: Options
}

/**
 * Initialise fields from url query
 */
export function syncFieldsWithParams<Item extends ItemBase>(
	tablekey: string,
	fields: TableField<Item>[]
) {
	const { KEY_FIELDS_VISIBLE, KEY_FIELDS_HIDDEN, KEY_FIELDS_ORDER } = createKeys(tablekey)
	const getParam = (key: string) => page.url.searchParams.get(key)
	const fieldsVisible = jsonParse<string[]>(getParam(KEY_FIELDS_VISIBLE), [])
	const fieldsHidden = jsonParse<string[]>(getParam(KEY_FIELDS_HIDDEN), [])
	const fieldsOrder = jsonParse(getParam(KEY_FIELDS_ORDER), [])

	// Init correct visible prop
	const _fields = fields.map((field) => ({
		...field,
		_visible:
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
