<script lang="ts">
	import { Dialog, type DialogProps } from '$lib/ui/dialog/index.js'

	// Un dialogue sur mesure: rend un `<Dialog>` et appelle `resolve` avec sa valeur.
	let { label, resolve }: { label: string } & DialogProps<string | undefined> = $props()

	let value = $state('')
</script>

<Dialog hideCloseButton>
	{#snippet header()}
		<h3 class="title">{label}</h3>
	{/snippet}

	<form
		id="prompt"
		onsubmit={(event) => {
			event.preventDefault()
			resolve(value)
		}}
	>
		<input type="text" class="input w-full" bind:value />
	</form>

	{#snippet footer()}
		<div class="border-hard flex flex-wrap gap-2 border-t p-4">
			<button type="button" class="btn mr-auto btn-ghost" onclick={() => resolve(undefined)}>
				Annuler
			</button>
			<button type="submit" form="prompt" class="btn btn-primary">Valider</button>
		</div>
	{/snippet}
</Dialog>
