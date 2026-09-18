<script lang="ts">
	import { CheckIcon, MailsIcon } from '@lucide/svelte'
	import { toast } from 'svelte-sonner'
	import { confirmDialog, openDialog, selectDialog } from '$lib/ui/dialog/index.js'
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

	async function notify() {
		// `choice` est typé `'confirmAndSendEmail' | 'confirm' | undefined`.
		const choice = await selectDialog({
			title: 'Notifier les participants',
			message: 'Souhaitez-vous envoyer des emails aux participants concernés par ces changements ?',
			options: [
				{
					value: 'confirmAndSendEmail',
					label: 'Valider et notifier',
					icon: MailsIcon,
					class: 'btn-primary'
				},
				{ value: 'confirm', label: 'Valider', icon: CheckIcon }
			]
		})
		if (choice === undefined) return toast('Annulé')
		toast(choice === 'confirmAndSendEmail' ? 'Validé, emails envoyés' : 'Validé')
	}
</script>

<div class="flex flex-wrap gap-2">
	<button class="btn" onclick={remove}>confirmDialog</button>
	<button class="btn" onclick={rename}>openDialog</button>
	<button class="btn" onclick={notify}>selectDialog</button>
</div>
