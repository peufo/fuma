<script lang="ts">
	import { InputDateTime } from '$lib/input/index.ts'

	let value = $state<Date | null>(new Date())
	let empty = $state<Date | null>(null)
</script>

<div class="space-y-4 p-4">
	<InputDateTime label="Début" bind:value hint="dans 3 heures" />
	<InputDateTime label="Début" bind:value layout="datetime" />
	<InputDateTime label="Début" bind:value layout="datetime" variant="floating" />
	<InputDateTime label="Tokyo" bind:value timezone="Asia/Tokyo" />
	<InputDateTime label="Vide au départ" bind:value={empty} />
	<p class="mt-2 text-sm opacity-60">Value: {value?.toJSON()} — Empty: {empty?.toJSON()}</p>
</div>
