<script lang="ts">
	import { Dialog } from '$lib/ui/dialog/index.js'
	import type { Snippet } from 'svelte'

	let {
		activator,
		header,
		children,
		action
	}: {
		activator: Snippet<[{ showModal: () => void }]>
		header?: Snippet
		children?: Snippet
		action?: Snippet
	} = $props()

	let dialog = $state<HTMLDialogElement>()
</script>

{@render activator({ showModal: () => dialog?.showModal() })}

<Dialog bind:dialog {header}>
	{@render children?.()}
	<div class="mt-10 flex justify-end gap-2">
		<button type="button" class="btn btn-ghost" onclick={() => dialog?.close()}> Annuler </button>
		{@render action?.()}
	</div>
</Dialog>
