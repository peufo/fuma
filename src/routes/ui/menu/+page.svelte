<script lang="ts">
	import { toast } from 'svelte-sonner'
	import { PrinterCheckIcon } from '@lucide/svelte'
	import { DropDown, ContextMenu, DropDownMenu } from '$lib/ui/menu/index.js'
	import MenuContent, { menuOptions } from './MenuContent.svelte'

	let contextMenu: ContextMenu
</script>

<DropDown>
	{#snippet activator()}
		<button class="btn">snippet="activator"</button>
	{/snippet}
	<MenuContent />
</DropDown>

<button
	class="bordered bg-base-200 grid h-80 place-content-center rounded border"
	on:click={(event) => contextMenu.show(event)}
>
	<span>Click on me !</span>
</button>

<ContextMenu bind:this={contextMenu}>
	<MenuContent />
</ContextMenu>

<div class="flex justify-around">
	<DropDownMenu options={menuOptions} onSelect={(value) => toast(value)} />
	<DropDownMenu options={menuOptions} onSelect={(value) => toast(value)}>
		<button type="button" class="btn btn-square">
			<PrinterCheckIcon />
		</button>
	</DropDownMenu>
</div>

<div class="h-60"></div>
