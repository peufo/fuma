<script lang="ts">
	import { mdiCannabis } from '@mdi/js'
	import Meta from '$lib/Meta.svelte'
	import { Icon } from '$lib/ui/icon/index.js'

	let icon: Icon
</script>

<Meta component={icon} name="Icon">
	<div class="flex justify-center gap-2">
		<Icon bind:this={icon} path={mdiCannabis} title="Hello 👋" />

		<button class="btn btn-square btn-sm">
			<Icon bind:this={icon} path={mdiCannabis} title="Hello 👋" />
		</button>
	</div>
</Meta>
