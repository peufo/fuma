<script lang="ts">
	import Meta from '$lib/private/Meta.svelte'
	import { Tabs, TabsIcon } from '$lib/ui/tabs/index.js'
	import { mdiCardMultipleOutline, mdiFormatListBulleted } from '@mdi/js'
</script>

<Meta name="Tabs">
	<Tabs
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

<Meta name="TabsIcon">
	<div class="flex justify-start">
		<TabsIcon
			key="display"
			options={[
				{ value: 'list', label: 'Cartes', icon: mdiCardMultipleOutline },
				{ value: 'table', label: 'Liste', icon: mdiFormatListBulleted }
			]}
		/>
	</div>
</Meta>
