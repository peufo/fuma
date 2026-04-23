<script lang="ts">
	import { InputString } from '$lib/input/index.ts'

	let value = $state('Hello')
</script>

<div class="p-4">
	<InputString label="String" bind:value />
	<p class="mt-2 text-sm opacity-60">Value: {value}</p>
</div>
