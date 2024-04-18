<script lang="ts">
	import Meta from '$lib/Meta.svelte'
	import { ButtonCopy } from '$lib/index.js'

	let component: ButtonCopy
</script>

<Meta {component} name="ButtonCopy">
	<ButtonCopy bind:this={component} title="Copy me !" value="Hey 👋" />
</Meta>
