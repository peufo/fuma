<script lang="ts">
	import { mdiCalendarMonthOutline, mdiClose } from '@mdi/js'
	import dayjs from 'dayjs'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'

	import { urlParam } from '$lib/store/param.js'
	import { formatRange } from '$lib/ui/range/format.js'
	import { Icon } from '$lib/ui/icon/index.js'
	import { DropDown } from '$lib/ui/menu/index.js'
	import { InputTime } from '$lib/ui/input/index.js'
	import { type Range, RangePicker } from '$lib/ui/range/index.js'
	export let minDate: Date | number | string | undefined = undefined
	export let maxDate: Date | number | string | undefined = undefined

	let dropDown: DropDown
	const start = $page.url.searchParams.get('start')
	const end = $page.url.searchParams.get('end')

	export let range: Range = {
		start: start ? new Date(start) : undefined,
		end: end ? new Date(end) : undefined
	}
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
				start: dayjs(range.start).format('HH:mm'),
				end: dayjs(range.end).format('HH:mm')
			}),
			{ replaceState: true, noScroll: true }
		)
	}

	function handleReset() {
		dropDown.hide()
		range = { start: undefined, end: undefined }
		goto($urlParam.without('start', 'end'), { replaceState: true, noScroll: true })
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

	<form class="flex flex-col" on:submit|preventDefault={handleSubmit} data-sveltekit-replacestate>
		<RangePicker numberOfMonths={1} bind:range {minDate} {maxDate} />

		<input
			class="hidden"
			type="text"
			name="start"
			value={range.start ? dayjs(range.start).toJSON() : ''}
		/>
		<input
			class="hidden"
			type="text"
			name="end"
			value={range.end ? dayjs(range.end).toJSON() : ''}
		/>

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
