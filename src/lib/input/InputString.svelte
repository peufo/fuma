<script lang="ts">
	import type { RemoteFormField } from '@sveltejs/kit'
	import Issues from './Issues.svelte'
	import type { InputProps } from './type.js'

	let {
		label,
		field,
		value = $bindable(),
		type = 'text',
		class: klass,
		variant = 'block',
		...props
	}: {
		label: string
		field?: RemoteFormField<string>
		/**
		 * Sans `field`, la valeur liée. Avec, la valeur initiale du champ — celui-ci prend
		 * ensuite le relais et devient la source de vérité.
		 */
		value?: string
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
		{#if value === undefined}
			<input {...inputProps} {...field.as(type)} />
		{:else}
			<input {...inputProps} {...field.as(type, value)} />
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
