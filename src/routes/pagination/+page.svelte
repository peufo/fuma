<script lang="ts">
	import PaginationCode from '$lib/ui/pagination/Pagination.svelte?raw'
	import DocExample from '$lib/_doc/DocExample.svelte'
	import { DocProps, DocSection } from '$lib/_doc/index.ts'
	import { parseProps } from '$lib/_doc/parse-props.ts'
	import Usage from './Usage.svelte'
	import usageCode from './Usage.svelte?raw'
</script>

<DocSection title="Pagination" description="TODO: write a small description">
	<DocProps props={parseProps(PaginationCode)} />
	<DocExample code={usageCode}>
		{#snippet preview()}<Usage />{/snippet}
	</DocExample>
</DocSection>
