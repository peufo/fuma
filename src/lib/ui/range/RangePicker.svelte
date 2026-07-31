<script lang="ts">
	import dayjs from 'dayjs'
	import type { Litepicker } from 'litepicker'
	import { onDestroy, onMount } from 'svelte'
	import type { RangeAsDate, RangeDate } from './types.js'

	let {
		numberOfMonths = 3,
		numberOfColumns = numberOfMonths,
		showWeekNumbers = true,
		range = $bindable(),
		minDate,
		maxDate,
		onchange
	}: {
		numberOfMonths?: number
		numberOfColumns?: number
		showWeekNumbers?: boolean
		range?: RangeAsDate
		minDate?: Date | number | string
		maxDate?: Date | number | string
		onchange?: (range: RangeAsDate) => void
	} = $props()

	let startElement: HTMLInputElement = $state()!
	let endElement: HTMLInputElement = $state()!
	let parentEl: HTMLDivElement = $state()!
	let picker: Litepicker

	onMount(() => {
		initTimePicker()
	})

	onDestroy(() => {
		picker?.destroy()
	})

	export function clear() {
		picker?.clearSelection()
	}

	async function initTimePicker() {
		const _Litepicker = (await import('litepicker')).Litepicker
		picker?.destroy()
		picker = new _Litepicker({
			element: startElement,
			elementEnd: endElement,
			// Nécéssaire pour traquer le theme
			parentEl: parentEl,
			inlineMode: true,
			singleMode: false,
			allowRepick: false,
			lang: navigator.language,
			numberOfMonths,
			numberOfColumns,
			showWeekNumbers,
			minDate,
			maxDate,
			startDate: range?.start ? dayjs(range.start).toDate() : undefined,
			endDate: range?.end ? dayjs(range.end).toDate() : undefined,
			setup: (picker: Litepicker) => {
				picker.on('selected', (date1: { dateInstance: Date }, date2: { dateInstance: Date }) => {
					range = {
						start: new Date(
							`${getAbsoluteDate(date1.dateInstance)}T${getAbsoluteTime(range?.start)}`
						),
						end: new Date(
							`${getAbsoluteDate(date2.dateInstance)}T${getAbsoluteTime(range?.end, '23:59:00')}`
						)
					}
					onchange?.(range)
				})
			}
		})
	}

	const getAbsoluteDate = (date: Date) =>
		[date.getFullYear(), date.getMonth() + 1, date.getDate()]
			.map((n) => n.toString().padStart(2, '0'))
			.join('-')

	const getAbsoluteTime = (date?: RangeDate, defaultTime = '00:00:00') => {
		if (!date) return defaultTime
		return dayjs(date).format('HH:mm:ss')
	}
</script>

<input type="hidden" bind:this={startElement} />
<input type="hidden" bind:this={endElement} />

<div bind:this={parentEl}></div>
