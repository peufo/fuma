<script lang="ts">
	import { toast } from 'svelte-sonner'
	import { mdiWan } from '@mdi/js'

	import Meta from '$lib/Meta.svelte'
	import { DropDown, ContextMenu, DropDownMenu, Icon } from '$lib/ui/index.js'
	import MenuContent, { menuOptions } from './MenuContent.svelte'

	let dropdown: DropDown
	let contextMenu: ContextMenu
	let dropdownMenu: DropDownMenu
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

<Meta component={dropdownMenu} name="DropDownMenu">
	<div class="flex justify-around">
		<DropDownMenu
			bind:this={dropdownMenu}
			options={menuOptions}
			on:select={({ detail: value }) => toast(value)}
		/>
		<DropDownMenu options={menuOptions} on:select={({ detail: value }) => toast(value)}>
			<button type="button" class="btn btn-square">
				<Icon path={mdiWan} />
			</button>
		</DropDownMenu>
	</div>
</Meta>

<div class="h-60"></div>
