<script lang="ts">
	import Foo from './Foo.svelte'

	let hide = true
</script>

<div class="flex items-center gap-4 py-4">
	<h2 class="title">This data transit with eventEmitter</h2>
	<button class="btn btn-ghost" on:click={() => (hide = !hide)}>
		{hide ? 'show' : 'hide'} last components
	</button>
</div>

<div class="flex gap-4">
	<Foo />
	<Foo />
	{#if !hide}
		<Foo />
	{/if}
</div>
