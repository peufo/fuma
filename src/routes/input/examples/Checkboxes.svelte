<script lang="ts">
	import { fruitsOptions } from '$lib/_doc/data.ts'
	import { InputCheckboxes } from '$lib/input/index.ts'

	let value = $state(['apple', 'cherry'])
</script>

<div class="p-4">
	<InputCheckboxes label="Checkboxes" options={fruitsOptions} bind:value />
	<p class="mt-2 text-sm opacity-60">Value: {value.join(', ') || '∅'}</p>
</div>
