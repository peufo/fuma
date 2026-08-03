<script lang="ts">
	import { CheckIcon } from '@lucide/svelte'
	import { fruitsOptions } from '$lib/_doc/data.ts'
	import { type Option, parseOptions } from '$lib/index.ts'
	import { InputSelect } from '$lib/input/index.ts'

	const options = parseOptions(fruitsOptions)
	// `value` porte l'option, pas sa valeur: la sélection initiale s'affiche sans réconciliation.
	let value = $state<Option>(options.find((option) => option.value === 'cherry')!)
</script>

<div class="p-4">
	<InputSelect label="Custom select" items={options} bind:value>
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
	<p class="mt-2 text-sm opacity-60">Value: {value?.value}</p>
</div>
