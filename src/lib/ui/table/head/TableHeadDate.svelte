<script lang="ts" generics="Item extends ItemBase">
	import { CalendarArrowDownIcon, CalendarArrowUpIcon, CalendarSearchIcon } from '@lucide/svelte'
	import { goto } from '$app/navigation'
	import { page } from '$app/state'
	import { InputDateTime } from '$lib/input/index.js'
	import { Popover, type PopoverType } from '$lib/popover/index.js'
	import { urlParam } from '$lib/state/param.js'
	import { formatRange } from '$lib/ui/range/format.js'
	import { type RangeAsDate, RangePicker } from '$lib/ui/range/index.js'
	import type { ItemBase, TableField } from '$lib/ui/table/index.js'
	import { jsonParse } from '$lib/utils/jsonParse.js'
	import OrderButtons from './OrderButtons.svelte'

	let { field }: { field: Omit<TableField<Item>, 'cell'> } = $props()

	let rangePicker: RangePicker

	let initialValue = jsonParse<{
		start?: string
		end?: string
		order?: 'asc' | 'desc'
	}>(page.url.searchParams.get((() => field.key)()), {})

	let range: RangeAsDate = $state({
		start: initialValue.start ? new Date(initialValue.start) : null,
		end: initialValue.end ? new Date(initialValue.end) : null
	})
	let order = $state(initialValue.order)

	let isValidPeriod = $derived(!!range.start && !!range.end)

	function updateUrl() {
		isValidPeriod = !!range.start && !!range.end
		if (!isValidPeriod && !order) {
			goto(urlParam.without(field.key, 'skip', 'take'), {
				replaceState: true,
				noScroll: true,
				keepFocus: true
			})
			return
		}
		goto(
			urlParam.with(
				{
					[field.key]: JSON.stringify({
						...(isValidPeriod
							? {
									start: range.start?.toJSON(),
									end: range.end?.toJSON()
								}
							: {}),
						...(order ? { order } : {})
					})
				},
				'skip',
				'take'
			),
			{ replaceState: true, noScroll: true, keepFocus: true }
		)
	}

	function handleReset(popover: PopoverType) {
		isValidPeriod = false
		range.start = null
		range = { start: null, end: null }
		popover.hide()
		rangePicker.clear()
		goto(urlParam.without(field.key, 'skip', 'take'), {
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
					{#if !isValidPeriod}
						<CalendarSearchIcon size={15} class="opacity-50" />
					{/if}
				</div>

				{#if isValidPeriod}
					<span class="badge badge-xs text-[0.7rem] font-normal text-white badge-primary">
						{formatRange(range)}
					</span>
				{/if}
				{#if order === 'asc'}
					<CalendarArrowDownIcon size={18} class="fill-primary" />
				{:else if order === 'desc'}
					<CalendarArrowUpIcon size={18} class="fill-primary" />
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
					IconAsc={CalendarArrowDownIcon}
					IconDesc={CalendarArrowUpIcon}
				/>
			{/if}

			<form
				onsubmit={(e) => {
					e.preventDefault()
					popover.hide()
				}}
				data-sveltekit-replacestate
				class="flex flex-col font-normal"
				class:mt-6={field.sortable !== false}
			>
				<RangePicker
					bind:this={rangePicker}
					numberOfMonths={1}
					onchange={(newRange) => {
						range = newRange
						updateUrl()
					}}
				/>

				<div class="m-2 flex gap-2">
					<InputDateTime
						label="À partir de"
						name="start"
						bind:value={range.start}
						class="grow"
						onchange={updateUrl}
					/>
					<InputDateTime
						label="Jusqu'à"
						name="end"
						bind:value={range.end}
						class="grow"
						onchange={updateUrl}
					/>
				</div>

				<div class="m-2 flex flex-row-reverse gap-2">
					<button class="btn">Ok</button>
					<button class="btn btn-ghost" type="button" onclick={() => handleReset(popover)}>
						Effacer
					</button>
				</div>
			</form>
		{/snippet}
	</Popover>
</th>
