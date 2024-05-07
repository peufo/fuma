<script lang="ts">
	import Meta from '$lib/private/Meta.svelte'
	import { Pagination } from '$lib/ui/pagination/index.js'

	let pagination: Pagination
</script>

<Meta component={pagination} name="Pagination">
	<Pagination bind:this={pagination} />
</Meta>
