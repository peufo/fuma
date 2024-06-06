<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte'
	import type { Litepicker } from 'litepicker'

	import type { Period } from './index.js'

	export let numberOfMonths = 3
	export let numberOfColumns = numberOfMonths
	export let showWeekNumbers = true
	export let period: Period | undefined = undefined

	let startElement: HTMLInputElement
	let endElement: HTMLInputElement
	let picker: Litepicker
	let parentEl: HTMLDivElement
	const dispatch = createEventDispatcher<{ change: Period }>()

	onMount(() => {
		initTimePicker()
	})

	onDestroy(() => {
		picker?.destroy()
	})

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
			startDate: period?.start ?? undefined,
			endDate: period?.end ?? undefined,
			setup: (picker: Litepicker) => {
				picker.on('selected', (date1: any, date2: any) => {
					const start = `${getAbsoluteDate(date1.dateInstance)}T${getAbsoluteTime(period?.start)}`
					period = {
						start: new Date(
							`${getAbsoluteDate(date1.dateInstance)}T${getAbsoluteTime(period?.start)}`
						),
						end: new Date(
							`${getAbsoluteDate(date2.dateInstance)}T${getAbsoluteTime(period?.end, '23:59:00')}`
						)
					}
					dispatch('change', period)
				})
			}
		})
	}

	const getAbsoluteDate = (date: Date) =>
		[date.getFullYear(), date.getMonth() + 1, date.getDate()]
			.map((n) => n.toString().padStart(2, '0'))
			.join('-')

	const getAbsoluteTime = (date?: Date | null, defaultTime = '00:00:00') => {
		if (!date) return defaultTime
		return [date.getHours(), date.getMinutes(), date.getSeconds()]
			.map((n) => n.toString().padStart(2, '0'))
			.join(':')
	}
</script>

<input type="hidden" bind:this={startElement} />
<input type="hidden" bind:this={endElement} />

<div bind:this={parentEl} />
