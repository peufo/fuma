<script lang="ts">
	import { Badge } from '$lib/ui/badge/index.js'
	import { component, type ComponentAndProps } from '$lib/utils/component.js'

	export let value: (ComponentAndProps | string | number | boolean)[]
</script>

<td>
	{#each value as v}
		{@const componentAndProps =
			typeof v === 'object' ? v : component(Badge, { content: String(v) })}
		<svelte:component this={componentAndProps.component} {...componentAndProps.props} />
	{/each}
</td>
