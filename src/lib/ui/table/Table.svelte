<script lang="ts" generics="Item extends ItemBase">
	import { type Snippet, untrack } from 'svelte'
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

	// Dérivé, et non écrit dans la prop `fields`: Svelte annule l'écriture locale d'une prop
	// non liée dès que le parent en recalcule la valeur. Un parent qui déclare ses colonnes
	// dans un `$derived` les reproduit à chaque rafraîchissement de `load` — celui que
	// déclenche une remote function, sans navigation — et la table repartait alors sans
	// `_visible`, donc sans une seule colonne. `syncFieldsWithParams` lit `page.url`: le
	// dérivé suit aussi les changements de paramètres, ce dont `afterNavigate` se chargeait.
	const fieldsSynced = $derived(syncFieldsWithParams(tableKey, fields))
</script>

<div class="{klass} overflow-x-auto rounded-box border bg-base-100" class:min-h-[320px]={!hideBody}>
	<table class="table relative">
		<TableHead fields={fieldsSynced} {key} {onCreateField} />
		{#if !hideBody && items.length}
			<TableBody fields={fieldsSynced} {items} {actions} {classRow} {onclick} />
		{/if}
	</table>

	{#if hideBody && !items.length}
		{placholder}
	{/if}
</div>
