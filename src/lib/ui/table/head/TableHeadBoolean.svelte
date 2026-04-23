<script lang="ts" generics="Item extends ItemBase">
	import { CheckIcon, XIcon } from '@lucide/svelte'
	import type { ItemBase, TableField } from '$lib/ui/table/index.js'
	import TableHeadSelect from './TableHeadSelect.svelte'

	export let field: TableField<Item>
</script>

<TableHeadSelect
	{field}
	options={[
		{ value: 'true', label: 'Oui', icon: CheckIcon },
		{ value: 'false', label: 'Non', icon: XIcon }
	]}
/>
