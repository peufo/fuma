<script lang="ts" generics="Item extends ItemBase">
	import { afterNavigate } from '$app/navigation'
	import { Placeholder } from '$lib/ui/placeholder/index.js'

	import {
		type TableField,
		type ItemBase,
		TableHead,
		TableBody,
		context,
		createKeys,
		syncFieldsWithParams
	} from '$lib/ui/table/index.js'
	import type { SnippetLike } from './type.js'

	let {
		key = 'table',
		fields,
		items,
		actions,
		placholder = 'placholder',
		class: klass,
		classRow,
		hideBody = false,
		onCreateField,
		onclick
	}: {
		key?: string
		fields: TableField<Item>[]
		items: Item[]
		actions?: SnippetLike<[Item]>
		placholder?: string
		class?: string
		classRow?: string
		hideBody?: boolean
		onCreateField?: () => void
		onclick?: (item?: Item) => void
	} = $props()

	const { KEY_FIELDS_VISIBLE, KEY_FIELDS_HIDDEN, KEY_FIELDS_ORDER } = createKeys(key)
	context.set(key, {
		KEY_FIELDS_VISIBLE,
		KEY_FIELDS_HIDDEN,
		KEY_FIELDS_ORDER
	})

	const initFields = () => (fields = syncFieldsWithParams(key, fields))
	initFields()
	afterNavigate(initFields)
</script>

<div class="{klass} bg-base-100 overflow-x-auto rounded-lg border" class:min-h-[320px]={!hideBody}>
	<table class="relative table">
		<TableHead {fields} {key} {onCreateField} />
		{#if !hideBody && items.length}
			<TableBody {fields} {items} {actions} {classRow} {onclick} />
		{/if}
	</table>

	{#if hideBody && !items.length}
		<Placeholder class="rounded-t-none">
			{placholder}
		</Placeholder>
	{/if}
</div>
