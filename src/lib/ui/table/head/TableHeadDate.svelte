<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { mdiCalendarFilterOutline } from '@mdi/js'

	import { DropDown } from '$lib/ui/menu/index.js'
	import { InputTime } from '$lib/ui/input/index.js'
	import type { TableField } from '$lib/ui/table/index.js'
	import { formatRange } from '$lib/ui/range/format.js'
	import { RangePicker, type RangeAsDate } from '$lib/ui/range/index.js'
	import { urlParam } from '$lib/store/param.js'
	import { jsonParse } from '$lib/utils/jsonParse.js'
	import { Icon } from '$lib/ui/icon/index.js'
	import { onMount } from 'svelte'

	export let field: Omit<TableField, 'getCell' | 'type'>

	let dropDown: DropDown
	let rangePicker: RangePicker
	const initialValue = jsonParse<{ start?: string; end?: string }>(
		$page.url.searchParams.get(field.key),
		{}
	)

	let range: RangeAsDate = {
		start: initialValue.start ? new Date(initialValue.start) : null,
		end: initialValue.end ? new Date(initialValue.end) : null
	}

	let isValidPeriod = !!range.start && !!range.end

	onMount(() => {
		console.log('mount')
		return () => {
			console.log('destroy')
		}
	})

	function updateUrl() {
		isValidPeriod = !!range.start && !!range.end
		if (!isValidPeriod) return
		goto(
			$urlParam.with(
				{
					[field.key]: JSON.stringify({
						start: range.start?.toJSON(),
						end: range.end?.toJSON()
					})
				},
				'skip',
				'take'
			),
			{ replaceState: true, noScroll: true, keepFocus: true }
		)
	}

	function handleReset() {
		isValidPeriod = false
		range.start = null
		range = { start: null, end: null }
		dropDown.hide()
		rangePicker.clear()
		goto($urlParam.without(field.key, 'skip', 'take'), {
			replaceState: true,
			noScroll: true,
			keepFocus: true
		})
	}
</script>

<th class="p-1">
	<DropDown
		bind:this={dropDown}
		tippyProps={{ appendTo: () => document.body }}
		hideOnNav={false}
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
					{formatRange(range)}
				</span>
			{/if}
		</button>

		<form
			class="flex flex-col font-normal"
			on:submit|preventDefault={() => dropDown.hide()}
			data-sveltekit-replacestate
		>
			<RangePicker
				bind:this={rangePicker}
				numberOfMonths={1}
				on:change={({ detail: newRange }) => {
					range = newRange
					updateUrl()
				}}
			/>

			<input class="hidden" type="text" name="start" value={range.start?.toJSON()} />
			<input class="hidden" type="text" name="end" value={range.end?.toJSON()} />

			<div class="m-2 flex gap-2">
				<InputTime
					label="A partir de"
					bind:value={range.start}
					enhanceDisabled
					class="grow"
					on:input={updateUrl}
				/>
				<InputTime
					label="Jusqu'à"
					bind:value={range.end}
					enhanceDisabled
					class="grow"
					on:input={updateUrl}
				/>
			</div>

			<div class="m-2 flex flex-row-reverse gap-2">
				<button class="btn">Ok</button>
				<button class="btn btn-ghost" type="button" on:click={handleReset}>Effacer</button>
			</div>
		</form>
	</DropDown>
</th>
