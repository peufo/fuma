<script lang="ts">
	import type { PropDef } from '../_doc/index.ts';
	import { DocExample, DocProps, DocSection } from '../_doc/index.ts';
	import Usage from './Usage.svelte';
	import usageCode from './Usage.svelte?raw';
	import UsageController from './UsageController.svelte';
	import usageControllerCode from './UsageController.svelte?raw';

	const props: PropDef[] = [
		{
			name: 'label',
			type: 'string',
			required: true,
			description: 'Field label'
		},
		{
			name: 'items',
			type: 'Item[]',
			required: true,
			description: 'Select items'
		},
		{
			name: 'getValue',
			type: '(item: Item) => string',
			required: true,
			description: 'Value extractor function'
		},
		{
			name: 'selected',
			type: 'Snippet<[Item]>',
			description: 'Selected item render snippet'
		},
		{
			name: 'proposal',
			type: 'Snippet<[Item, { isSelected: boolean; isFocus: boolean }]>',
			description: 'Dropdown item render snippet'
		},
		{
			name: 'field',
			type: 'RemoteFormField<string>',
			description: 'Form field binding'
		},
		{
			name: 'value',
			type: 'string',
			description: 'Controller mode value binding'
		}
	];
</script>

<DocSection title="InputSelect">
	<DocExample title="Form mode" code={usageCode}>
		{#snippet preview()}
			<Usage />
		{/snippet}
	</DocExample>

	<DocExample title="Controller mode" code={usageControllerCode}>
		{#snippet preview()}
			<UsageController />
		{/snippet}
	</DocExample>

	<DocProps {props} />
</DocSection>
