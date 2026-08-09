<script lang="ts">
	import { InputDateTime } from '$lib/input/index.ts'

	let value = $state<Date | null>(new Date())
	let empty = $state<Date | null>(null)
	// Une date qui a fait l'aller-retour par JSON (paramètre d'URL, `load`) revient en chaîne
	// ISO alors que son type annonce une `Date`: le composant doit s'en accommoder.
	let fromJson = $state(JSON.parse(JSON.stringify({ at: new Date() })).at as unknown as Date)
	let invalid = $state('pas une date' as unknown as Date)
</script>

<div class="space-y-4 p-4">
	<InputDateTime label="Début" bind:value hint="dans 3 heures" />
	<InputDateTime label="Début" bind:value layout="datetime" />
	<InputDateTime label="Début" bind:value layout="datetime" variant="floating" />
	<InputDateTime label="Tokyo" bind:value timezone="Asia/Tokyo" />
	<InputDateTime label="Vide au départ" bind:value={empty} />
	<InputDateTime label="Date revenue de JSON" name="fromJson" bind:value={fromJson} />
	<InputDateTime label="Date illisible" name="invalid" bind:value={invalid} />
	<p class="mt-2 text-sm opacity-60">Value: {value?.toJSON()} — Empty: {empty?.toJSON()}</p>
</div>
