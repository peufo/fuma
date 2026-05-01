<script lang="ts">
	import RangePickerCode from '$lib/ui/range/RangePicker.svelte?raw'
	import DocExample from '$lib/_doc/DocExample.svelte'
	import { DocProps, DocSection } from '$lib/_doc/index.ts'
	import { parseProps } from '$lib/_doc/parse-props.ts'
	import Usage from './Usage.svelte'
	import usageCode from './Usage.svelte?raw'
</script>

<DocSection title="RangePicker" description="TODO: write a small description">
	<DocProps props={parseProps(RangePickerCode)} />
	<DocExample code={usageCode}>
		{#snippet preview()}<Usage />{/snippet}
	</DocExample>
</DocSection>
