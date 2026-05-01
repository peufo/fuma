<script lang="ts">
	import ButtonDeleteCode from '$lib/ui/button/ButtonDelete.svelte?raw'
	import DocExample from '$lib/_doc/DocExample.svelte'
	import { DocProps, DocSection } from '$lib/_doc/index.ts'
	import { parseProps } from '$lib/_doc/parse-props.ts'
	import Usage from './Usage.svelte'
	import UsageCode from './Usage.svelte?raw'
</script>

<DocSection title="ButtonDelete" description="TODO: write a small description">
	<DocProps props={parseProps(ButtonDeleteCode)} />
	<DocExample code={UsageCode} title="Basic">
		{#snippet preview()}
			<Usage />
		{/snippet}
	</DocExample>
</DocSection>
