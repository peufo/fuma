<script lang="ts">
	import { CheckIcon, XIcon } from '@lucide/svelte'

	let { cell }: { cell: boolean } = $props()
</script>

<td>
	{#if cell}
		<CheckIcon class="text-success" />
	{:else}
		<XIcon class="text-error" />
	{/if}
</td>
