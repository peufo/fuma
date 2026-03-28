<script lang="ts">
	import { CheckIcon } from '@lucide/svelte';
	import { parseOptions } from '$lib/index.ts';
	import InputSelectNative from '$lib/next/input/InputSelectNative.svelte';
	import { InputSelect } from '$lib/next/input/index.ts';
	import { fruitsOptions } from '../remote/db.ts';
</script>

<div class="p-4">
	<InputSelectNative label="Fruits" options={fruitsOptions} />

	<div class="divider h-12"></div>

	<InputSelect label="Fruits" items={parseOptions(fruitsOptions)} getValue={(item) => item.value}>
		{#snippet proposal(item, { isSelected })}
			<item.icon size={18} opacity={0.8} />
			<span>{item.value}</span>
			{#if isSelected}
				<CheckIcon size={18} />
			{/if}
		{/snippet}
	</InputSelect>
</div>
