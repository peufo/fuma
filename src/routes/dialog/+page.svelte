<script lang="ts">
	import Meta from '$lib/Meta.svelte'
	import { Dialog } from '$lib/index.js'

	let dialog: HTMLDialogElement
	let component: Dialog
</script>

<Meta {component} name="Dialog">
	<button class="btn" on:click={() => dialog.showModal()}>Ouvrir dialog</button>

	<Dialog bind:this={component} bind:dialog>
		<div slot="header">slot="header"</div>
		slot
		<div slot="footer">slot="footer"</div>
	</Dialog>
</Meta>
