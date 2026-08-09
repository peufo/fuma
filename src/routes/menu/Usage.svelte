<script lang="ts">
	import { ContextMenu, DropDown } from '$lib/ui/menu/index.js'
	import MenuContent from './MenuContent.svelte'

	let contextMenu: ContextMenu
</script>

<DropDown>
	{#snippet activator()}
		<button class="btn">snippet="activator"</button>
	{/snippet}
	<MenuContent />
</DropDown>

<button
	class="grid h-80 place-content-center rounded border bg-base-200"
	on:click={(event) => contextMenu.show(event)}
>
	<span>Click on me !</span>
</button>

<ContextMenu bind:this={contextMenu}>
	<MenuContent />
</ContextMenu>

<div class="h-60"></div>
