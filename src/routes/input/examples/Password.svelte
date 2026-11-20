<script lang="ts">
	import { InputPassword } from '#lib/input/index.ts'

	let value = $state('hunter2')
</script>

<div class="space-y-4 p-4">
	<InputPassword label="Mot de passe" bind:value autocomplete="current-password" />
	<p class="mt-2 text-sm opacity-60">Value: {value}</p>
</div>
