<script lang="ts">
	import { RangePickerButton } from '$lib/index.js'
	import PeriodPicker from '$lib/ui/range/RangePicker.svelte'
	import TableHeadDate from '$lib/ui/table/head/TableHeadDate.svelte'

	let period: { start: Date; end: Date } | undefined = undefined
</script>

<PeriodPicker bind:range={period} />

<pre>{JSON.stringify(period, null, 2)}</pre>

<div class="divider"></div>

<RangePickerButton />

<div class="divider"></div>

<TableHeadDate field={{ key: 'date', label: 'Date' }} />
