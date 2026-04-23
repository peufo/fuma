<script lang="ts">
	import { fruitsOptions } from '$lib/data.ts'
	import { InputSelectNative } from '$lib/input/index.ts'

	let value = $state('banana')
</script>

<div class="p-4">
	<InputSelectNative label="Native select" options={fruitsOptions} bind:value />
	<p class="mt-2 text-sm opacity-60">Value: {value}</p>
</div>
