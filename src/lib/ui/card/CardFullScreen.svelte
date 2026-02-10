<script lang="ts">
	import type { ComponentProps, Snippet } from 'svelte'
	import { Maximize2Icon, Minimize2Icon } from '@lucide/svelte'
	import { Card } from '$lib/ui/card/index.js'

	let {
		isFullScreen = false,
		class: _class,
		snipAction: _snipAction,
		bodyClass,
		children,
		...props
	}: {
		isFullScreen?: boolean
		children: Snippet<[{ isFullScreen: boolean }]>
	} & ComponentProps<typeof Card> = $props()
</script>

<Card
	class={[_class, isFullScreen && 'fixed inset-2 p-2']}
	bodyClass={[bodyClass, isFullScreen && 'sm:p-2 grow overflow-hidden']}
	{...props}
>
	{#snippet snipAction()}
		<div class="flex gap-2">
			{@render _snipAction?.()}
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
