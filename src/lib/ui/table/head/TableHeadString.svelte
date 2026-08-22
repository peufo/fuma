<script lang="ts" generics="Item extends ItemBase">
	import { SearchIcon } from '@lucide/svelte'
	import { page } from '$app/state'
	import { Popover } from '$lib/popover/index.js'
	import type { ItemBase, TableField } from '$lib/ui/table/index.js'

	let { field }: { field: TableField<Item> } = $props()

	let searchValue = $derived(page.url.searchParams.get(field.key) || '')
</script>

<th class="p-1">
	<Popover class="p-1">
		{#snippet trigger(popover)}
			<button class="menu-item min-h-8 w-full flex-wrap gap-y-1" {...popover.trigger}>
				<div class="flex items-center gap-2">
					<span>{field.label}</span>
					{#if !searchValue}
						<SearchIcon size={15} class="opacity-50" />
					{/if}
				</div>

				{#if searchValue}
					<span class="badge badge-xs text-[0.7rem] font-normal text-white badge-primary">
						<SearchIcon size={10} class="-translate-x-1 text-white/80" />
						<span>{searchValue}</span>
					</span>
				{/if}
			</button>
		{/snippet}

		{#snippet children(popover)}
			<!-- `autofocus`: le popover natif donne le focus à cet élément à l'ouverture. -->
			<!-- svelte-ignore a11y_autofocus -->
			<input
				name={field.key}
				type="search"
				class="m-1"
				value={searchValue}
				autofocus
				onfocus={(e) => e.currentTarget.select()}
				onkeydown={(e) => e.key === 'Enter' && popover.hide()}
			/>
		{/snippet}
	</Popover>
</th>
