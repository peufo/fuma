<script lang="ts">
	import { CheckIcon } from '@lucide/svelte'
	import { fruitsOptions } from '$lib/_doc/data.ts'
	import { parseOptions } from '$lib/index.ts'
	import { InputSelect } from '$lib/input/index.ts'

	const options = parseOptions(fruitsOptions)
	let value = $state('cherry')
</script>

<div class="p-4">
	<InputSelect label="Custom select" items={options} getValue={(item) => item.value} bind:value>
		{#snippet selected(item)}
			<div class="flex gap-2">
				<item.icon size={18} opacity={0.8} />
				<span>{item.label}</span>
			</div>
		{/snippet}
		{#snippet proposal(item, { isSelected })}
			<item.icon size={18} opacity={0.8} />
			<span>{item.label}</span>
			{#if isSelected}
				<CheckIcon size={18} />
			{/if}
		{/snippet}
	</InputSelect>
	<p class="mt-2 text-sm opacity-60">Value: {value}</p>
</div>
