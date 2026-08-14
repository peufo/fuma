<script lang="ts">
	import type { RemoteFormField } from '@sveltejs/kit'
	import Issues from './Issues.svelte'
	import type { InputProps } from './type.js'

	let {
		label,
		field,
		value = $bindable(),
		class: klass,
		variant = 'block',
		...props
	}: {
		label: string
		field?: RemoteFormField<number>
		/**
		 * Sans `field`, la valeur liée. Avec, la valeur initiale du champ — celui-ci prend
		 * ensuite le relais et devient la source de vérité.
		 */
		value?: number
		variant?: 'floating' | 'block'
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
			<input {...inputProps} {...field.as('number')} />
		{:else}
			<input {...inputProps} {...field.as('number', value)} />
		{/if}
	{:else}
		<input {...inputProps} type="number" bind:value />
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
		<label class="label text-wrap" for={inputId}>{label}</label>
		{@render snippetInput()}
		<Issues {field} />
	</fieldset>
{/if}

<style>
	input[aria-invalid='true'] {
		--input-color: var(--color-error);
	}
</style>
