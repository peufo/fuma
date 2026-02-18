<script lang="ts">
	import type { RemoteFormField } from '@sveltejs/kit';
	import Issues from './Issues.svelte';
	import type { InputProps } from './type.ts';

	let {
		label,
		field,
		type = 'text',
		class: klass,
		...props
	}: {
		label: string;
		field: RemoteFormField<string>;
		type?:
			| 'text'
			| 'email'
			| 'password'
			| 'url'
			| 'tel'
			| 'search'
			| 'date'
			| 'datetime-local'
			| 'time'
			| 'month'
			| 'week'
			| 'color'
			| 'select';
	} & InputProps = $props();
</script>

<label class="floating-label">
	<span>{label}</span>
	<input placeholder={label} class={['input', klass]} {...field.as(type)} {...props} />
	<Issues {field} />
</label>

<style>
	:global(input[aria-invalid='true']) {
		--input-color: var(--color-error);
	}
</style>
