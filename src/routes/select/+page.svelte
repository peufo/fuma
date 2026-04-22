<script lang="ts">
	import type { PropDef } from '../_doc/index.ts';
	import { DocExample, DocProps, DocSection } from '../_doc/index.ts';
	import Usage from './Usage.svelte';
	import usageCode from './Usage.svelte?raw';

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
		}
	];
</script>

<DocSection title="InputSelect">
	<DocExample code={usageCode}>
		{#snippet preview()}
			<Usage />
		{/snippet}
	</DocExample>
	<DocProps {props} />
</DocSection>
