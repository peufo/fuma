<script lang="ts">
	import { CalendarRangeIcon } from '@lucide/svelte'
	import { goto } from '$app/navigation'
	import { slide } from 'svelte/transition'

	import { urlParam } from '$lib/state/param.svelte.js'
	import { formatRangeShort } from '$lib/ui/range/format.js'
	import { DropDown } from '$lib/ui/menu/index.js'
	import { InputTime } from '$lib/ui/input/index.js'
	import { type RangeAsDate, RangePicker } from '$lib/ui/range/index.js'
	import { jsonParse } from '$lib/utils/jsonParse.js'

	let dropDown: DropDown
	let rangePicker: RangePicker

	let {
		key = 'range',
		range = $bindable(
			jsonParse<RangeAsDate>(urlParam.get(key), {
				start: null,
				end: null
			})
		),
		minDate,
		maxDate,
		class: klass = '',
		classLabel = ''
	}: {
		key?: string
		range: RangeAsDate
		minDate?: Date | number | string
		maxDate?: Date | number | string
		class?: string
		classLabel?: string
	} = $props()

	let isValidPeriod = $derived(!!range.start && !!range.end)

	function getLabel(_range?: Partial<RangeAsDate>) {
		if (!_range || !_range.start || !_range.end) return ''
		return formatRangeShort(_range as RangeAsDate)
	}

	async function updateURL() {
		const url =
			!range.start && !range.end
				? urlParam.without(key)
				: urlParam.with({
						[key]: JSON.stringify({
							start: range.start?.toJSON(),
							end: range.end?.toJSON()
						})
					})
		return goto(url, { replaceState: true, noScroll: true })
	}
</script>

<DropDown bind:this={dropDown} tippyProps={{ onHidden: updateURL }} class="max-h-full">
	{#snippet activator()}
		<button class="min-width-0 btn btn-sm flex-nowrap {klass}">
			<CalendarRangeIcon class="opacity-60" size={20} />
			{#if isValidPeriod}
				<span
					transition:slide={{ axis: 'x', duration: 200 }}
					class="whitespace-nowrap text-xs font-medium opacity-80 {classLabel}"
				>
					{getLabel(range)}
				</span>
			{/if}
		</button>
	{/snippet}

	<RangePicker bind:this={rangePicker} numberOfMonths={1} bind:range {minDate} {maxDate} />

	<div class="flex gap-2 p-2">
		<InputTime label="A partir de" bind:value={range.start} enhanceDisabled class="grow" />
		<InputTime label="Jusqu'à" bind:value={range.end} enhanceDisabled class="grow" />
	</div>

	<div class="m-2 flex justify-end gap-2">
		{#if range.start || range.end}
			<button
				transition:slide
				class="btn btn-ghost"
				onclick={() => {
					range = { start: null, end: null }
					rangePicker.clear()
					dropDown.hide()
				}}
			>
				Effacer
			</button>
		{/if}
		<button class="btn" onclick={() => dropDown.hide()}> Valider </button>
	</div>
</DropDown>
