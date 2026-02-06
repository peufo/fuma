<script lang="ts">
	import type { Editor } from '@tiptap/core'
	import { tip } from '$lib/action/tip.js'
	import type { Component } from 'svelte'
	import type { IconProps } from '@lucide/svelte'

	let {
		editor,
		key,
		label,
		Icon,
		action
	}: {
		editor: Editor
		key: string
		label: string
		Icon: Component<IconProps>
		action: () => void
	} = $props()

	let isActive = $derived(editor.isActive(key))
</script>

<button
	type="button"
	use:tip={{ content: label, arrow: true }}
	class="menu-item {isActive ? 'bg-base-200/60' : ''}"
	onclick={action}
>
	<Icon size={19} class={isActive ? 'opacity-90' : 'opacity-60'} />
</button>
