<script lang="ts">
import type { PropDef } from '../_doc/index.ts';
import { DocExample, DocProps, DocSection } from '../_doc/index.ts';
import Usage from './Usage.svelte';
import usageCode from './Usage.svelte?raw';

const props: PropDef[] = [
	{
		name: 'value',
		type: 'string | (() => Promise<string>)',
		required: true,
		description: 'Value to copy or async function returning it',
	},
	{ name: 'title', type: 'string', default: "''", description: 'Tooltip text' },
	{ name: 'label', type: 'string', default: "''", description: 'Button label' },
	{
		name: 'Icon',
		type: 'Component<IconProps>',
		default: 'CopyIcon',
		description: 'Icon component',
	},
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes',
	},
	{
		name: 'successMessage',
		type: 'string',
		default: "'Copied'",
		description: 'Toast message on success',
	},
	{
		name: 'onSuccess',
		type: '() => void',
		description: 'Callback after successful copy',
	},
];
</script>

<DocSection title="ButtonCopy">
	<DocExample code={usageCode}>
		{#snippet preview()}
			<Usage />
		{/snippet}
	</DocExample>
	<DocProps {props} />
</DocSection>
