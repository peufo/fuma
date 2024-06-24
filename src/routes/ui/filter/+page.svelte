<script lang="ts">
	import { RangePickerButton } from '$lib/index.js'
	import PeriodPicker from '$lib/ui/range/RangePicker.svelte'
	import TableHeadDate from '$lib/ui/table/head/TableHeadDate.svelte'

	let range: { start: Date; end: Date } | undefined = undefined
</script>

<PeriodPicker bind:range />

<pre>{JSON.stringify(range, null, 2)}</pre>

<div class="divider"></div>

<RangePickerButton bind:range />

<div class="divider"></div>

<TableHeadDate field={{ key: 'date', label: 'Date' }} />
