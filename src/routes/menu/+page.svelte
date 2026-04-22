<script lang="ts">
import type { PropDef } from '../_doc/index.ts';
import { DocExample, DocProps, DocSection } from '../_doc/index.ts';
import Usage from './Usage.svelte';
import usageCode from './Usage.svelte?raw';

const props: PropDef[] = [
	{
		name: 'tippyProps',
		type: 'Partial<TippyProps>',
		default: '{}',
		description: 'Tippy.js options',
	},
	{
		name: 'class',
		type: 'string',
		default: "''",
		description: 'Additional CSS classes',
	},
	{
		name: 'classWrapper',
		type: 'string',
		default: "''",
		description: 'Wrapper CSS classes',
	},
	{
		name: 'classActivator',
		type: 'string',
		default: "''",
		description: 'Activator CSS classes',
	},
	{
		name: 'useSingleton',
		type: 'boolean',
		default: 'false',
		description: 'Use singleton tooltip',
	},
	{
		name: 'autofocus',
		type: 'boolean',
		default: 'false',
		description: 'Autofocus first input on open',
	},
	{
		name: 'hideOnBlur',
		type: 'boolean',
		default: 'false',
		description: 'Hide when last focusable element loses focus',
	},
	{
		name: 'hideOnNav',
		type: 'boolean',
		default: 'true',
		description: 'Hide on navigation',
	},
	{
		name: 'disable',
		type: 'boolean',
		default: 'false',
		description: 'Disable dropdown behavior and render inline',
	},
	{
		name: 'activator',
		type: 'Snippet<[{ tip, hide, show }]>',
		description: 'Activator snippet',
	},
	{
		name: 'children',
		type: 'Snippet<[{ tip, hide, show }]>',
		required: true,
		description: 'Dropdown content',
	},
];
</script>

<DocSection title="DropDown">
	<DocExample code={usageCode}>
		{#snippet preview()}
			<Usage />
		{/snippet}
	</DocExample>
	<DocProps {props} />
</DocSection>
