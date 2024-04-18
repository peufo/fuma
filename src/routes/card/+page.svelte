<script lang="ts">
	import { Card } from '$lib/index.js'
	import Meta from '$lib/Meta.svelte'

	let card: Card
</script>

<Meta component={card} />

<Card bind:this={card} class="prout">YOLO</Card>
