<script lang="ts">
	import { fruitsOptions } from '$lib/_doc/data.ts'
	import { InputSelectNative } from '$lib/input/index.ts'

	let value = $state('banana')
</script>

<div class="space-y-4 p-4">
	<InputSelectNative label="Native select" options={fruitsOptions} bind:value />
	<InputSelectNative label="Native select" options={fruitsOptions} bind:value variant="floating" />
	<p class="mt-2 text-sm opacity-60">Value: {value}</p>
</div>
