<script lang="ts">
	import type { PropDef } from '../_doc/index.ts';
	import { DocExample, DocProps, DocSection } from '../_doc/index.ts';
	import Usage from './Usage.svelte';
	import usageCode from './Usage.svelte?raw';

	const props: PropDef[] = [
		{
			name: 'items',
			type: 'Item[]',
			default: '[]',
			description: 'Items to search through'
		},
		{
			name: 'keys',
			type: 'Record<string, { weight?, getFn? }>',
			required: true,
			description: 'Search keys configuration'
		},
		{
			name: '...fuseOptions',
			type: 'Omit<IFuseOptions<Item>, "includeMatches" | "keys">',
			description: 'Additional Fuse.js options'
		}
	];
</script>

<DocSection title="useSearch">
	<DocExample code={usageCode}>
		{#snippet preview()}
			<Usage />
		{/snippet}
	</DocExample>
	<DocProps {props} />
</DocSection>
