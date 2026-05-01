<script lang="ts">
	import type { PropDef } from '$lib/_doc/index.ts'
	import { DocExample, DocProps, DocSection } from '$lib/_doc/index.ts'
	import Usage from './Usage.svelte'
	import usageCode from './Usage.svelte?raw'

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
	]
</script>

<DocSection title="useSearch" description="TODO: write a small description">
	<DocProps {props} />
	<DocExample code={usageCode}>
		{#snippet preview()}<Usage />{/snippet}
	</DocExample>
</DocSection>
