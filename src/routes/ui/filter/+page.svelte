<script lang="ts">
	import { PeriodPickerButton } from '$lib/index.js'
	import PeriodPicker from '$lib/ui/period/PeriodPicker.svelte'
	import TableHeadDate from '$lib/ui/table/head/TableHeadDate.svelte'

	let period: { start: Date; end: Date } | undefined = undefined
</script>

<PeriodPicker bind:period />

<pre>{JSON.stringify(period, null, 2)}</pre>

<div class="divider"></div>

<PeriodPickerButton />

<div class="divider"></div>

<TableHeadDate field={{ key: 'date', label: 'Date' }} />
