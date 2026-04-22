<script lang="ts">
	import { type Snippet } from 'svelte';
	import { useMode } from '$lib/ui/mode/useMode.svelte.js';
	import { highlight } from './highlight.ts';

	let {
		code,
		title,
		lang = 'svelte',
		preview
	}: {
		code: string;
		title?: string;
		lang?: string;
		preview: Snippet;
	} = $props();

	let mode = $derived(useMode());
	let highlighted = $derived(highlight(code.trim(), lang, mode.current));
	let tab = $state<'preview' | 'code'>('preview');
</script>

<div class="not-prose my-6 overflow-hidden">
	<div class="flex items-center gap-2 bg-base-200/50">
		{#if title}
			<span class="title-sm mr-auto">{title}</span>
		{:else}
			<span class="mr-auto"></span>
		{/if}

		<div class="tabs-lift tabs">
			<button class="tab" class:tab-active={tab === 'preview'} onclick={() => (tab = 'preview')}>
				Preview
			</button>
			<button class="tab" class:tab-active={tab === 'code'} onclick={() => (tab = 'code')}>
				Code
			</button>
		</div>

		<!-- <ButtonCopy value={code} title="Copy code" class="btn btn-square" /> -->
	</div>

	{#if tab === 'preview'}
		<div class="rounded-lg rounded-tr-none border bg-base-100 p-6">
			{@render preview()}
		</div>
	{:else}
		<div class="overflow-hidden rounded-lg rounded-tr-none border">
			{#await highlighted then html}
				<div class="max-h-96 overflow-auto">
					{@html html}
				</div>
			{/await}
		</div>
	{/if}
</div>
