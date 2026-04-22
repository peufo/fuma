<script lang="ts">
import type { PropDef } from '../_doc/index.ts';
import { DocExample, DocProps, DocSection } from '../_doc/index.ts';
import Usage from './Usage.svelte';
import usageCode from './Usage.svelte?raw';

const props: PropDef[] = [
	{
		name: 'dialog',
		type: 'HTMLDialogElement',
		description: 'Bound dialog element',
	},
	{
		name: 'hideCloseButton',
		type: 'boolean',
		default: 'false',
		description: 'Hide the close button',
	},
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes for the content area',
	},
	{
		name: 'onOpen',
		type: '() => void',
		description: 'Callback when dialog opens',
	},
	{
		name: 'onClose',
		type: '() => void',
		description: 'Callback when dialog closes',
	},
	{
		name: 'activator',
		type: 'Snippet<[{ showModal: () => void }]>',
		description: 'Activator snippet',
	},
	{
		name: 'header',
		type: 'Snippet',
		description: 'Header snippet',
	},
	{
		name: 'footer',
		type: 'Snippet',
		description: 'Footer snippet',
	},
	{
		name: 'children',
		type: 'Snippet',
		required: true,
		description: 'Dialog content',
	},
];
</script>

<DocSection title="Dialog">
	<DocExample code={usageCode}>
		{#snippet preview()}
			<Usage />
		{/snippet}
	</DocExample>
	<DocProps {props} />
</DocSection>
