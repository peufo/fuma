<script lang="ts">
	import { Form, InputText } from '$lib/index.js'
	import InputNumber from '$lib/ui/input/InputNumber.svelte'
	import { model } from './model.js'
	import type { FormDataInput } from '$lib/ui/form/form.js'

	let data: FormDataInput<typeof model> = {
		name: 'Jonas',
		friends: []
	}
</script>

<Form
	class="mx-auto max-w-lg"
	{model}
	simpleAction
	bind:data
	on:success={({ detail }) => {
		console.log(detail.data)
	}}
>
	<InputText label="name" key="name" />

	<div class="flex flex-col gap-2">
		<div class="flex items-center gap-4">
			<span>Friends</span>
			<button
				type="button"
				class="btn ml-auto"
				on:click={() => (data.friends = [...data.friends, { name: '', age: 20 }])}
			>
				Ajouter
			</button>
		</div>
		{#each data.friends as friend, index}
			<div class="flex gap-2">
				<InputText label="name" key="friends.{index}.name" bind:value={friend.name} />
				<InputNumber label="age" key="friends.{index}.age" bind:value={friend.age} />
			</div>
		{/each}
	</div>
</Form>
