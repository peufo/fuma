<script lang="ts">
	import InputSelectCode from '$lib/input/InputSelect.svelte?raw'
	import DocExample from '../_doc/DocExample.svelte'
	import { DocProps, DocSection } from '../_doc/index.ts'
	import { parseProps } from '../_doc/parse-props.ts'
	import Usage from './Usage.svelte'
	import usageCode from './Usage.svelte?raw'
	import UsageController from './UsageController.svelte'
	import usageControllerCode from './UsageController.svelte?raw'
</script>

<DocSection title="InputSelect" description="TODO: write a small description">
	<DocProps props={parseProps(InputSelectCode)} />
	<DocExample title="Form mode" code={usageCode}>
		{#snippet preview()}<Usage />{/snippet}
	</DocExample>
	<DocExample title="Controller mode" code={usageControllerCode}>
		{#snippet preview()}<UsageController />{/snippet}
	</DocExample>
</DocSection>
