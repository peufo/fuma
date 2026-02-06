<script lang="ts">
	import { Form, InputText } from '$lib/index.js'
	import InputNumber from '$lib/ui/input/InputNumber.svelte'
	import { shapeUser } from './shape.js'

	let { data } = $props()
	let formData = $derived(data.formDataUser)
</script>

<Form class="mx-auto max-w-lg" shape={shapeUser} bind:data={formData}>
	<InputText label="name" key="name" />

	<div class="flex flex-col gap-2">
		<div class="flex items-center gap-4">
			<span>Friends</span>
			<button
				type="button"
				class="btn ml-auto"
				onclick={() => formData.friends.push({ name: 'New friend', age: 20 })}
			>
				Ajouter un ami
			</button>
		</div>
		{#each formData.friends as friend, index}
			<div class="flex gap-2">
				<InputText label="name" key="friends.{index}.name" bind:value={friend.name} />
				<InputNumber label="age" key="friends.{index}.age" bind:value={friend.age} />
			</div>
		{/each}
	</div>
</Form>
