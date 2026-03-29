<script lang="ts">
	import { CheckIcon } from '@lucide/svelte';
	import { parseOptions } from '$lib/index.ts';
	import InputSelectNative from '$lib/next/input/InputSelectNative.svelte';
	import { InputSelect } from '$lib/next/input/index.ts';
	import { fruitsOptions } from '../remote/db.ts';

	const options = parseOptions(fruitsOptions);
</script>

<div class="p-4">
	<InputSelectNative label="Fruits" {options} />

	<div class="divider h-12"></div>

	<InputSelect label="Fruits" items={parseOptions(options)} getValue={(item) => item.value}>
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
</div>
