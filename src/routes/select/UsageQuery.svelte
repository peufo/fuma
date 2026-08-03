<script lang="ts">
	import { CheckIcon } from '@lucide/svelte'
	import type { User } from '$lib/_doc/data.ts'
	import InputSelect from '$lib/input/InputSelect.svelte'
	import { searchUsers } from './select.remote.ts'

	let user = $state<User>()
</script>

<div class="flex flex-col gap-4 p-4">
	<!-- Le serveur filtre: le composant ne retouche rien à ce que la query renvoie. -->
	<InputSelect
		label="Utilisateur"
		placeholder="Selectionner un utilisateur"
		items={searchUsers}
		bind:value={user}
		hotKey="k"
		nullable
	>
		{#snippet selected(user)}
			<span>{user.name}</span>
		{/snippet}
		{#snippet proposal(user, { isSelected })}
			<span class="grow">{user.name}</span>
			<span class="opacity-60">{user.age} ans</span>
			{#if isSelected}
				<CheckIcon size={18} />
			{/if}
		{/snippet}
		{#snippet hint(user)}
			<p class="mt-1 text-sm opacity-70">{user ? user.cv : 'Aucune sélection'}</p>
		{/snippet}
	</InputSelect>

	<p>Selected: {user?.name || '-'}</p>
</div>
