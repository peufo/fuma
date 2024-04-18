<script lang="ts">
	import Meta from '$lib/Meta.svelte'
	import { DropDown } from '$lib/index.js'

	let component: DropDown
</script>

<Meta {component} name="DropDown">
	<DropDown bind:this={component}>
		<button class="btn" slot="activator">slot="activator"</button>
		slot
	</DropDown>
</Meta>
