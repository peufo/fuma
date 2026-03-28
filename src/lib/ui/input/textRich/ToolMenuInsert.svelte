<script lang="ts">
	import { AtSignIcon, Clapperboard, ImagePlusIcon, MinusIcon, PlusIcon } from '@lucide/svelte';
	import type { Editor } from '@tiptap/core';
	import { suggestionItems } from './suggestion.js';
	import ToolMenu from './ToolMenu.svelte';

	let { editor, onInsertMedia }: { editor: Editor; onInsertMedia?: () => void } = $props();
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
			icon: Clapperboard,
			action: () => {
				const src = prompt('Lien youtube');
				if (!src) return;
				editor.commands.setYoutubeVideo({ src });
			}
		},
		{
			label: 'Valeur dynamic',
			icon: AtSignIcon,
			disable: !$suggestionItems.length,
			action: () => {
				const { from } = editor.state.selection;
				const lastChar = editor.state.doc.textBetween(from - 1, from);
				const charToAdd = lastChar === '' || lastChar === ' ' ? '@' : ' @';
				editor.chain().insertContent(charToAdd).focus().run();
			}
		}
	]}
/>
