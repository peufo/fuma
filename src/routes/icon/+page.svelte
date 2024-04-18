<script lang="ts">
	import { mdiAbacus } from '@mdi/js'
	import Meta from '$lib/Meta.svelte'
	import { Icon } from '$lib/index.js'

	let icon: Icon
</script>

<Meta component={icon}>
	<Icon bind:this={icon} path={mdiAbacus} />
</Meta>
