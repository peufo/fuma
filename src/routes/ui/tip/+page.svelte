<script lang="ts">
	import { InputBoolean, tip } from '$lib/index.js'
	import InputTextarea from '$lib/ui/input/InputTextarea.svelte'

	let content = 'Hello !'
	let enable = true
</script>

<div class="mx-auto my-10 max-w-xl">
	<InputTextarea label="Content" bind:value={content} />
	<InputBoolean label="Enable" bind:value={enable} />

	<div class="divider"></div>

	<div class="h-12 w-12 bg-yellow-400" use:tip={{ content, disable: !enable }}>hover me</div>
</div>
