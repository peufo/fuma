<script lang="ts">
import { InputNumber } from '$lib/input/index.ts';

let value = $state(42);
</script>

<div class="p-4">
	<InputNumber label="Number" bind:value />
	<p class="mt-2 text-sm opacity-60">Value: {value}</p>
</div>
