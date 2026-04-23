<script lang="ts">
	let { cell }: { cell: (string | number | boolean | Date)[] } = $props()
</script>

<td>
	{#each cell as content}
		<span class="mr-1 badge whitespace-nowrap">
			{content}
		</span>
	{/each}
</td>
