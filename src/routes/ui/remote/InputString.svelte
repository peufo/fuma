<script lang="ts">
	import type { RemoteFormField } from '@sveltejs/kit';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { slide } from 'svelte/transition';

	let {
		label,
		field,
		class: klass,
		...props
	}: {
		label: string;
		field: RemoteFormField<string>;
	} & Omit<HTMLInputAttributes, 'name' | 'value' | 'aria-invalid'> = $props();
</script>

<label class="floating-label">
	<span>{label}</span>
	<input placeholder={label} class={['input', klass]} {...field.as('text')} {...props} />
	<div class="my-1 flex flex-col text-xs text-error">
		{#each field.issues() as issue}
			<span transition:slide={{ duration: 200 }}>
				{issue.message}
			</span>
		{/each}
	</div>
</label>

<style>
	:global(input[aria-invalid='true']) {
		--input-color: var(--color-error);
	}
</style>
