<script lang="ts">
import { InputRange } from '$lib/input/index.ts';

let value = $state(50);
</script>

<div class="p-4">
	<InputRange label="Range" bind:value min={0} max={100} />
</div>
