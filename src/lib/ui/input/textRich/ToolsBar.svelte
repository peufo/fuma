<script lang="ts">
	import type { Editor } from '@tiptap/core'
	import { mdiFormatBold, mdiFormatColorFill, mdiFormatColorText, mdiFormatItalic } from '@mdi/js'
	import { toast } from 'svelte-sonner'

	import ToolMenuNode from './ToolMenuNode.svelte'
	import ToolMark from './ToolMark.svelte'
	import ToolMarkColor from './ToolMarkColor.svelte'
	import ToolMarkLink from './ToolMarkLink.svelte'
	import ToolMenuAlign from './ToolMenuAlign.svelte'
	import ToolMenuInsert from './ToolMenuInsert.svelte'

	export let editor: Editor
	let klass = ''
	export { klass as class }
</script>

<div
	class="
		 sticky top-0 z-10 overflow-y-visible rounded-t-xl border-b bg-base-100
		{klass}
	"
>
	<div class="flex overflow-x-auto p-2">
		<ToolMenuNode {editor} />
		<ToolMenuAlign {editor} />
		<div class="mx-1 my-auto h-6 border border-y-0 border-l-0" />

		<ToolMark
			{editor}
			key="bold"
			label="Gras (Ctrl+B)"
			icon={mdiFormatBold}
			action={() => editor.chain().focus().toggleBold().run()}
		/>
		<ToolMark
			{editor}
			key="italic"
			label="Italic (Ctrl+C)"
			icon={mdiFormatItalic}
			action={() => editor.chain().focus().toggleItalic().run()}
		/>
		<ToolMarkLink {editor} />
		<ToolMarkColor
			icon={mdiFormatColorText}
			label="Couleur du text"
			color={editor.getAttributes('textStyle').color || '#000000'}
			setColor={editor.commands.setColor}
		/>
		<ToolMarkColor
			icon={mdiFormatColorFill}
			label="Couleur du fond"
			color={editor.getAttributes('highlight').color || '#e51f68'}
			setColor={(color) => editor.commands.setHighlight({ color })}
		/>

		<div class="mx-1 my-auto h-6 border border-y-0 border-l-0" />

		<ToolMenuInsert {editor} on:insertMedia />
	</div>
</div>
