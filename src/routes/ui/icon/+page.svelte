<script lang="ts">
	import { mdiCannabis } from '@mdi/js'
	import Meta from '$lib/Meta.svelte'
	import { Icon } from '$lib/index.js'

	let icon: Icon
</script>

<Meta component={icon} name="Icon">
	<div class="flex gap-2 justify-center">
		<Icon bind:this={icon} path={mdiCannabis} title="Hello 👋" />

		<button class="btn btn-square btn-sm">
			<Icon bind:this={icon} path={mdiCannabis} title="Hello 👋" />
		</button>
	</div>
</Meta>
