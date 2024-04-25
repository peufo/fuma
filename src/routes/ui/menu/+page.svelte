<script lang="ts">
	import Meta from '$lib/Meta.svelte'
	import { DropDown, ContextMenu } from '$lib/index.js'
	import MenuContent from './MenuContent.svelte'

	let dropdown: DropDown
	let contextMenu: ContextMenu
</script>

<Meta component={dropdown} name="DropDown">
	<DropDown bind:this={dropdown}>
		<button class="btn" slot="activator">slot="activator"</button>
		<MenuContent />
	</DropDown>
</Meta>

<Meta component={contextMenu} name="ContextMenu">
	<button
		class="bordered grid h-80 place-content-center rounded border bg-base-200"
		on:click={(event) => contextMenu.show(event)}
	>
		<span>Click on me !</span>
	</button>

	<ContextMenu bind:this={contextMenu}>
		<div slot="header" class="title-md">slot="header"</div>
		<MenuContent />
	</ContextMenu>
</Meta>
