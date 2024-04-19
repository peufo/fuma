<script lang="ts">
	import Meta from '$lib/Meta.svelte'
	import { InputText } from '$lib/ui/index.js'
	import { useForm } from '$lib/validation/form.js'

	const { enhance } = useForm()

	let inputText: InputText
</script>

<Meta component={inputText}>
	<form action="" method="post" use:enhance>
		<InputText bind:this={inputText} label="prout" />
	</form>
</Meta>
