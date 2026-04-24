<script lang="ts">
	import { type Snippet } from 'svelte'
	import { ButtonCopy } from '$lib/ui/copy/index.js'
	import { useMode } from '$lib/ui/mode/useMode.svelte.js'
	import { highlight, transformPackageImports } from './highlight.ts'

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

	let mode = $derived(useMode({ light: 'fuma', dark: 'fuma-dark' }))
	let displayCode = $derived(transformPackageImports(code.trim()))
	let highlighted = $derived(highlight(displayCode, lang, mode.current))
	let tab = $state<'preview' | 'code'>('code')

	let leftWidth = $state(50)
	let isDragging = $state(false)
	let container = $state<HTMLDivElement>()

	function setTab(t: 'preview' | 'code') {
		tab = t
		if (t === 'code') {
			leftWidth = 70
		} else {
			leftWidth = 30
		}
	}

	function startResize(e: MouseEvent) {
		e.preventDefault()
		isDragging = true
		window.addEventListener('mousemove', onResize)
		window.addEventListener('mouseup', stopResize)
	}

	function onResize(e: MouseEvent) {
		if (!isDragging || !container) return
		const rect = container.getBoundingClientRect()
		const x = e.clientX - rect.left
		const percent = (x / rect.width) * 100
		leftWidth = Math.max(20, Math.min(80, percent))
		tab = leftWidth >= 50 ? 'code' : 'preview'
	}

	function stopResize() {
		isDragging = false
		window.removeEventListener('mousemove', onResize)
		window.removeEventListener('mouseup', stopResize)
	}
</script>

<div class="not-prose my-6 overflow-hidden rounded-lg border">
	<div class="flex items-center gap-2 border-b bg-base-200/50 px-4 py-2">
		<span class="mr-auto text-sm font-semibold text-base-content/70">{title}</span>

		<div class="tabs-boxed tabs tabs-sm">
			<button class="tab" class:tab-active={tab === 'code'} onclick={() => setTab('code')}>
				Code
			</button>
			<button class="tab" class:tab-active={tab === 'preview'} onclick={() => setTab('preview')}>
				Preview
			</button>
		</div>

		<ButtonCopy value={displayCode} title="Copy code" class="btn btn-square btn-xs" />
	</div>

	<!-- Mobile: tabs -->
	<div class="md:hidden">
		{#if tab === 'code'}
			<div class="overflow-hidden">
				{#await highlighted then html}
					<div class="overflow-auto text-sm">
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

	<!-- Desktop: side by side with resizer -->
	<div class="hidden md:flex" bind:this={container}>
		<div
			class="overflow-hidden {isDragging ? '' : 'transition-[width] duration-300 ease-out'}"
			style="width: {leftWidth}%"
		>
			{#await highlighted then html}
				<div class="overflow-auto text-sm">
					{@html html}
				</div>
			{/await}
		</div>
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<div
			class="w-1.5 shrink-0 cursor-col-resize bg-base-300 transition-colors hover:bg-primary {isDragging
				? 'bg-primary'
				: ''}"
			onmousedown={startResize}
			role="separator"
			aria-label="Resize"
			tabindex="0"
		></div>
		<div class="min-w-0 flex-1 overflow-auto bg-base-100 p-6">
			{@render preview()}
		</div>
	</div>
</div>
