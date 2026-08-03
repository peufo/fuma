<script lang="ts">
	import { CheckIcon } from '@lucide/svelte'
	import { type User, users } from '$lib/_doc/data.ts'
	import InputMultiSelect from '$lib/input/InputMultiSelect.svelte'
	import { searchUsers } from './select.remote.ts'

	// `value` porte les items: la sélection initiale s'affiche sans requête, même si la
	// recherche ne remonte pas ces utilisateurs au premier rendu.
	let selectedUsers = $state<User[]>(users.slice(0, 2))
</script>

<div class="flex flex-col gap-4 p-4" id="multi-select-demo">
	<InputMultiSelect
		label="Utilisateurs"
		placeholder="Selectionner des utilisateurs"
		items={searchUsers}
		bind:value={selectedUsers}
		hotKey="k"
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
	</InputMultiSelect>

	<p>Selected: {selectedUsers.map((user) => user.name).join(', ') || '-'}</p>
</div>
