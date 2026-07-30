<script lang="ts">
	import { InputString } from '$lib/input/index.ts'

	let value = $state('Hello')
</script>

<div class="space-y-4 p-4">
	<InputString label="String" bind:value />
	<InputString label="String" bind:value variant="floating" />
	<p class="mt-2 text-sm opacity-60">Value: {value}</p>
</div>
