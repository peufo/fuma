<script lang="ts">
	import { CheckIcon } from '@lucide/svelte'
	import { fruitsOptions } from '$lib/_doc/data.ts'
	import { type Option, parseOptions } from '$lib/index.ts'
	import { InputSelect } from '$lib/input/index.ts'
	import InputSelectNative from '$lib/input/InputSelectNative.svelte'

	const options = parseOptions(fruitsOptions)
	let fruit = $state<Option>()
</script>

<div class="p-4">
	<InputSelectNative label="Fruits" {options} />

	<div class="divider h-12"></div>

	<!-- Cinq options: la liste s'ouvre sans champ de recherche, et `getValue` se déduit du
	     `value` de l'option. -->
	<InputSelect label="Fruits" items={options} bind:value={fruit}>
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
	<p class="mt-2 text-sm opacity-60">Value: {fruit?.value || '-'}</p>
</div>
