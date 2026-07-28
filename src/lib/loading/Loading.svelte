<script lang="ts">
	import type { RemoteQuery } from '@sveltejs/kit'
	let { query }: { query: RemoteQuery<unknown> } = $props()

	const isEmpty = $derived.by(() => {
		if (!query.ready) return true
		if (!query.current) return true
		if (Array.isArray(query.current) && !query.current.length) return true
		return false
	})
</script>

{#if query.loading}
	<span>Loading</span>
{:else if query.error}
	<span>Error</span>
{:else if isEmpty}
	<span>No result</span>
{/if}
