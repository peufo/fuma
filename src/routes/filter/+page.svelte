<script lang="ts">
	import type { PropDef } from '../_doc/index.ts';
	import { DocExample, DocProps, DocSection } from '../_doc/index.ts';
	import Usage from './Usage.svelte';
	import usageCode from './Usage.svelte?raw';

	const props: PropDef[] = [
		{
			name: 'range',
			type: 'RangeAsDate',
			description: 'Selected date range'
		},
		{
			name: 'numberOfMonths',
			type: 'number',
			default: '3',
			description: 'Number of months to display'
		},
		{
			name: 'numberOfColumns',
			type: 'number',
			default: 'numberOfMonths',
			description: 'Number of columns'
		},
		{
			name: 'showWeekNumbers',
			type: 'boolean',
			default: 'true',
			description: 'Show week numbers'
		},
		{
			name: 'minDate',
			type: 'Date | number | string',
			description: 'Minimum selectable date'
		},
		{
			name: 'maxDate',
			type: 'Date | number | string',
			description: 'Maximum selectable date'
		}
	];
</script>

<DocSection title="RangePicker">
	<DocExample code={usageCode}>
		{#snippet preview()}
			<Usage />
		{/snippet}
	</DocExample>
	<DocProps {props} />
</DocSection>
