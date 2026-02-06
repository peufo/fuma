<script lang="ts">
	import type { Editor } from '@tiptap/core'
	import { ChevronDownIcon, type IconProps } from '@lucide/svelte'
	import { DropDown } from '$lib/ui/menu/index.js'
	import type { Component, Snippet } from 'svelte'

	type Tool = {
		key?: string
		attributes?: {}
		label: string
		icon: Component<IconProps>
		action: () => unknown
		newSection?: true
		disable?: boolean
	}

	let {
		editor,
		tools,
		hideLabel = false,
		Icon
	}: {
		editor: Editor
		tools: Tool[]
		hideLabel?: boolean
		Icon?: Component<IconProps>
	} = $props()

	let dropdown = $state<DropDown>()

	function handleClick(tool: Tool) {
		tool.action()
		dropdown?.hide()
	}

	let toolSelected = $derived(
		tools.find((t) => {
			if (t.key) return editor.isActive(t.key, t.attributes)
			if (t.attributes) return editor.isActive(t.attributes)
			return false
		}) || tools[0]
	)
</script>

<DropDown hideOnBlur bind:this={dropdown}>
	{#snippet activator()}
		<button type="button" class="menu-item gap-2">
			{#if Icon}
				<Icon size={20} class="opacity-70" />
			{:else}
				<toolSelected.icon size={20} class="opacity-70" />
			{/if}
			{#if !hideLabel}
				<span class="text-sm font-light">{toolSelected.label}</span>
			{/if}
			<ChevronDownIcon size={20} class="translate-y-px opacity-70" />
		</button>
	{/snippet}

	{#each tools as tool}
		{#if tool.newSection}
			<hr class="my-2" />
		{/if}
		<button
			disabled={tool.disable}
			type="button"
			class="menu-item w-full"
			class:disabled={tool.disable}
			class:opacity-60={tool.disable}
			onclick={() => handleClick(tool)}
		>
			<tool.icon size={20} class="opacity-70" />
			<span>
				{tool.label}
			</span>
		</button>
	{/each}
</DropDown>
