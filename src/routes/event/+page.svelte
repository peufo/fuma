<script lang="ts">
	import type { PropDef } from '$lib/_doc/index.ts'
	import { DocExample, DocProps, DocSection } from '$lib/_doc/index.ts'
	import Usage from './Usage.svelte'
	import usageCode from './Usage.svelte?raw'

	const props: PropDef[] = [
		{
			name: 'new_item',
			type: 'Item',
			description: 'Event payload emitted and listened to across components'
		}
	]
</script>

<DocSection title="EventEmitter" description="TODO: write a small description">
	<DocProps {props} />
	<DocExample code={usageCode}>
		{#snippet preview()}<Usage />{/snippet}
	</DocExample>
</DocSection>
