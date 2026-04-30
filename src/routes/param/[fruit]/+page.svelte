<script lang="ts">
	import { page } from '$app/state'
	import { fruitsOptions } from '$lib/data.ts'

	let fruit = $derived(
		page.params.fruit && new Map(Object.entries(fruitsOptions)).get(page.params.fruit)
	)
</script>

{#if !fruit}
	<h2 class="text-2xl text-error">Unkown fruit: {page.params.fruit}</h2>
{:else}
	<div class="flex gap-2 p-5 text-2xl">
		<fruit.icon />
		<h2>{fruit.label}</h2>
		<fruit.icon />
	</div>
{/if}
