<script lang="ts">
	import DropDownCode from '$lib/ui/menu/DropDown.svelte?raw'
	import DocExample from '../_doc/DocExample.svelte'
	import { DocProps, DocSection } from '../_doc/index.ts'
	import { parseProps } from '../_doc/parse-props.ts'
	import Usage from './Usage.svelte'
	import usageCode from './Usage.svelte?raw'
</script>

<DocSection title="DropDown" description="TODO: write a small description">
	<DocProps props={parseProps(DropDownCode)} />
	<DocExample code={usageCode}>
		{#snippet preview()}<Usage />{/snippet}
	</DocExample>
</DocSection>
