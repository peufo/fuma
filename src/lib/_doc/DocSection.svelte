<script lang="ts">
	import { type Snippet } from 'svelte'

	let {
		title,
		description,
		children
	}: {
		title?: string
		description?: string
		children: Snippet
	} = $props()
</script>

<section class="mt-2 mb-12">
	<h2 class="mb-2 text-2xl font-bold text-base-content">{title}</h2>
	{#if description}
		<p class="mb-4 text-base-content/70">{description}</p>
	{/if}
	<div class="divider mb-6"></div>
	{@render children()}
</section>
