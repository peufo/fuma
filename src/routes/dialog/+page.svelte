<script lang="ts">
	import DialogCode from '$lib/ui/dialog/Dialog.svelte?raw'
	import DocExample from '../_doc/DocExample.svelte'
	import { DocProps, DocSection } from '../_doc/index.ts'
	import { parseProps } from '../_doc/parse-props.ts'
	import Usage from './Usage.svelte'
	import usageCode from './Usage.svelte?raw'
</script>

<DocSection title="Dialog" description="TODO: write a small description">
	<DocProps props={parseProps(DialogCode)} />
	<DocExample code={usageCode}>
		{#snippet preview()}<Usage />{/snippet}
	</DocExample>
</DocSection>
