<script lang="ts">
	import type { TableField } from '$lib/ui/table/index.js'
	import { tip } from '$lib/action/tip.js'
	let { field }: { field: TableField } = $props()
</script>

<th use:tip={{ disable: !field.hint, content: field.hint }}>
	{field.label}
</th>
