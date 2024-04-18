<script lang="ts">
	import Meta from '$lib/Meta.svelte'
	import { Placeholder } from '$lib/index.js'

	let component: Placeholder
</script>

<Meta {component} name="Placeholder">
	<Placeholder bind:this={component}>default slot</Placeholder>
</Meta>
