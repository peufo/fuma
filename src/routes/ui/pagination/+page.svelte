<script lang="ts">
	import Meta from '$lib/Meta.svelte'
	import { Pagination } from '$lib/ui/index.js'

	let pagination: Pagination
</script>

<Meta component={pagination} name="Pagination">
	<Pagination bind:this={pagination} />
</Meta>
