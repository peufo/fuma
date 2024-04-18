<script lang="ts">
	import Meta from '$lib/Meta.svelte'
	import { Dialog, DialogConfirm } from '$lib/index.js'

	let dialogComponent: Dialog
	let dialogElement: HTMLDialogElement

	let dialogConfirmComponent: DialogConfirm
</script>

<Meta component={dialogComponent} name="Dialog">
	<button class="btn" on:click={() => dialogElement.showModal()}>Ouvrir dialog</button>

	<Dialog bind:this={dialogComponent} bind:dialog={dialogElement}>
		<div slot="header">slot="header"</div>
		slot
		<div slot="footer">slot="footer"</div>
	</Dialog>
</Meta>

<Meta component={dialogConfirmComponent} name="DialogConfirm">
	<DialogConfirm bind:this={dialogConfirmComponent}>
		<div slot="activator">slot="activator"</div>
		<div slot="header">slot="header"</div>
		slot
		<div slot="action">slot="action"</div>
	</DialogConfirm>
</Meta>
