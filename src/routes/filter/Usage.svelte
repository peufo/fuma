<script lang="ts">
	import { jsonParse, param, type RangeAsDate, RangePickerButton } from '$lib/index.js'
	import PeriodPicker from '$lib/ui/range/RangePicker.svelte'
	import TableHeadDate from '$lib/ui/table/head/TableHeadDate.svelte'

	const parsed = jsonParse<{ start?: string; end?: string }>(param.get('range'), {})
	let range = $state<RangeAsDate>({
		start: parsed.start ? new Date(parsed.start) : null,
		end: parsed.end ? new Date(parsed.end) : null
	})
</script>

<PeriodPicker bind:range />

<div class="divider"></div>

<RangePickerButton bind:range />

<div class="divider"></div>
<pre>{JSON.stringify(range, null, 2)}</pre>

<div class="divider"></div>

<!-- `TableHeadDate` rend un `<th>`: hors d'un tableau l'analyseur HTML le jette, et
     l'hydratation échoue sur le popover qu'il contient. -->
<table class="table">
	<thead>
		<tr>
			<TableHeadDate field={{ key: 'date', label: 'Date' }} />
		</tr>
	</thead>
</table>
