<script lang="ts" generics="Item extends ItemBase">
	import { ArrowDownNarrowWideIcon, ArrowDownWideNarrowIcon, FunnelIcon } from '@lucide/svelte';
	import debounce from 'debounce';
	import z from 'zod';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { urlParam } from '$lib/state/param.svelte.ts';
	import { DropDown } from '$lib/ui/menu/index.js';
	import { zodCoerceJsonRecord } from '$lib/validation/zod.js';
	import type { ItemBase, TableField } from '../field.js';
	import OrderButtons from './OrderButtons.svelte';

	let { field }: { field: TableField<Item> } = $props();

	const paramModel = zodCoerceJsonRecord
		.pipe(
			z.object({
				min: z.number().optional(),
				max: z.number().optional(),
				order: z.enum(['asc', 'desc']).optional()
			})
		)
		.default({});

	let { min, max, order } = $derived(paramModel.parse(page.url.searchParams.get(field.key)));
	let isNegatifRange = $derived(min !== undefined && max !== undefined && max < min);

	const updateUrl = debounce(() => {
		const query: Record<string, string | number> = {};
		if (order) query.order = order;
		if (min !== undefined) query.min = min;
		if (max !== undefined) query.max = max;
		if (!Object.keys(query).length) return resetFilter();
		goto(urlParam.with({ [field.key]: JSON.stringify(query) }, 'skip', 'take'), {
			noScroll: true,
			keepFocus: true
		});
	}, 250);

	function resetFilter() {
		return goto(urlParam.without(field.key, 'skip', 'take'), {
			replaceState: true,
			noScroll: true,
			keepFocus: true
		});
	}
</script>

<th class="p-1">
	<DropDown hideOnBlur hideOnNav={false} autofocus tippyProps={{ appendTo: () => document.body }}>
		{#snippet activator()}
			<button class="menu-item min-h-8 w-full flex-wrap gap-y-1">
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

		{#snippet children({ tip })}
			{#if field.sortable !== false}
				<OrderButtons
					bind:order
					onChange={() => {
						updateUrl();
						tip?.hide();
					}}
				/>
				<div class="divider"></div>
				<span class="p-1 py-1 text-sm font-semibold opacity-70">Filtre:</span>
			{/if}
			<form
				class="grid grid-cols-2 gap-2 p-1"
				onsubmit={(e) => {
					e.preventDefault();
					tip?.hide();
				}}
			>
				<input bind:value={min} oninput={updateUrl} placeholder="Min" />
				<input bind:value={max} oninput={updateUrl} placeholder="Max" />

				<div class="col-span-full flex justify-end gap-2">
					<button
						class="btn btn-ghost"
						type="button"
						onclick={() => {
							min = undefined;
							max = undefined;
							tip?.hide();
							resetFilter();
						}}
					>
						Effacer
					</button>
					<button class="btn">Ok</button>
				</div>
			</form>
		{/snippet}
	</DropDown>
</th>
