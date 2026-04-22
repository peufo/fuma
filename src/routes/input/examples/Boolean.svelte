<script lang="ts">
import { InputBoolean } from '$lib/input/index.ts';

let checked = $state(true);
</script>

<div class="flex flex-col gap-4 p-4">
	<InputBoolean label="Checkbox" bind:checked />
	<InputBoolean label="Switch" variant="switch" bind:checked />
	<p class="text-sm opacity-60">Value: {checked}</p>
</div>
