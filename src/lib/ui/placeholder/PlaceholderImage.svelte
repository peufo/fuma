<script lang="ts">
	import { PlusIcon } from '@lucide/svelte'
	import type { Snippet } from 'svelte'

	let {
		x,
		y,
		children
	}: {
		x: number
		y: number
		children?: Snippet
	} = $props()
</script>

<div style:width="{x}px" style:height="{y}px" class="rounded-lg bg-base-200 p-2">
	<div class="grid h-full w-full content-center rounded-md border-4 border-dashed">
		<span class="text-center text-sm font-medium text-base-content/60">
			{#if children}
				{@render children()}
			{:else}
				<span>Pas d'image</span>
			{/if}
		</span>
		<PlusIcon size={30} class="fill-base-content/60" />
	</div>
</div>
