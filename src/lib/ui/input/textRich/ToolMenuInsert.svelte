<script lang="ts">
	import type { Editor } from '@tiptap/core'
	import { PlusIcon, MinusIcon, ImagePlusIcon, YoutubeIcon, AtSignIcon } from '@lucide/svelte'

	import ToolMenu from './ToolMenu.svelte'
	import { suggestionItems } from './suggestion.js'

	let { editor, onInsertMedia }: { editor: Editor; onInsertMedia?: () => void } = $props()
</script>

<ToolMenu
	{editor}
	hideLabel
	Icon={PlusIcon}
	tools={[
		{
			label: 'Séparateur',
			icon: MinusIcon,
			action: () => editor.commands.setHorizontalRule()
		},
		{
			label: 'Image',
			icon: ImagePlusIcon,
			action: () => onInsertMedia?.()
		},
		{
			label: 'Vidéo',
			icon: YoutubeIcon,
			action: () => {
				const src = prompt('Lien youtube')
				if (!src) return
				editor.commands.setYoutubeVideo({ src })
			}
		},
		{
			label: 'Valeur dynamic',
			icon: AtSignIcon,
			disable: !$suggestionItems.length,
			action: () => {
				const { from } = editor.state.selection
				const lastChar = editor.state.doc.textBetween(from - 1, from)
				const charToAdd = lastChar === '' || lastChar === ' ' ? '@' : ' @'
				editor.chain().insertContent(charToAdd).focus().run()
			}
		}
	]}
/>
