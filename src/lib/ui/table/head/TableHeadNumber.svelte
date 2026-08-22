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

	// `.catch`: le paramètre vient de l'URL, donc de l'utilisateur. Un contenu illisible retombe
	// sur un filtre vide au lieu de faire échouer le rendu de toute la table.
	const paramModel = zodCoerceJsonRecord
		.pipe(
			z.object({
				min: z.number().optional(),
				max: z.number().optional(),
				order: z.enum(['asc', 'desc']).optional()
			})
		)
		.default({})
		.catch({})

	// `?? undefined`: `searchParams.get` rend `null` quand le filtre est absent, et un
	// `.default()` de zod ne couvre que `undefined`.
	let { min, max, order } = $derived(
		paramModel.parse(page.url.searchParams.get(field.key) ?? undefined)
	)

	/** Un `<input type="number">` vidé lie `null`: une borne effacée, pas une borne à zéro. */
	function isSet(bound: number | null | undefined): bound is number {
		return bound !== null && bound !== undefined
	}

	const updateUrl = debounce(() => {
		const query: Record<string, string | number> = {}
		if (order) query.order = order
		if (isSet(min)) query.min = min
		if (isSet(max)) query.max = max
		if (!Object.keys(query).length) return resetFilter()
		goto(urlParam.with({ [field.key]: JSON.stringify(query) }, 'skip', 'take'), {
			noScroll: true,
			keepFocus: true
		})
	}, 250)

	function resetFilter() {
		// Une frappe encore en attente réécrirait le filtre qu'on vient d'effacer.
		updateUrl.clear()
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
				<div class="flex items-center gap-2">
					<span>{field.label}</span>
					{#if !isSet(min) && !isSet(max)}
						<FunnelIcon size={15} class="opacity-50" />
					{/if}
				</div>

				{#if isSet(min) || isSet(max)}
					<span class="badge badge-xs text-[0.7rem] font-normal text-white badge-primary">
						{#if isSet(min)}
							{min} ≤
						{/if}
						x
						{#if isSet(max)}
							≤ {max}
						{/if}
					</span>
				{/if}
				{#if order === 'asc'}
					<ArrowDownNarrowWideIcon size={18} class="text-primary" />
				{:else if order === 'desc'}
					<ArrowDownWideNarrowIcon size={18} class="text-primary" />
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
					// Fermer sans purger la temporisation perdrait la dernière frappe.
					updateUrl.flush()
					popover.hide()
				}}
			>
				<!-- `type="number"`: sans lui `bind:value` lie une chaîne, que ni le paramètre
				     d'URL ni le filtre serveur ne savent relire. -->
				<!-- `autofocus`: le popover natif donne le focus à cet élément à l'ouverture. -->
				<!-- svelte-ignore a11y_autofocus -->
				<input
					bind:value={min}
					oninput={updateUrl}
					type="number"
					class="input w-full"
					placeholder="Min"
					aria-label="Minimum"
					autofocus
					onfocus={(e) => e.currentTarget.select()}
				/>
				<input
					bind:value={max}
					oninput={updateUrl}
					type="number"
					class="input w-full"
					placeholder="Max"
					aria-label="Maximum"
				/>

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
