<script lang="ts">
	import type { PropDef } from '$lib/_doc/index.ts'
	import { DocExample, DocProps, DocSection } from '$lib/_doc/index.ts'
	import Usage from './Usage.svelte'
	import usageCode from './Usage.svelte?raw'

	const props: PropDef[] = [
		{
			name: 'content',
			type: 'string',
			required: true,
			description: 'Tooltip content'
		},
		{
			name: 'disable',
			type: 'boolean',
			default: 'false',
			description: 'Disable the tooltip'
		},
		{
			name: '...tippyProps',
			type: 'Partial<TippyProps>',
			description: 'Additional Tippy.js options'
		}
	]
</script>

<DocSection title="Tip" description="TODO: write a small description">
	<DocProps {props} />
	<DocExample title="Tip" code={usageCode}>
		{#snippet preview()}<Usage />{/snippet}
	</DocExample>
</DocSection>
