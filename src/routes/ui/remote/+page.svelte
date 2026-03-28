<script lang="ts">
	import InputBoolean from '$lib/next/input/InputBoolean.svelte';
	import InputNumber from '$lib/next/input/InputNumber.svelte';
	import InputRadio from '$lib/next/input/InputRadio.svelte';
	import InputRange from '$lib/next/input/InputRange.svelte';
	import InputSelectNative from '$lib/next/input/InputSelectNative.svelte';
	import InputString from '$lib/next/input/InputString.svelte';
	import InputTextarea from '$lib/next/input/InputTextarea.svelte';
	import { schemaUser, userGenderOptions } from './db.ts';
	import { formCreateUser } from './test.remote.ts';
	import { useForm } from './useForm.ts';

	let { data } = $props();

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
