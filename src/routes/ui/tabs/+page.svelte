<script lang="ts">
	import Meta from '$lib/Meta.svelte'
	import { Tabs, TabsIcon } from '$lib/ui/tabs/index.js'
	import { mdiCardMultipleOutline, mdiFormatListBulleted } from '@mdi/js'

	let tabsComponent: Tabs
	let tabsIconComponent: TabsIcon
</script>

<Meta component={tabsComponent} name="Tabs">
	<Tabs
		bind:this={tabsComponent}
		tabs={[
			{
				href: '#card',
				label: 'Carte',
				icon: mdiCardMultipleOutline,
				isActive: true
			},
			{ href: '#list', label: 'Liste', icon: mdiFormatListBulleted }
		]}
	/>
</Meta>

<Meta component={tabsIconComponent} name="TabsIcon">
	<div class="flex justify-start">
		<TabsIcon
			bind:this={tabsIconComponent}
			key="display"
			options={[
				{ value: 'list', label: 'Cartes', icon: mdiCardMultipleOutline },
				{ value: 'table', label: 'Liste', icon: mdiFormatListBulleted }
			]}
		/>
	</div>
</Meta>
