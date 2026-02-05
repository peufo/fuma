<script lang="ts">
	import { slide } from 'svelte/transition'
	import { ChevronRightIcon } from '@lucide/svelte'
	import type { Snippet } from 'svelte'

	let {
		title = '',
		isActive = false,
		isReducible = false,
		class: klass = '',
		contentClass = '',
		titleSnippet,
		children
	}: {
		isActive?: boolean
		class?: string
		contentClass?: string
		titleSnippet?: Snippet
		children: Snippet
	} & ({ isReducible: true; title: string } | { isReducible?: false; title?: string }) = $props()

	function open() {
		isActive = true
	}
	function toggle(event: Event) {
		event.stopPropagation()
		isActive = !isActive
	}
</script>

<div>
	{#if isReducible && isActive}
		<div class="h-4" transition:slide></div>
	{/if}

	<section class="{klass} flex flex-col">
		<div
			onclick={open}
			onkeyup={open}
			role={isReducible && !isActive ? 'button' : undefined}
			class="flex items-center gap-2 py-2
				{isReducible && !isActive ? 'cursor-pointer rounded-lg hover:bg-base-200/40' : ''}
			"
			class:rounded-lg={!isActive}
			class:border={isReducible && !isActive}
		>
			{#if titleSnippet}
				{@render titleSnippet()}
			{:else if isReducible || title}
				<h2
					class="title-md origin-left pl-1 transition-transform"
					class:translate-x-4={isReducible && !isActive}
					class:scale-105={isReducible && isActive}
				>
					{title}
				</h2>
			{/if}
			{#if isReducible}
				<div class="grow"></div>
				<button
					type="button"
					onclick={toggle}
					class="btn btn-square btn-ghost btn-sm transition-transform"
					class:-translate-x-2={isReducible && !isActive}
				>
					<ChevronRightIcon class="transition-transform {isActive ? 'rotate-90' : ''}" />
				</button>
			{/if}
		</div>

		{#if !isReducible || isActive}
			<div transition:slide|local={{ duration: 200 }} class="{contentClass} grow py-4">
				{@render children()}
			</div>
		{:else}
			<div class="hidden">
				{@render children()}
			</div>
		{/if}
	</section>

	{#if isReducible && isActive}
		<div class="h-8" transition:slide></div>
	{/if}
</div>
