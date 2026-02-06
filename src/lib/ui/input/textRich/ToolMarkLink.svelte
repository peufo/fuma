<script lang="ts">
	import z from 'zod'
	import type { Editor } from '@tiptap/core'
	import { LinkIcon } from '@lucide/svelte'

	import { Dialog } from '$lib/ui/dialog/index.js'
	import { InputText } from '$lib/ui/input/index.js'
	import ToolMark from './ToolMark.svelte'

	let {
		editor = $bindable()
	}: {
		editor: Editor
	} = $props()

	let dialogLink = $state<HTMLDialogElement>()
	let linkHref = $state('')
	let linkError = $state('')

	async function handleNewLink() {
		if (!linkHref) {
			linkError = 'URL requis'
			return
		}

		const isEmail = z.email().safeParse(linkHref)
		if (isEmail.success) linkHref = 'mailto:' + linkHref
		else if (!linkHref.match(/^http(s)?:\/\//)) {
			linkHref = 'https://' + linkHref
		}
		const isUrl = z.url().safeParse(linkHref)
		if (!isUrl.success) {
			linkError = 'URL invalide'
			return
		}

		editor.chain().focus().setLink({ href: linkHref }).run()
		dialogLink?.close()
	}

	function handleRemoveLink() {
		editor.chain().focus().unsetLink().run()
		dialogLink?.close()
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key !== 'Enter') return
		event.preventDefault()
		handleNewLink()
	}
</script>

<ToolMark
	{editor}
	key="link"
	label="Lien"
	Icon={LinkIcon}
	action={() => {
		const firstChild = editor.state.selection.content().content.firstChild
		linkHref = editor.getAttributes('link').href || firstChild?.textContent || ''
		dialogLink?.showModal()
	}}
/>

<Dialog bind:dialog={dialogLink}>
	{#snippet header()}
		<h3 class="title">Éditer un lien</h3>
	{/snippet}
	<div class="flex flex-col gap-2">
		<InputText bind:value={linkHref} bind:error={linkError} onkeydown={handleKeyDown} />
		<div class="flex flex-row-reverse gap-2">
			<button type="button" class="btn" onclick={handleNewLink}> Valider </button>
			<button type="button" class="btn btn-ghost text-error" onclick={handleRemoveLink}>
				Supprimer
			</button>
		</div>
	</div>
</Dialog>
