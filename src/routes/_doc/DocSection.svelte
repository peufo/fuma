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

<section class="mb-8">
	{#if title}
		<h2 class="title mb-4">{title}</h2>
	{/if}
	{@render children()}
</section>
