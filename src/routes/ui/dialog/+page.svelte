<script lang="ts">
	import { Dialog, DialogConfirm } from '$lib/ui/dialog/index.js'

	let dialogElement: HTMLDialogElement
</script>

<button class="btn" onclick={() => dialogElement.showModal()}>Ouvrir dialog</button>

<Dialog bind:dialog={dialogElement}>
	{#snippet header()}
		<div>snippet="header"</div>
	{/snippet}
	children
	{#snippet footer()}
		<div>snippet="footer"</div>
	{/snippet}
</Dialog>

<DialogConfirm>
	{#snippet activator({ showModal })}
		<button class="btn btn-ghost" onclick={showModal}>Dangerous action ?</button>
	{/snippet}
	{#snippet header()}
		<div>snippet="header"</div>
	{/snippet}
	<span>children</span>
	{#snippet action()}
		<div>snippet="action"</div>
	{/snippet}
</DialogConfirm>

<div class="my-40 h-350 rounded bg-green-300"></div>
