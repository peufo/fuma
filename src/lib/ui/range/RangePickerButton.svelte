<script lang="ts">
	import { mdiCalendarMonthOutline, mdiClose } from '@mdi/js'
	import dayjs from 'dayjs'
	import { goto } from '$app/navigation'

	import { urlParam } from '$lib/store/param.js'
	import { formatRange } from '$lib/ui/range/format.js'
	import { Icon } from '$lib/ui/icon/index.js'
	import { DropDown } from '$lib/ui/menu/index.js'
	import { InputTime } from '$lib/ui/input/index.js'
	import { type Range, RangePicker } from '$lib/ui/range/index.js'
	import { jsonParse } from '$lib/utils/jsonParse.js'
	export let minDate: Date | number | string | undefined = undefined
	export let maxDate: Date | number | string | undefined = undefined

	let dropDown: DropDown

	export let key = 'range'
	export let range: Range = jsonParse($urlParam.get(key), { start: null, end: null })
	$: isValidPeriod = !!range.start && !!range.end

	function getLabel(_range?: Range) {
		if (!_range || !_range.start || !_range.end) return 'Périodes'
		return formatRange(_range)
	}

	function handleSubmit() {
		dropDown.hide()
		if (!isValidPeriod) return
		goto(
			$urlParam.with({
				[key]: JSON.stringify({
					start: range.start?.toJSON(),
					end: range.end?.toJSON()
				})
			}),
			{ replaceState: true, noScroll: true }
		)
	}

	function handleReset() {
		dropDown.hide()
		range = { start: null, end: null }
		goto($urlParam.without(key), { replaceState: true, noScroll: true })
	}
</script>

<DropDown bind:this={dropDown} on:mouseLeave={handleSubmit} class="max-h-full">
	<div slot="activator" class="join">
		<button class="btn join-item btn-sm shrink flex-nowrap">
			<Icon path={mdiCalendarMonthOutline} class="opacity-60" size={20} />
			{getLabel(range)}
		</button>
		{#if isValidPeriod}
			<button class="btn btn-square join-item btn-sm" on:click|preventDefault={handleReset}>
				<Icon path={mdiClose} class="fill-base-content" />
			</button>
		{/if}
	</div>

	<form class="flex flex-col" on:submit|preventDefault={handleSubmit}>
		<RangePicker numberOfMonths={1} bind:range {minDate} {maxDate} />

		<div class="flex gap-2 p-2">
			<InputTime
				label="A partir de"
				value={dayjs(range.start).toDate()}
				on:input={({ detail: newDate }) => (range.start = newDate)}
				enhanceDisabled
				class="grow"
			/>
			<InputTime
				label="Jusqu'à"
				value={dayjs(range.end).toDate()}
				on:input={({ detail: newDate }) => (range.end = newDate)}
				enhanceDisabled
				class="grow"
			/>
		</div>
		<button class="btn m-2"> Valider </button>
	</form>
</DropDown>
