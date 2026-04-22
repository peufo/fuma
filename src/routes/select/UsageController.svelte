<script lang="ts">
	import { CheckIcon } from '@lucide/svelte';
	import { fruitsOptions } from '$lib/data.ts';
	import { parseOptions } from '$lib/index.ts';
	import InputSelectNative from '$lib/input/InputSelectNative.svelte';
	import { InputSelect } from '$lib/input/index.ts';

	const options = parseOptions(fruitsOptions);
	let nativeValue = $state('');
	let customValue = $state('');
</script>

<div class="flex flex-col gap-4 p-4">
	<InputSelectNative label="Native select" options={fruitsOptions} bind:value={nativeValue} />
	<p>Selected: {nativeValue}</p>

	<div class="divider"></div>

	<InputSelect
		label="Custom select"
		items={options}
		getValue={(item) => item.value}
		bind:value={customValue}
	>
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
	<p>Selected: {customValue}</p>
</div>
