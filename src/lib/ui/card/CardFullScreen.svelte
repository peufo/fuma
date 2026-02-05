<script lang="ts">
	import type { Snippet } from 'svelte'
	import { Maximize2Icon, Minimize2Icon } from '@lucide/svelte'
	import { Card } from '$lib/ui/card/index.js'

	let {
		isFullScreen = false,
		class: klass = '',
		title,
		action: propAction,
		children
	}: {
		isFullScreen?: boolean
		class?: string
		title?: Snippet
		action?: Snippet
		children: Snippet<[{ isFullScreen: boolean }]>
	} = $props()
</script>

<Card
	class="{isFullScreen ? 'fixed inset-2 p-2' : ''} {klass}"
	bodyClass={isFullScreen ? 'sm:p-2 grow overflow-hidden' : ''}
	{title}
>
	{#snippet action()}
		<div class="flex gap-2">
			{@render propAction?.()}
			<button class="btn btn-square btn-sm" onclick={() => (isFullScreen = !isFullScreen)}>
				{#if isFullScreen}
					<Minimize2Icon />
				{:else}
					<Maximize2Icon />
				{/if}
			</button>
		</div>
	{/snippet}
	{@render children({ isFullScreen })}
</Card>
