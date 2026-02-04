<script lang="ts">
	import { mdiCannabis } from '@mdi/js'
	import Meta from '$lib/private/Meta.svelte'
	import { Icon } from '$lib/ui/icon/index.js'
</script>

<Meta name="Icon">
	<div class="flex justify-center gap-2">
		<Icon path={mdiCannabis} title="Hello 👋" />

		<button class="btn btn-square btn-sm">
			<Icon path={mdiCannabis} title="Hello 👋" />
		</button>
	</div>
</Meta>
