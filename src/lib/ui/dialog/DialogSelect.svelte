<script lang="ts">
	import { type Options, parseOptions } from '$lib/utils/options.js'
	import Dialog from './Dialog.svelte'
	import type { DialogProps } from './openDialog.js'

	let {
		title = 'Choisir',
		message,
		options: optionsProp,
		cancelLabel = 'Annuler',
		resolve
	}: {
		/** Titre de l'en-tête */
		title?: string
		/** Texte du corps */
		message?: string
		/**
		 * Les choix, un bouton chacun, dans toutes les formes acceptées par `parseOptions`. Le
		 * premier est à droite et reçoit le focus; la `class` d'une option habille son bouton
		 * (`btn-primary`, `btn-error`…).
		 */
		options: Options
		/** Libellé du bouton d'annulation, calé à gauche */
		cancelLabel?: string
	} & DialogProps<string | undefined> = $props()

	const options = $derived(parseOptions(optionsProp))
	let actions = $state<HTMLDivElement>()

	function buttons() {
		return [...(actions?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') ?? [])]
	}

	// De vrais boutons: Tab, Entrée et Espace viennent du navigateur, et `Dialog` remet de
	// toute façon leurs `tabindex` à 0 à l'ouverture. On n'ajoute que ←/→, cycliques — le
	// pied est en `flex-row-reverse`, donc → remonte l'ordre du DOM.
	function onkeydown(event: KeyboardEvent) {
		const step = { ArrowLeft: 1, ArrowRight: -1 }[event.key]
		if (!step) return
		event.preventDefault()
		const items = buttons()
		if (!items.length) return
		const index = items.indexOf(document.activeElement as HTMLButtonElement)
		items[(index + step + items.length) % items.length].focus()
	}
</script>

<Dialog onOpen={() => buttons()[0]?.focus()} onClose={() => resolve(undefined)} hideCloseButton>
	{#snippet header()}
		<h3 class="title">{title}</h3>
	{/snippet}

	{#if message}
		<p>{message}</p>
	{/if}

	{#snippet footer()}
		<div bind:this={actions} class="border-hard flex flex-row-reverse flex-wrap gap-2 border-t p-4">
			{#each options as option (option.value)}
				{@const { value, label, icon: Icon, disabled, class: klass } = option}
				<button
					type="button"
					{value}
					{disabled}
					class={['btn', klass]}
					onclick={() => resolve(value)}
					{onkeydown}
				>
					{#if Icon}
						<Icon size={18} opacity={0.8} />
					{/if}
					{label}
				</button>
			{/each}
			<button
				type="button"
				class="btn mr-auto btn-ghost"
				onclick={() => resolve(undefined)}
				{onkeydown}
			>
				{cancelLabel}
			</button>
		</div>
	{/snippet}
</Dialog>
