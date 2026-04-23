<script lang="ts">
	import type { RemoteFormField } from '@sveltejs/kit'
	import Issues from './Issues.svelte'
	import type { InputProps } from './type.ts'

	let {
		label,
		field,
		value = $bindable(),
		type = 'text',
		class: klass,
		...props
	}: {
		label: string
		field?: RemoteFormField<string>
		value?: string
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
			| 'select'
	} & InputProps = $props()
</script>

<label class="floating-label">
	<span>{label}</span>
	{#if field}
		<input placeholder={label} class={['input', klass]} {...field.as(type)} {...props} />
	{:else}
		<input placeholder={label} class={['input', klass]} {type} bind:value {...props} />
	{/if}
	<Issues {field} />
</label>

<style>
	input[aria-invalid='true'] {
		--input-color: var(--color-error);
	}
</style>
