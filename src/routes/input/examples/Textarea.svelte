<script lang="ts">
	import { InputTextarea } from '$lib/input/index.ts'

	let value = $state('Line 1\nLine 2')
</script>

<div class="space-y-4 p-4">
	<InputTextarea label="Textarea" bind:value />
	<InputTextarea label="Textarea" bind:value variant="floating" />
	<p class="mt-2 text-sm opacity-60">Value: {value}</p>
</div>
