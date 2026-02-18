<script lang="ts">
	import type { RemoteFormField } from '@sveltejs/kit';
	import { slide } from 'svelte/transition';

	let {
		field
	}: {
		// biome-ignore lint/suspicious/noExplicitAny: Wathever then value type... we use just field.issues()
		field: RemoteFormField<any>;
	} = $props();
</script>

{#if field.issues()?.length}
	<div class="my-1 flex flex-col text-xs text-error" transition:slide={{ duration: 200 }}>
		{#each field.issues() as issue}
			<span>
				{issue.message}
			</span>
		{/each}
	</div>
{/if}
