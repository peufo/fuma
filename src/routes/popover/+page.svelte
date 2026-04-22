<script lang="ts">
	import type { PropDef } from '../_doc/index.ts';
	import { DocExample, DocProps, DocSection } from '../_doc/index.ts';
	import Usage from './Usage.svelte';
	import usageCode from './Usage.svelte?raw';

	const props: PropDef[] = [
		{
			name: 'trigger',
			type: 'Snippet<[PopoverType]>',
			required: true,
			description: 'Trigger snippet that receives the popover API.'
		},
		{
			name: 'children',
			type: 'Snippet<[PopoverType]>',
			required: true,
			description: 'Popover content snippet that receives the popover API.'
		},
		{
			name: 'class',
			type: 'ClassValue',
			default: "''",
			description: 'Additional CSS classes for the popover container.'
		},
		{
			name: 'style',
			type: 'string',
			default: "''",
			description: 'Inline styles for the popover container.'
		},
		{
			name: 'placement',
			type: 'Placement',
			default: "'bottom-start'",
			description: 'Popover placement relative to the trigger.'
		},
		{
			name: 'mode',
			type: "'auto' | 'hint' | 'manual'",
			default: "'auto'",
			description: 'Popover mode attribute.'
		},
		{
			name: 'listenClick',
			type: 'boolean',
			default: 'true',
			description: 'Listen to click events on the trigger.'
		},
		{
			name: 'listenFocus',
			type: 'boolean',
			default: 'true',
			description: 'Listen to focus events on the trigger.'
		},
		{
			name: 'listenHover',
			type: 'boolean',
			default: 'false',
			description: 'Listen to hover events on the trigger.'
		},
		{
			name: 'hideDelay',
			type: 'number',
			default: '400',
			description: 'Delay in ms before hiding when listenHover is true.'
		}
	];
</script>

<DocSection title="Popover">
	<DocExample code={usageCode}>
		{#snippet preview()}
			<Usage />
		{/snippet}
	</DocExample>
	<DocProps {props} />
</DocSection>
