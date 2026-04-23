<script lang="ts">
	import { PrinterCheckIcon } from '@lucide/svelte'
	import { toast } from 'svelte-sonner'
	import { fruitsOptions } from '$lib/data.ts'
	import { ContextMenu, DropDown, DropDownMenu } from '$lib/ui/menu/index.js'
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
	class="bordered grid h-80 place-content-center rounded border bg-base-200"
	on:click={(event) => contextMenu.show(event)}
>
	<span>Click on me !</span>
</button>

<ContextMenu bind:this={contextMenu}>
	<MenuContent />
</ContextMenu>

<div class="flex justify-around">
	<DropDownMenu options={fruitsOptions} onSelect={(value) => toast(value)} />
	<DropDownMenu options={fruitsOptions} onSelect={(value) => toast(value)}>
		<button type="button" class="btn btn-square">
			<PrinterCheckIcon />
		</button>
	</DropDownMenu>
</div>

<div class="h-60"></div>
