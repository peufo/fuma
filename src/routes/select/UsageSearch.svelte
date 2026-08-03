<script lang="ts">
	import { type User, users } from '$lib/_doc/data.ts'
	import { InputSelect } from '$lib/input/index.ts'

	let user = $state<User>()

	// Une recherche qui doit rester dans le navigateur — géocodage, API tierce autorisant le
	// CORS — se donne comme une simple fonction: le composant tempère la frappe, ignore les
	// réponses en retard et affiche le chargement puis l'erreur.
	async function searchUsers(search: string): Promise<User[]> {
		await new Promise((resolve) => setTimeout(resolve, 400))
		if (search === 'boom') throw new Error('Recherche en échec')
		const needle = search.toLowerCase()
		return users.filter((user) => user.name.toLowerCase().includes(needle))
	}
</script>

<div class="flex flex-col gap-4 p-4">
	<InputSelect
		label="Utilisateur"
		placeholder="Selectionner un utilisateur"
		items={({ search }) => searchUsers(search)}
		getLabel={(user) => user.name}
		bind:value={user}
		nullable
	/>

	<p>Selected: {user?.name || '-'}</p>
	<p class="text-sm opacity-60">Tape « boom » pour voir l'état d'erreur.</p>
</div>
