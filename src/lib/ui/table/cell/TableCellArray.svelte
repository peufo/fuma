<script lang="ts">
	let { cell }: { cell: (string | number | boolean | Date)[] } = $props()
</script>

<td>
	{#each cell as content}
		<span class="badge mr-1 whitespace-nowrap">
			{content}
		</span>
	{/each}
</td>
