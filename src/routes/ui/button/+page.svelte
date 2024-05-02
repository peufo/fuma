<script lang="ts">
	import Meta from '$lib/Meta.svelte'
	import { ButtonCopy, ButtonDelete } from '$lib/ui/index.js'

	let buttonCopy: ButtonCopy
	let buttonDelete: ButtonDelete
</script>

<Meta component={buttonCopy} name="ButtonCopy">
	<ButtonCopy bind:this={buttonCopy} title="Copy me !" value="Hey 👋" />
</Meta>

<Meta component={buttonDelete} name="ButtonDelete" description="Doit être placé dans un <form />">
	<ButtonDelete bind:this={buttonDelete} formaction="?/delete" />
</Meta>
