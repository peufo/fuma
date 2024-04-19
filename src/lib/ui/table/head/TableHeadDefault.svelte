<script lang="ts">
	import type { TableField } from '$lib/ui/index.js'
	import { tip } from '$lib/action/tip.js'

	export let field: TableField
</script>

<th use:tip={{ disable: !field.hint, content: field.hint }}>
	{field.label}
</th>
