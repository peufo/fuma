<script lang="ts">
	import type { PropDef } from '../_doc/index.ts';
	import { DocExample, DocProps, DocSection } from '../_doc/index.ts';
	import Usage from './Usage.svelte';
	import usageCode from './Usage.svelte?raw';

	const props: PropDef[] = [
		{
			name: 'key',
			type: 'string',
			required: true,
			description: 'URL param key for drawer state'
		},
		{
			name: 'title',
			type: 'string',
			description: 'Drawer title'
		},
		{
			name: 'class',
			type: 'string',
			default: "''",
			description: 'Additional CSS classes'
		},
		{
			name: 'maxWidth',
			type: 'string',
			default: "'32rem'",
			description: 'Maximum drawer width'
		},
		{
			name: 'classHeader',
			type: 'string',
			default: "''",
			description: 'Header CSS classes'
		},
		{
			name: 'classBody',
			type: 'string',
			default: "''",
			description: 'Body CSS classes'
		},
		{
			name: 'duration',
			type: 'number',
			default: '180',
			description: 'Transition duration in ms'
		},
		{
			name: 'noOverlay',
			type: 'boolean',
			default: 'false',
			description: 'Disable overlay backdrop'
		},
		{
			name: 'zIndex',
			type: 'number',
			default: '50',
			description: 'Z-index stack level'
		},
		{
			name: 'children',
			type: 'Snippet<[{ open, close }]>',
			required: true,
			description: 'Drawer content'
		}
	];
</script>

<DocSection title="Drawer">
	<DocExample code={usageCode}>
		{#snippet preview()}
			<Usage />
		{/snippet}
	</DocExample>
	<DocProps {props} />
</DocSection>
