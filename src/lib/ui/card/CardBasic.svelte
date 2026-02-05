<script lang="ts">
	import type { Snippet } from 'svelte'

	let {
		title = '',
		style = '',
		class: klass = '',
		children
	}: {
		title?: string
		style?: string
		class?: string
		children: Snippet
	} = $props()
</script>

<div class="{klass} bg-base-100 border rounded-lg p-2 sm:p-5" {style}>
	{#if title}
		<h2 class="font-medium mb-2">
			{title}
		</h2>
	{/if}
	{@render children()}
</div>
