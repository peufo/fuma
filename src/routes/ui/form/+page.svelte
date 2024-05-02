<script lang="ts">
	import Meta from '$lib/Meta.svelte'
	import { Form } from '$lib/ui/index.js'
	import Drawer from '$lib/ui/drawer/Drawer.svelte'
	import FormExample from './FormExample.svelte'

	let form: Form<any>
	let drawer: Drawer
</script>

<Meta component={form} name="Form">
	<button class="btn" on:click={() => form.set('country', { id: 1, name: 'Irland' })}>
		set country
	</button>

	<FormExample bind:form />
</Meta>

<Meta component={form} name="Form in drawer">
	<button class="btn" on:click={() => drawer.open()}> Open </button>

	<Drawer key="form-example" bind:this={drawer} title="Form in drawer" class="w-[500px]">
		<FormExample bind:form />
	</Drawer>
</Meta>
