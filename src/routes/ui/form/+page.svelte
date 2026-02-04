<script lang="ts">
	import Meta from '$lib/private/Meta.svelte'
	import { Form } from '$lib/ui/form/index.js'
	import { Drawer } from '$lib/ui/drawer/index.js'
	import FormExample from './FormExample.svelte'

	let form: Form<any>
	let drawer: Drawer
</script>

<Meta name="Form">
	<button class="btn" on:click={() => form.set('country', { id: 1, name: 'Irland' })}>
		set country
	</button>

	<FormExample bind:form />
</Meta>

<Meta name="Form in drawer">
	<button class="btn" on:click={() => drawer.open()}> Open </button>

	<Drawer key="form-example" bind:this={drawer} title="Form in drawer" class="w-125">
		<FormExample bind:form />
	</Drawer>
</Meta>
