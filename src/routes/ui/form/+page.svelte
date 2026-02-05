<script lang="ts">
	import { Form } from '$lib/ui/form/index.js'
	import { Drawer } from '$lib/ui/drawer/index.js'
	import FormExample from './FormExample.svelte'

	let form: Form<any>
	let drawer: Drawer
</script>

<button class="btn" on:click={() => form.set('country', { id: 1, name: 'Irland' })}>
	set country
</button>

<FormExample bind:form />

<button class="btn" on:click={() => drawer.open()}> Open </button>

<Drawer key="form-example" bind:this={drawer} title="Form in drawer" class="w-125">
	<FormExample bind:form />
</Drawer>
