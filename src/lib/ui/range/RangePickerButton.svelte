<script lang="ts">
	import { CalendarRangeIcon } from '@lucide/svelte'
	import { slide } from 'svelte/transition'
	import { goto } from '$app/navigation'
	import { InputDateTime } from '$lib/input/index.js'
	import { usePopover } from '$lib/popover/index.js'
	import { param, urlParam } from '$lib/state/param.js'
	import { formatRangeShort } from '$lib/ui/range/format.js'
	import { type RangeAsDate, RangePicker } from '$lib/ui/range/index.js'
	import { jsonParse } from '$lib/utils/jsonParse.js'

	let rangePicker: RangePicker

	let {
		key = 'range',
		range = $bindable(parseRange(param.get(key))),
		minDate,
		maxDate,
		class: klass = '',
		classLabel = ''
	}: {
		key?: string
		range?: RangeAsDate
		minDate?: Date | number | string
		maxDate?: Date | number | string
		class?: string
		classLabel?: string
	} = $props()

	const popover = usePopover()

	// Le paramètre d'URL porte des chaînes ISO: sans cette reprise, `range` contiendrait des
	// chaînes là où tout le reste — `updateURL`, `InputDateTime` — attend des `Date`.
	function parseRange(value?: string | null): RangeAsDate {
		const { start, end } = jsonParse<{ start?: string; end?: string }>(value, {})
		return { start: start ? new Date(start) : null, end: end ? new Date(end) : null }
	}

	// Le light-dismiss (clic à l'extérieur) ne passe pas par `hide()`, donc pas par
	// `onHide`: on suit `isOpen` pour que l'URL soit à jour à chaque fermeture.
	let wasOpen = false
	$effect(() => {
		const { isOpen } = popover
		if (wasOpen && !isOpen) updateURL()
		wasOpen = isOpen
	})

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

<button
	class={['min-width-0 btn flex-nowrap btn-sm', !isValidPeriod && 'btn-square', klass]}
	{...popover.trigger}
>
	<CalendarRangeIcon class="opacity-70" size={20} />
	{#if isValidPeriod}
		<span
			transition:slide={{ axis: 'x', duration: 200 }}
			class="text-xs font-medium whitespace-nowrap opacity-80 {classLabel}"
		>
			{getLabel(range)}
		</span>
	{/if}
</button>

<div {...popover.content} class="rounded-box border bg-base-100 p-1 shadow-xl">
	<RangePicker bind:this={rangePicker} numberOfMonths={1} bind:range {minDate} {maxDate} />

	<div class="flex gap-2 p-2">
		<InputDateTime label="À partir de" bind:value={range.start} class="grow" />
		<InputDateTime label="Jusqu'à" bind:value={range.end} class="grow" />
	</div>

	<div class="m-2 flex justify-end gap-2">
		{#if range.start || range.end}
			<button
				transition:slide
				class="btn btn-ghost"
				onclick={() => {
					range = { start: null, end: null }
					rangePicker.clear()
					popover.hide()
				}}
			>
				Effacer
			</button>
		{/if}
		<button class="btn" onclick={() => popover.hide()}> Valider </button>
	</div>
</div>

<style>
	div[popover] {
		border-color: color-mix(in oklab, var(--color-base-content) 20%, #0000);
	}
</style>
