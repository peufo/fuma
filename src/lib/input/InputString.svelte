<script lang="ts">
	import type { RemoteFormField } from '@sveltejs/kit'
	import Issues from './Issues.svelte'
	import type { InputProps } from './type.js'

	let {
		label,
		field,
		value = $bindable(),
		defaultValue,
		type = 'text',
		class: klass,
		variant = 'block',
		...props
	}: {
		label: string
		field?: RemoteFormField<string>
		value?: string
		defaultValue?: string
		variant?: 'floating' | 'block'
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

	const inputId = $props.id()
	const inputProps = $derived({
		id: inputId,
		class: 'input w-full',
		placeholder: variant === 'floating' ? label : '',
		...props
	})
</script>

{#snippet snippetInput()}
	{#if field}
		{#if defaultValue === undefined}
			<input {...inputProps} {...field.as(type)} />
		{:else}
			<input {...inputProps} {...field.as(type, defaultValue)} />
		{/if}
	{:else}
		<input {...inputProps} {type} bind:value />
	{/if}
{/snippet}

{#if variant === 'floating'}
	<label class={['floating-label', klass]}>
		<span>{label}</span>
		{@render snippetInput()}
		<Issues {field} />
	</label>
{:else}
	<fieldset class={['fieldset', klass]}>
		<label class="label" for={inputId}>{label}</label>
		{@render snippetInput()}
		<Issues {field} />
	</fieldset>
{/if}

<style>
	input[aria-invalid='true'] {
		--input-color: var(--color-error);
	}
</style>
