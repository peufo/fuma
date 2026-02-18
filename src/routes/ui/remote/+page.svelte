<script lang="ts">
	import { schemaUser } from './db.ts';
	import InputBoolean from './InputBoolean.svelte';
	import InputNumber from './InputNumber.svelte';
	import InputString from './InputString.svelte';
	import { formCreateUser } from './test.remote.ts';
	import { useForm } from './useForm.ts';

	let { data } = $props();

	const form = useForm(formCreateUser, schemaUser);
</script>

<div class="flex gap-2">
	<form {...form} class="flex max-w-xs grow flex-col gap-6 rounded-lg border p-3 pt-6">
		<InputString field={form.fields.name} label="Name" />
		<InputNumber field={form.fields.age} label="Age" />
		<InputBoolean field={form.fields.isValided} label="Membre validé ?" hint="lorem ipsum" />
		<InputString field={form.fields.subscribeAt} type="date" label="Inscription" />
		<button class="btn">Create</button>
	</form>

	<div class="flex flex-col gap-2">
		<h2>Users:</h2>

		{#each data.users as user}
			<div class="flex flex-col gap-1 border px-2 py-1">
				<span>{user.name} - {user.age}</span>
				<span>Valided: {user.isValided}</span>
				<span>Subscribe: {user.subscribeAt}</span>
			</div>
		{/each}
	</div>
</div>
