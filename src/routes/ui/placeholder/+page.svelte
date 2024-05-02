<script lang="ts">
	import Meta from '$lib/Meta.svelte'
	import { Placeholder, PlaceholderImage } from '$lib/ui/index.js'

	let placeholder: Placeholder
	let placeholderImage: PlaceholderImage
</script>

<Meta component={placeholder} name="Placeholder">
	<Placeholder bind:this={placeholder}>default slot</Placeholder>
</Meta>

<Meta component={placeholderImage} name="PlaceholderImage">
	<PlaceholderImage bind:this={placeholderImage} x={200} y={300} />
</Meta>
