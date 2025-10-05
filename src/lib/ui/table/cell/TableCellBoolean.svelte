<script lang="ts">
	import { mdiCheck, mdiClose } from '@mdi/js'
	import { Icon } from '$lib/ui/icon/index.js'

	let { cell }: { cell: boolean } = $props()
</script>

<td>
	{#if cell}
		<Icon path={mdiCheck} class="fill-success" />
	{:else}
		<Icon path={mdiClose} class="fill-error" />
	{/if}
</td>
