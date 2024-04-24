<script lang="ts">
	import Meta from '$lib/Meta.svelte'
	import { InputText, InputBoolean } from '$lib/ui/index.js'
	import { useForm } from '$lib/validation/form.js'

	const { enhance } = useForm()

	let inputBoolean: InputBoolean
	let inputText: InputText
</script>

<Meta component={inputText}>
	<form action="" method="post" use:enhance>
		<InputText bind:this={inputText} label="Text input" key="text" />
	</form>
</Meta>

<Meta component={inputBoolean} name="InputBoolean">
	<InputBoolean bind:this={inputBoolean} label="Boolean input" key="boolean" value={true} />
</Meta>
