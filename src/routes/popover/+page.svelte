<script lang="ts">
	import PopoverCode from '$lib/popover/Popover.svelte?raw'
	import DocExample from '../_doc/DocExample.svelte'
	import { DocProps, DocSection } from '../_doc/index.ts'
	import { parseProps } from '../_doc/parse-props.ts'
	import Usage from './Usage.svelte'
	import usageCode from './Usage.svelte?raw'
</script>

<DocSection title="Popover" description="TODO: write a small description">
	<DocProps props={parseProps(PopoverCode)} />
	<DocExample code={usageCode}>
		{#snippet preview()}<Usage />{/snippet}
	</DocExample>
</DocSection>
