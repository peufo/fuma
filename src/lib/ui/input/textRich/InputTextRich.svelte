<script lang="ts">
	import { createEventDispatcher, onMount, type ComponentProps } from 'svelte'
	import { Editor } from '@tiptap/core'
	import debounce from 'debounce'

	import { jsonParse } from '$lib/utils/jsonParse.js'
	import { FormControl } from '$lib/ui/input/index.js'
	import ToolsBar from './ToolsBar.svelte'
	import { extensions } from './extensions.js'

	type $$Props = ComponentProps<FormControl> & { value?: string; classToolbar?: string }

	export let value = ''
	export let classToolbar = ''

	let element: HTMLDivElement
	let editor: Editor | null = null

	const dispatch = createEventDispatcher<{ change: void }>()

	onMount(() => {
		initEditor()
		return () => {
			if (editor) editor.destroy()
		}
	})

	export function setImage(image: { src: string; alt: string }) {
		if (!editor) return false
		return editor.commands.setImage(image)
	}

	function initEditor() {
		const valueAsHtml = !value.startsWith('{') && value !== 'null'
		editor = new Editor({
			element,
			content: valueAsHtml ? value : jsonParse(value, undefined),
			editorProps: {
				attributes: {
					class: 'prose max-w-[210mm] mx-auto focus:outline-none'
				}
			},
			extensions,
			onTransaction() {
				editor = editor
				updateValue()
			}
		})
	}

	const updateValue = debounce(() => {
		if (!editor) return
		const newValue = JSON.stringify(editor.getJSON())
		if (newValue === value) return
		value = newValue
		dispatch('change')
	}, 120)
</script>

<FormControl {...$$restProps}>
	{#snippet children({ key })}
		<div class="bordered relative rounded-lg border">
			{#if editor}
				<ToolsBar {editor} class={classToolbar} />
			{/if}
			<div bind:this={element} class="min-h-80 p-4 pb-10"></div>
		</div>
		{#if key}
			<input type="hidden" name={key} {value} />
		{/if}
	{/snippet}
</FormControl>
