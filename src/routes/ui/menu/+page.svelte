<script lang="ts">
	import { toast } from 'svelte-sonner'
	import { mdiWan } from '@mdi/js'

	import Meta from '$lib/private/Meta.svelte'
	import { Icon } from '$lib/ui/icon/index.js'
	import { DropDown, ContextMenu, DropDownMenu } from '$lib/ui/menu/index.js'
	import MenuContent, { menuOptions } from './MenuContent.svelte'

	let contextMenu: ContextMenu
</script>

<Meta name="DropDown">
	<DropDown>
		<button class="btn" slot="activator">slot="activator"</button>
		<MenuContent />
	</DropDown>
</Meta>

<Meta name="ContextMenu">
	<button
		class="bordered bg-base-200 grid h-80 place-content-center rounded border"
		on:click={(event) => contextMenu.show(event)}
	>
		<span>Click on me !</span>
	</button>

	<ContextMenu bind:this={contextMenu}>
		<div slot="header" class="title-md">slot="header"</div>
		<MenuContent />
	</ContextMenu>
</Meta>

<Meta name="DropDownMenu">
	<div class="flex justify-around">
		<DropDownMenu options={menuOptions} on:select={({ detail: value }) => toast(value)} />
		<DropDownMenu options={menuOptions} on:select={({ detail: value }) => toast(value)}>
			<button type="button" class="btn btn-square">
				<Icon path={mdiWan} />
			</button>
		</DropDownMenu>
	</div>
</Meta>

<div class="h-60"></div>
