<script lang="ts">
	import { PlusIcon, XIcon } from '@lucide/svelte'
	import { type User, users } from '#lib/_doc/data.ts'
	import { InputSelect } from '#lib/input/index.ts'

	let added = $state<User[]>([])
	let picked = $state<User>()

	// Choisir ajoute une ligne au lieu de remplir le champ: le déclencheur est un bouton, et la
	// valeur revient à vide après chaque choix.
	function add(user: User | undefined) {
		picked = undefined
		if (user && !added.includes(user)) added.push(user)
	}
</script>

<div class="flex flex-col gap-2 p-4">
	<ul class="flex flex-col gap-1">
		{#each added as user (user)}
			<li class="flex items-center gap-2">
				<span class="grow">{user.name}</span>
				<button
					type="button"
					class="btn btn-square btn-ghost btn-xs"
					aria-label="Retirer {user.name}"
					onclick={() => (added = added.filter((other) => other !== user))}
				>
					<XIcon size={14} />
				</button>
			</li>
		{:else}
			<li class="text-sm opacity-60">Personne.</li>
		{/each}
	</ul>

	<InputSelect items={users} getLabel={(user) => user.name} bind:value={picked} onSelect={add}>
		{#snippet trigger({ props })}
			<button {...props} class="btn self-start btn-ghost btn-sm">
				<PlusIcon size={16} /> Ajouter un utilisateur
			</button>
		{/snippet}
	</InputSelect>
</div>
