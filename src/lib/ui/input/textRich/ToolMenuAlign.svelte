<script lang="ts">
	import type { Editor } from '@tiptap/core'
	import {
		TextAlignStartIcon,
		TextAlignCenterIcon,
		TextAlignEndIcon,
		ListIndentIncreaseIcon,
		ListIndentDecreaseIcon
	} from '@lucide/svelte'
	import ToolMenu from './ToolMenu.svelte'

	let { editor }: { editor: Editor } = $props()
</script>

<ToolMenu
	{editor}
	hideLabel
	tools={[
		{
			attributes: { textAlign: 'left' },
			label: 'Aligner à gauche',
			icon: TextAlignStartIcon,
			action: () => editor.commands.setTextAlign('left')
		},
		{
			attributes: { textAlign: 'center' },
			label: 'Aligner au centre',
			icon: TextAlignCenterIcon,
			action: () => editor.commands.setTextAlign('center')
		},
		{
			attributes: { textAlign: 'right' },
			label: 'Aligner à droite',
			icon: TextAlignEndIcon,
			action: () => editor.commands.setTextAlign('right')
		},
		{
			newSection: true,
			label: 'Retrait à droite',
			icon: ListIndentIncreaseIcon,
			action: () => editor.commands.indent()
		},
		{
			label: 'Retrait à droite',
			icon: ListIndentDecreaseIcon,
			action: () => editor.commands.outdent()
		}
	]}
/>
