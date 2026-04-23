<script lang="ts">
	let { cell }: { cell: Date } = $props()
</script>

<td>
	<span>{cell.toLocaleDateString()}</span>
</td>
