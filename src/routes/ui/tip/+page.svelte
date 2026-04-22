<script lang="ts">
	import { tip } from '$lib/action/index.ts';
	import InputTextarea from '$lib/input/InputTextarea.svelte';
	import { InputBoolean } from '$lib/input/index.ts';

	let content = 'Hello !';
	let enable = true;

	// TODO: how to use a RemoteFormField without server ?
	// Create a FormField compatitbiliy ?
</script>

<div class="mx-auto my-10 max-w-xl">
	<!-- <InputTextarea label="Content" bind:value={content} />
	<InputBoolean label="Enable" bind:value={enable} /> -->

	<div class="divider"></div>

	<div class="h-12 w-12 bg-yellow-400" use:tip={{ content, disable: !enable }}>hover me</div>
</div>
