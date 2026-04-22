<script lang="ts">
	import { schemaUser, userGenderOptions, users } from '$lib/data.ts';
	import InputBoolean from '$lib/input/InputBoolean.svelte';
	import InputNumber from '$lib/input/InputNumber.svelte';
	import InputRadio from '$lib/input/InputRadio.svelte';
	import InputRange from '$lib/input/InputRange.svelte';
	import InputRelation from '$lib/input/InputRelation.svelte';
	import InputSelectNative from '$lib/input/InputSelectNative.svelte';
	import InputString from '$lib/input/InputString.svelte';
	import InputTextarea from '$lib/input/InputTextarea.svelte';
	import { formCreateUser, searchUsers } from './test.remote.ts';
	import { useForm } from './useForm.ts';

	const form = useForm(formCreateUser, schemaUser);
</script>

<div class="flex gap-2">
	<form {...form} class="flex max-w-xs grow flex-col gap-6 rounded-lg border p-3 pt-6">
		<InputString field={form.fields.name} label="Name" />
		<InputNumber field={form.fields.age} label="Age" />
		<InputRange field={form.fields.level} label="Niveau" step={5} min={0} max={100} />
		<InputBoolean
			field={form.fields.isValided}
			label="Membre validé ?"
			hint="laskdjalsk djaslkdj aslkdjaslkd jaslkdjaslkd "
		/>
		<InputTextarea field={form.fields.cv} label="cv" placeholder="Raconte nous ta vie" />

		<InputString field={form.fields.subscribeAt} type="date" label="Inscription" />
		<InputRadio field={form.fields.gender} label="Genre" options={userGenderOptions} />
		<InputSelectNative field={form.fields.gender2} label="Genre2" options={userGenderOptions} />

		<InputRelation
			label="Love"
			searchItems={searchUsers}
			getValue={(user) => user.id.slice(0, 8)}
		/>

		<button class="btn">Create</button>
	</form>
	<div class="flex flex-col gap-2">
		<h2>Users:</h2>

		{#each users as user}
			<div class="flex flex-col gap-1 border px-2 py-1">
				<span>{user.name} - {user.age}</span>
				<span>Valided: {user.isValided}</span>
				<span>Subscribe: {user.subscribeAt}</span>
			</div>
		{/each}
	</div>
</div>
