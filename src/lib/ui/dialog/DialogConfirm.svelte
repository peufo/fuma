<script lang="ts">
	import Dialog from './Dialog.svelte'
	import type { DialogProps } from './openDialog.js'

	let {
		title = 'Confirmer',
		message = '',
		confirmLabel = 'Confirmer',
		cancelLabel = 'Annuler',
		danger = false,
		resolve
	}: {
		/** Titre de l'en-tête */
		title?: string
		/** Texte du corps */
		message?: string
		/** Libellé du bouton de confirmation */
		confirmLabel?: string
		/** Libellé du bouton d'annulation */
		cancelLabel?: string
		/** Action destructive: confirmation en `btn-error`, focus initial sur l'annulation */
		danger?: boolean
	} & DialogProps<boolean> = $props()

	let confirmButton = $state<HTMLButtonElement>()
	let cancelButton = $state<HTMLButtonElement>()
</script>

<!-- Entrée confirme, comme `window.confirm`, sauf pour une action destructive. -->
<Dialog
	onOpen={() => (danger ? cancelButton : confirmButton)?.focus()}
	onClose={() => resolve(false)}
	hideCloseButton
>
	{#snippet header()}
		<h3 class="title">{title}</h3>
	{/snippet}

	<p>{message}</p>

	{#snippet footer()}
		<div class="flex flex-wrap gap-2 border-t border-hard p-4">
			<button
				type="button"
				class="btn mr-auto btn-ghost"
				bind:this={cancelButton}
				onclick={() => resolve(false)}
			>
				{cancelLabel}
			</button>
			<button
				type="button"
				class={['btn', danger ? 'btn-error' : 'btn-primary']}
				bind:this={confirmButton}
				onclick={() => resolve(true)}
			>
				{confirmLabel}
			</button>
		</div>
	{/snippet}
</Dialog>
