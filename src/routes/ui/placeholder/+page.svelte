<script lang="ts">
	import Meta from '$lib/private/Meta.svelte'
	import { Placeholder, PlaceholderImage } from '$lib/ui/placeholder/index.js'
</script>

<Meta name="Placeholder">
	<Placeholder>default slot</Placeholder>
</Meta>

<Meta name="PlaceholderImage">
	<PlaceholderImage x={200} y={300} />
</Meta>
