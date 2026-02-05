<script lang="ts">
	import { urlParam } from '$lib/store/param.js'
	import { Dialog, DialogConfirm } from '$lib/ui/dialog/index.js'
	import { Drawer } from '$lib/ui/drawer/index.js'

	let dialogElement: HTMLDialogElement
</script>

<button class="btn" on:click={() => dialogElement.showModal()}>Ouvrir dialog</button>

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
	{#snippet activator()}
		<div>snippet="activator"</div>
	{/snippet}
	{#snippet header()}
		<div>snippet="header"</div>
	{/snippet}
	children
	{#snippet action()}
		<div>snippet="action"</div>
	{/snippet}
</DialogConfirm>

<a class="btn" href={$urlParam.with({ 'drawer-1': 1 })} data-sveltekit-noscroll> Open drawer 1</a>

<Drawer title="Drawer 1" key="drawer-1">
	<h2 class="title">Hey 1</h2>
	<a class="btn" href={$urlParam.with({ 'drawer-2': 1 })} data-sveltekit-noscroll>
		Open drawer 2
	</a>
</Drawer>
<Drawer title="Drawer 3" key="drawer-3">
	<h2 class="title">Hey 3</h2>
</Drawer>
<Drawer title="Drawer 2" key="drawer-2">
	<h2 class="title">Hey 2</h2>
	<a class="btn" href={$urlParam.with({ 'drawer-3': 1 })} data-sveltekit-noscroll>
		Open drawer 3
	</a>
</Drawer>

<DialogConfirm>
	{#snippet activator()}
		<button class="btn btn-ghost">snippet="activator"</button>
	{/snippet}
	{#snippet header()}
		<div>snippet="header"</div>
	{/snippet}
	<span>children</span>
	{#snippet action()}
		<div>snippet="action"</div>
	{/snippet}
</DialogConfirm>

<a class="btn" href={$urlParam.with({ drawer_no_overlay: 1 })} data-sveltekit-noscroll>
	Open no overlay drawer
</a>

<Drawer title="No overlay brpo" key="drawer_no_overlay" noOverlay maxWidth="200px">
	<h2 class="title">Hey</h2>
	<p>Open drawer not overlay</p>
</Drawer>

<div class="my-40 h-350 rounded bg-green-300"></div>
