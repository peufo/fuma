<script lang="ts" generics="Item extends ItemBase">
	import type { Snippet } from 'svelte'
	import { afterNavigate } from '$app/navigation'
	import {
		context,
		createKeys,
		type ItemBase,
		syncFieldsWithParams,
		TableBody,
		type TableField,
		TableHead
	} from '$lib/ui/table/index.js'

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
		actions?: Snippet<[Item]>
		placholder?: string
		class?: string
		classRow?: string
		hideBody?: boolean
		onCreateField?: () => void
		onclick?: (item?: Item) => void
	} = $props()

	$effect(() => {
		const { KEY_FIELDS_VISIBLE, KEY_FIELDS_HIDDEN, KEY_FIELDS_ORDER } = createKeys(key)
		context.set(key, {
			KEY_FIELDS_VISIBLE,
			KEY_FIELDS_HIDDEN,
			KEY_FIELDS_ORDER
		})
	})

	const initFields = () => (fields = syncFieldsWithParams(key, fields))
	initFields()
	afterNavigate(initFields)
</script>

<div class="{klass} overflow-x-auto rounded-lg border bg-base-100" class:min-h-[320px]={!hideBody}>
	<table class="table relative">
		<TableHead {fields} {key} {onCreateField} />
		{#if !hideBody && items.length}
			<TableBody {fields} {items} {actions} {classRow} {onclick} />
		{/if}
	</table>

	{#if hideBody && !items.length}
		{placholder}
	{/if}
</div>
