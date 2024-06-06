<script lang="ts">
	import { mdiCalendarMonthOutline, mdiClose } from '@mdi/js'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'

	import { urlParam } from '$lib/store/param.js'
	import { formatRange } from '$lib/utils/formatRange.js'
	import { Icon } from '$lib/ui/icon/index.js'
	import { DropDown } from '$lib/ui/menu/index.js'
	import { InputTime } from '$lib/ui/input/index.js'
	import { type Period, PeriodPicker } from '$lib/ui/period/index.js'
	import dayjs from 'dayjs'

	let dropDown: DropDown
	const start = $page.url.searchParams.get('start')
	const end = $page.url.searchParams.get('end')

	let period = {
		start: start ? new Date(start) : null,
		end: end ? new Date(end) : null
	}
	$: isValidPeriod = !!period.start && !!period.end

	function getLabel(_period: Period | undefined) {
		if (!_period || !_period.start || !_period.end) return 'Périodes'
		return formatRange(_period)
	}

	function handleSubmit() {
		dropDown.hide()
		if (!isValidPeriod) return
		goto(
			$urlParam.with({
				start: dayjs(period.start).format('HH:mm'),
				end: dayjs(period.end).format('HH:mm')
			}),
			{ replaceState: true, noScroll: true }
		)
	}

	function handleReset() {
		dropDown.hide()
		period = { start: null, end: null }
		goto($urlParam.without('start', 'end'), { replaceState: true, noScroll: true })
	}
</script>

<DropDown bind:this={dropDown} on:mouseLeave={handleSubmit} class="max-h-full">
	<div slot="activator" class="join">
		<button class="btn join-item btn-sm shrink flex-nowrap">
			<Icon path={mdiCalendarMonthOutline} class="opacity-60" size={20} />
			{getLabel(period)}
		</button>
		{#if isValidPeriod}
			<button class="btn btn-square join-item btn-sm" on:click|preventDefault={handleReset}>
				<Icon path={mdiClose} class="fill-base-content" />
			</button>
		{/if}
	</div>

	<form class="flex flex-col" on:submit|preventDefault={handleSubmit} data-sveltekit-replacestate>
		<PeriodPicker numberOfMonths={1} bind:period />

		<input class="hidden" type="text" name="start" value={period.start?.toJSON()} />
		<input class="hidden" type="text" name="end" value={period.end?.toJSON()} />

		<div class="flex gap-2 p-2">
			<InputTime label="A partir de" bind:value={period.start} enhanceDisabled class="grow" />
			<InputTime label="Jusqu'à" bind:value={period.end} enhanceDisabled class="grow" />
		</div>
		<button class="btn m-2"> Valider </button>
	</form>
</DropDown>
