<script lang="ts" generics="Item extends ItemBase">
	import { ArrowDownNarrowWideIcon, ArrowDownWideNarrowIcon, FunnelIcon } from '@lucide/svelte'
	import debounce from 'debounce'
	import z from 'zod'
	import { goto } from '$app/navigation'
	import { page } from '$app/state'
	import { Popover } from '$lib/popover/index.js'
	import { urlParam } from '$lib/state/param.js'
	import { zodCoerceJsonRecord } from '$lib/validation/zod.js'
	import type { ItemBase, TableField } from '../field.js'
	import OrderButtons from './OrderButtons.svelte'

	let { field }: { field: TableField<Item> } = $props()

	const paramModel = zodCoerceJsonRecord
		.pipe(
			z.object({
				min: z.number().optional(),
				max: z.number().optional(),
				order: z.enum(['asc', 'desc']).optional()
			})
		)
		.default({})

	// `?? undefined`: `searchParams.get` rend `null` quand le filtre est absent, et un
	// `.default()` de zod ne couvre que `undefined`.
	let { min, max, order } = $derived(
		paramModel.parse(page.url.searchParams.get(field.key) ?? undefined)
	)

	const updateUrl = debounce(() => {
		const query: Record<string, string | number> = {}
		if (order) query.order = order
		if (min !== undefined) query.min = min
		if (max !== undefined) query.max = max
		if (!Object.keys(query).length) return resetFilter()
		goto(urlParam.with({ [field.key]: JSON.stringify(query) }, 'skip', 'take'), {
			noScroll: true,
			keepFocus: true
		})
	}, 250)

	function resetFilter() {
		return goto(urlParam.without(field.key, 'skip', 'take'), {
			replaceState: true,
			noScroll: true,
			keepFocus: true
		})
	}
</script>

<th class="p-1">
	<Popover class="p-1">
		{#snippet trigger(popover)}
			<button class="menu-item min-h-8 w-full flex-wrap gap-y-1" {...popover.trigger}>
				<div class="flex gap-2">
					<span>{field.label}</span>
					{#if min === undefined && max === undefined}
						<FunnelIcon size={15} class="opacity-50" />
					{/if}
				</div>

				{#if min !== undefined || max !== undefined}
					<span class="badge badge-xs text-[0.7rem] font-normal text-white badge-primary">
						{#if min !== undefined}
							{min} ≤
						{/if}
						x
						{#if max !== undefined}
							≤ {max}
						{/if}
					</span>
				{/if}
				{#if order === 'asc'}
					<ArrowDownNarrowWideIcon size={18} class="fill-primary" />
				{:else if order === 'desc'}
					<ArrowDownWideNarrowIcon size={18} class="fill-primary" />
				{/if}
			</button>
		{/snippet}

		{#snippet children(popover)}
			{#if field.sortable !== false}
				<OrderButtons
					bind:order
					onChange={() => {
						updateUrl()
						popover.hide()
					}}
				/>
				<div class="divider"></div>
				<span class="p-1 py-1 text-sm font-semibold opacity-70">Filtre:</span>
			{/if}
			<form
				class="grid grid-cols-2 gap-2 p-1"
				onsubmit={(e) => {
					e.preventDefault()
					popover.hide()
				}}
			>
				<!-- `autofocus`: le popover natif donne le focus à cet élément à l'ouverture. -->
				<!-- svelte-ignore a11y_autofocus -->
				<input
					bind:value={min}
					oninput={updateUrl}
					placeholder="Min"
					autofocus
					onfocus={(e) => e.currentTarget.select()}
				/>
				<input bind:value={max} oninput={updateUrl} placeholder="Max" />

				<div class="col-span-full flex justify-end gap-2">
					<button
						class="btn btn-ghost"
						type="button"
						onclick={() => {
							min = undefined
							max = undefined
							popover.hide()
							resetFilter()
						}}
					>
						Effacer
					</button>
					<button class="btn">Ok</button>
				</div>
			</form>
		{/snippet}
	</Popover>
</th>
