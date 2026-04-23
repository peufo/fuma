<script lang="ts">
	import type { PropDef } from '../_doc/index.ts'
	import { DocExample, DocProps, DocSection } from '../_doc/index.ts'
	import Usage from './Usage.svelte'
	import usageCode from './Usage.svelte?raw'

	const props: PropDef[] = [
		{
			name: 'take',
			type: 'number',
			default: '20',
			description: 'Number of items per page'
		}
	]
</script>

<DocSection title="Pagination">
	<DocExample code={usageCode}>
		{#snippet preview()}
			<Usage />
		{/snippet}
	</DocExample>
	<DocProps {props} />
</DocSection>
