<script lang="ts">
	import { CalendarRangeIcon } from '@lucide/svelte'
	import { slide } from 'svelte/transition'
	import { goto } from '$app/navigation'
	import { usePopover } from '$lib/popover/index.js'
	import { param, urlParam } from '$lib/state/param.js'
	import { formatRangeShort } from '$lib/ui/range/format.js'
	import { type RangeAsDate, RangePicker } from '$lib/ui/range/index.js'
	import { jsonParse } from '$lib/utils/jsonParse.js'

	let rangePicker: RangePicker

	let {
		key = 'range',
		range = $bindable(
			jsonParse<RangeAsDate>(param.get(key), {
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
		range?: RangeAsDate
		minDate?: Date | number | string
		maxDate?: Date | number | string
		class?: string
		classLabel?: string
	} = $props()

	const popover = usePopover()

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
		<!--
		<InputString label="A partir de" bind:value={range.start} class="grow" />
		<InputString label="Jusqu'à" bind:value={range.end} class="grow" />
		-->
		<span>TODO: same problème with input...</span>
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
