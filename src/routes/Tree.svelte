<script lang="ts">
	import { page } from '$app/stores'
	export let tree: string[][]
	export let level = 0

	function capitalise(text: string): string {
		if (!text) return ''
		return text[0].toUpperCase() + text.slice(1)
	}
</script>

<ul class="flex flex-col gap-1">
	{#each tree.filter((p) => p.length === level + 1) as path, index}
		{@const pathname = path.join('/')}
		{@const children = tree.filter((p, i) => i !== index && p.join('/').startsWith(pathname))}
		{@const isActive = $page.url.pathname.endsWith(pathname)}

		<li>
			<a href="/{pathname}" class:bg-primary={isActive} class:text-white={isActive}>
				{capitalise(path.at(-1) || '')}
			</a>

			{#if children.length}
				<svelte:self tree={children} level={level + 1} />
			{/if}
		</li>
	{/each}
</ul>
