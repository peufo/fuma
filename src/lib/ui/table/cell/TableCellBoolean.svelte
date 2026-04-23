<script lang="ts">
	import { CheckIcon, XIcon } from '@lucide/svelte'

	let { cell }: { cell: boolean } = $props()
</script>

<td>
	{#if cell}
		<CheckIcon class="fill-success" />
	{:else}
		<XIcon class="fill-error" />
	{/if}
</td>
