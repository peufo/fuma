<script lang="ts">
	import { type User, users } from '$lib/_doc/data.ts'
	import { InputSelect } from '$lib/input/index.ts'

	let user = $state<User>()
</script>

<div class="flex flex-col gap-4 p-4">
	<!-- Quarante entrées déjà chargées: rien à interroger, le champ de recherche apparaît de
	     lui-même et filtre sur `getLabel`. `filter` élargit la recherche au CV. -->
	<InputSelect
		label="Utilisateur"
		placeholder="Selectionner un utilisateur"
		items={users}
		getLabel={(user) => user.name}
		filter={(user, search) => (user.name + user.cv).toLowerCase().includes(search.toLowerCase())}
		bind:value={user}
		nullable
	/>

	<p>Selected: {user?.name || '-'}</p>
</div>
