<script lang="ts">
	import { type User, users } from '$lib/_doc/data.ts'
	import InputMultiSelect from '$lib/input/InputMultiSelect.svelte'

	const candidates = users.slice(0, 10)
	let selectedUsers = $state<User[]>(candidates.slice(0, 3))
</script>

<div class="flex flex-col gap-4 p-4">
	<!-- `countOnly` remplace les puces par un compteur: retirer un item se fait depuis le
	     popover, ou d'un coup par le bouton de `canReset`. -->
	<InputMultiSelect
		label="Utilisateurs"
		items={candidates}
		getValue={(user) => user.id}
		getLabel={(user) => user.name}
		bind:value={selectedUsers}
		countOnly
		canReset
	/>

	<p>Selected: {selectedUsers.map((user) => user.name).join(', ') || '-'}</p>
</div>
