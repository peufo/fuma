<script lang="ts">
	import { InputTextarea } from '$lib/input/index.ts'

	let value = $state('Line 1\nLine 2')
</script>

<div class="p-4">
	<InputTextarea label="Textarea" bind:value />
	<p class="mt-2 text-sm opacity-60">Value: {value}</p>
</div>
