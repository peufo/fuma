<script lang="ts" generics="Item extends ItemBase">
	import { mdiMagnify } from '@mdi/js'
	import { page } from '$app/state'

	import { DropDown } from '$lib/ui/menu/index.js'
	import { Icon } from '$lib/ui/icon/index.js'
	import { InputSearch } from '$lib/ui/input/index.js'
	import type { ItemBase, TableField } from '$lib/ui/table/index.js'
	import { goto } from '$app/navigation'
	import { urlParam } from '$lib/store/param.js'
	let { field }: { field: TableField<Item> } = $props()

	let searchValue = $derived(page.url.searchParams.get(field.key) || '')
</script>

<th class="p-1">
	<DropDown
		let:tip
		hideOnBlur
		hideOnNav={false}
		autofocus
		tippyProps={{ appendTo: () => document.body }}
	>
		<button slot="activator" class="menu-item min-h-8 w-full flex-wrap gap-y-1">
			<div class="flex items-center gap-2">
				<span>{field.label}</span>
				{#if !searchValue}
					<Icon path={mdiMagnify} size={15} class="opacity-50" />
				{/if}
			</div>

			{#if searchValue}
				<span class="badge badge-primary badge-xs text-[0.7rem] font-normal text-white">
					<Icon path={mdiMagnify} size={10} class="-translate-x-1 fill-white/80" />
					<span>{searchValue}</span>
				</span>
			{/if}
		</button>

		<InputSearch
			class="m-1"
			key={field.key}
			value={searchValue}
			onkeydown={(e) => e.key === 'Enter' && tip?.hide()}
			onclear={() => goto($urlParam.without(field.key))}
		/>
	</DropDown>
</th>
