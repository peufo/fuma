<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { mdiCalendarFilterOutline } from '@mdi/js'

	import { DropDown } from '$lib/ui/menu/index.js'
	import { InputTime } from '$lib/ui/input/index.js'
	import type { TableField } from '$lib/ui/table/index.js'
	import { formatRange } from '$lib/utils/formatRange.js'
	import { PeriodPicker, type Period } from '$lib/ui/period/index.js'
	import { urlParam } from '$lib/store/param.js'
	import { jsonParse } from '$lib/utils/jsonParse.js'
	import { Icon } from '$lib/ui/icon/index.js'
	import dayjs from 'dayjs'

	export let field: Omit<TableField, 'getCell' | 'type'>

	let dropDown: DropDown
	const initialValue = jsonParse<{ start?: string; end?: string }>(
		$page.url.searchParams.get(field.key),
		{}
	)

	let period = {
		start: initialValue.start ? new Date(initialValue.start) : null,
		end: initialValue.end ? new Date(initialValue.end) : null
	}

	$: isValidPeriod = !!period.start && !!period.end

	function handleSubmit() {
		dropDown.hide()
		if (!isValidPeriod) return
		goto(
			$urlParam.with(
				{
					[field.key]: JSON.stringify({
						start: period.start?.toJSON(),
						end: period.end?.toJSON()
					})
				},
				'skip',
				'take'
			),
			{ replaceState: true, noScroll: true }
		)
	}

	function handleReset() {
		dropDown.hide()
		period = { start: null, end: null }
		goto($urlParam.without(field.key, 'skip', 'take'), { replaceState: true, noScroll: true })
	}
</script>

<th class="p-1">
	<DropDown
		bind:this={dropDown}
		on:mouseLeave={handleSubmit}
		tippyProps={{ appendTo: () => document.body }}
		class="max-h-none"
	>
		<button slot="activator" class="menu-item min-h-8 w-full flex-wrap gap-y-1">
			<div class="flex gap-2">
				<span>{field.label}</span>
				{#if !isValidPeriod}
					<Icon path={mdiCalendarFilterOutline} size={15} class="opacity-50" />
				{/if}
			</div>

			{#if isValidPeriod}
				<span class="badge badge-primary badge-xs text-[0.7rem] font-normal text-white">
					{formatRange(period)}
				</span>
			{/if}
		</button>

		<form
			class="flex flex-col font-normal"
			on:submit|preventDefault={handleSubmit}
			data-sveltekit-replacestate
		>
			<PeriodPicker numberOfMonths={1} bind:period />

			<input class="hidden" type="text" name="start" value={period.start?.toJSON()} />
			<input class="hidden" type="text" name="end" value={period.end?.toJSON()} />

			<div class="m-2 flex gap-2">
				<InputTime label="A partir de" bind:value={period.start} enhanceDisabled class="grow" />
				<InputTime label="Jusqu'à" bind:value={period.end} enhanceDisabled class="grow" />
			</div>

			<div class="m-2 flex flex-row-reverse gap-2">
				<button class="btn"> Valider </button>
				<button class="btn btn-ghost" type="button" on:click={handleReset}>Effacer</button>
			</div>
		</form>
	</DropDown>
</th>
