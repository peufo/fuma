<script lang="ts">
	import { type Snippet } from 'svelte'
	import { ButtonCopy } from '$lib/ui/button/index.js'
	import { useMode } from '$lib/ui/mode/useMode.svelte.js'
	import { highlight } from './highlight.ts'

	let {
		code,
		title,
		lang = 'svelte',
		preview
	}: {
		code: string
		title?: string
		lang?: string
		preview: Snippet
	} = $props()

	let mode = $derived(useMode())
	let highlighted = $derived(highlight(code.trim(), lang, mode.current))
	let tab = $state<'preview' | 'code'>('code')
</script>

<div class="not-prose my-6 overflow-hidden rounded-lg border">
	<div class="flex items-center gap-2 border-b bg-base-200/50 px-4 py-2">
		<span class="title mr-auto">{title}</span>

		<div class="tabs-boxed tabs tabs-sm md:hidden">
			<button class="tab" class:tab-active={tab === 'code'} onclick={() => (tab = 'code')}>
				Code
			</button>
			<button class="tab" class:tab-active={tab === 'preview'} onclick={() => (tab = 'preview')}>
				Preview
			</button>
		</div>

		<ButtonCopy value={code} title="Copy code" class="btn btn-square btn-xs" />
	</div>

	<!-- Mobile: tabs -->
	<div class="md:hidden">
		{#if tab === 'code'}
			<div class="overflow-hidden">
				{#await highlighted then html}
					<div class="max-h-96 overflow-auto">
						{@html html}
					</div>
				{/await}
			</div>
		{:else}
			<div class="bg-base-100 p-6">
				{@render preview()}
			</div>
		{/if}
	</div>

	<!-- Desktop: side by side (code left, preview right) -->
	<div class="hidden md:grid md:grid-cols-3">
		<div class="col-span-2 overflow-hidden border-r">
			{#await highlighted then html}
				<div class="h-full max-h-96 overflow-auto">
					{@html html}
				</div>
			{/await}
		</div>
		<div class="bg-base-100 p-6">
			{@render preview()}
		</div>
	</div>
</div>
