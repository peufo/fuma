<script lang="ts">
import type { PropDef } from '../_doc/index.ts';
import { DocExample, DocProps, DocSection } from '../_doc/index.ts';
import Usage from './Usage.svelte';
import usageCode from './Usage.svelte?raw';

const props: PropDef[] = [
	{
		name: 'formaction',
		type: 'string',
		required: true,
		description: 'Form action URL triggered on confirmation',
	},
	{
		name: 'btn',
		type: 'boolean',
		default: 'true',
		description: 'Apply button styles',
	},
	{
		name: 'children',
		type: 'Snippet<[{ waitConfirmation: boolean }]>',
		description: 'Custom button content',
	},
];
</script>

<DocSection title="ButtonDelete">
	<DocExample code={usageCode}>
		{#snippet preview()}
			<Usage />
		{/snippet}
	</DocExample>
	<DocProps {props} />
</DocSection>
