<script lang="ts">
	import type { SearchQueryResultSpan } from './search.ts'

	let { spans }: { spans: SearchQueryResultSpan[] } = $props()
</script>

{#each spans as span (span)}
	{@const { isMatch, value } = span}
	<span
		class={isMatch ? 'rounded-xs text-secondary' : ''}
		class:ml-px={value.startsWith(' ')}
		class:mr-px={value.endsWith(' ')}
	>
		{value}
	</span>
{/each}
