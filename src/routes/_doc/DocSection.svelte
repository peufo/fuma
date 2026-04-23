<script lang="ts">
	import { type Snippet } from 'svelte'

	let {
		title,
		children
	}: {
		title?: string
		children: Snippet
	} = $props()
</script>

<section class="mt-4 mb-12">
	{#if title}
		<h2 class="mb-2 text-2xl font-bold text-base-content">{title}</h2>
		<div class="divider mb-6"></div>
	{/if}
	{@render children()}
</section>
