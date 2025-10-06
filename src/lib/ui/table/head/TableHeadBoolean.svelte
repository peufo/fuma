<script lang="ts" generics="Item extends ItemBase">
	import { mdiCheck, mdiClose } from '@mdi/js'
	import type { ItemBase, TableField } from '$lib/ui/table/index.js'
	import TableHeadSelect from './TableHeadSelect.svelte'

	export let field: TableField<Item>
</script>

<TableHeadSelect
	{field}
	options={[
		{ value: 'true', label: 'Oui', icon: mdiCheck },
		{ value: 'false', label: 'Non', icon: mdiClose }
	]}
/>
