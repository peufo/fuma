<script lang="ts">
	import { toast } from 'svelte-sonner'
	import { confirmDialog, openDialog } from '$lib/ui/dialog/index.js'
	import UsagePrompt from './UsagePrompt.svelte'

	async function remove() {
		const confirmed = await confirmDialog({
			title: 'Supprimer ?',
			message: 'Cette action est irréversible.',
			confirmLabel: 'Supprimer',
			danger: true
		})
		toast(confirmed ? 'Supprimé' : 'Annulé')
	}

	async function rename() {
		const name = await openDialog(UsagePrompt, { label: 'Nouveau nom' })
		toast(name === undefined ? 'Annulé' : `Renommé en « ${name} »`)
	}
</script>

<div class="flex gap-2">
	<button class="btn" onclick={remove}>confirmDialog</button>
	<button class="btn" onclick={rename}>openDialog</button>
</div>
