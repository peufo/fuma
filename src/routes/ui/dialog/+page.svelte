<script lang="ts">
	import Meta from '$lib/Meta.svelte'
	import { Dialog, DialogConfirm, Drawer, urlParam } from '$lib/index.js'

	let dialogComponent: Dialog
	let dialogElement: HTMLDialogElement

	let dialogConfirmComponent: DialogConfirm

	let drawer: Drawer
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

<Meta component={drawer} name="Drawer">
	<a class="btn" href={$urlParam.with({ 'drawer-1': 1 })}>Open drawer 1</a>

	<Drawer title="Drawer 1" bind:this={drawer} key="drawer-1">
		<h2 class="title">Hey 1</h2>
		<a class="btn" href={$urlParam.with({ 'drawer-2': 1 })}>Open drawer 2</a>
	</Drawer>
	<Drawer title="Drawer 2" key="drawer-2">
		<h2 class="title">Hey 2</h2>
		<a class="btn" href={$urlParam.with({ 'drawer-3': 1 })}>Open drawer 3</a>
	</Drawer>
	<Drawer title="Drawer 3" key="drawer-3">
		<h2 class="title">Hey 3</h2>
	</Drawer>
</Meta>
