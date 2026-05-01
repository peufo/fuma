<script lang="ts">
	import type { RemoteFormField, RemoteFormFieldValue } from '@sveltejs/kit'
	import { slide } from 'svelte/transition'

	let {
		field
	}: {
		field: RemoteFormField<RemoteFormFieldValue> | undefined
	} = $props()
</script>

{#if field?.issues()?.length}
	<div class="my-1 flex flex-col text-xs text-error" transition:slide={{ duration: 200 }}>
		{#each field.issues() as issue (issue.path)}
			<span>
				{issue.message}
			</span>
		{/each}
	</div>
{/if}
