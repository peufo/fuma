<script lang="ts">
	import { mdiCalendarMonthOutline } from '@mdi/js'
	import { goto } from '$app/navigation'
	import { slide } from 'svelte/transition'

	import { urlParam } from '$lib/store/param.js'
	import { formatRangeShort } from '$lib/ui/range/format.js'
	import { Icon } from '$lib/ui/icon/index.js'
	import { DropDown } from '$lib/ui/menu/index.js'
	import { InputTime } from '$lib/ui/input/index.js'
	import { type RangeAsDate, RangePicker } from '$lib/ui/range/index.js'
	import { jsonParse } from '$lib/utils/jsonParse.js'

	let dropDown: DropDown
	let rangePicker: RangePicker
	let klass = ''

	export let key = 'range'
	export let range: RangeAsDate = jsonParse<RangeAsDate>($urlParam.get(key), {
		start: null,
		end: null
	})
	export let minDate: Date | number | string | undefined = undefined
	export let maxDate: Date | number | string | undefined = undefined
	export { klass as class }
	export let classLabel = ''

	$: isValidPeriod = !!range.start && !!range.end

	function getLabel(_range?: Partial<RangeAsDate>) {
		if (!_range || !_range.start || !_range.end) return ''
		return formatRangeShort(_range as RangeAsDate)
	}

	async function writeURL() {
		const url =
			!range.start && !range.end
				? $urlParam.without(key)
				: $urlParam.with({
						[key]: JSON.stringify({
							start: range.start?.toJSON(),
							end: range.end?.toJSON()
						})
					})
		return goto(url, { replaceState: true, noScroll: true })
	}
</script>

<DropDown bind:this={dropDown} tippyProps={{ onHidden: writeURL }} class="max-h-full">
	<button slot="activator" class="min-width-0 btn btn-sm flex-nowrap {klass}">
		<Icon path={mdiCalendarMonthOutline} class="opacity-60" size={20} />
		{#if isValidPeriod}
			<span
				transition:slide={{ axis: 'x', duration: 200 }}
				class="whitespace-nowrap text-xs font-medium opacity-80 {classLabel}"
			>
				{getLabel(range)}
			</span>
		{/if}
	</button>

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
				on:click={() => {
					range = { start: null, end: null }
					rangePicker.clear()
					dropDown.hide()
				}}
			>
				Effacer
			</button>
		{/if}
		<button class="btn" on:click={() => dropDown.hide()}> Valider </button>
	</div>
</DropDown>
