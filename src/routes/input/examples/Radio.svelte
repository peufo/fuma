<script lang="ts">
	import { fruitsOptions } from '#lib/_doc/data.ts'
	import { InputRadio } from '#lib/input/index.ts'

	const { apple, banana, grape } = fruitsOptions
	let value = $state('apple')
</script>

<div class="flex flex-col gap-4 p-4">
	<InputRadio label="Radio" options={fruitsOptions} bind:value />
	<InputRadio
		label="Radio horizontal"
		orientation="horizontal"
		options={{ apple, banana, grape }}
		bind:value
	/>
	<p class="text-sm opacity-60">Value: {value}</p>
</div>
