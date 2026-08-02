<script lang="ts" generics="Item extends ItemBase">
	import { type Snippet, untrack } from 'svelte'
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

	// Posé à l'initialisation et non dans un `$effect`: un effet ne tourne pas au rendu
	// serveur, et `TableFieldsEdition` lirait un contexte vide. `key` identifie la table
	// pour toute sa durée de vie.
	const tableKey = untrack(() => key)
	context.set(tableKey, createKeys(tableKey))

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
