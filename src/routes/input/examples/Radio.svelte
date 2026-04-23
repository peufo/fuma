<script lang="ts">
	import { fruitsOptions } from '$lib/data.ts'
	import { InputRadio } from '$lib/input/index.ts'

	let value = $state('apple')
</script>

<div class="p-4">
	<InputRadio label="Radio" options={fruitsOptions} bind:value />
	<p class="mt-2 text-sm opacity-60">Value: {value}</p>
</div>
