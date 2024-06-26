<script lang="ts">
	import { jsonParse, RangePickerButton, urlParam, type RangeAsDate } from '$lib/index.js'
	import PeriodPicker from '$lib/ui/range/RangePicker.svelte'
	import TableHeadDate from '$lib/ui/table/head/TableHeadDate.svelte'

	let range = jsonParse<RangeAsDate>($urlParam.get('range'), { start: null, end: null })
</script>

<PeriodPicker bind:range />

<div class="divider"></div>

<RangePickerButton bind:range />

<div class="divider"></div>
<pre>{JSON.stringify(range, null, 2)}</pre>

<div class="divider"></div>

<TableHeadDate field={{ key: 'date', label: 'Date' }} />
