<script lang="ts">
	import type { RemoteFormField } from '@sveltejs/kit';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import Issues from './Issues.svelte';

	let {
		label,
		field,
		class: klass,
		...props
	}: {
		label: string;
		field: RemoteFormField<number>;
	} & Omit<HTMLInputAttributes, 'name' | 'value' | 'aria-invalid'> = $props();
</script>

<label class="floating-label">
	<span>{label}</span>
	<input placeholder={label} class={['input', klass]} {...field.as('number')} {...props} />
	<Issues {field} />
</label>

<style>
	:global(input[aria-invalid='true']) {
		--input-color: var(--color-error);
	}
</style>
