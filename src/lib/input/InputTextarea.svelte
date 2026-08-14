<script lang="ts">
	import type { RemoteFormField } from '@sveltejs/kit'
	import { TextareaAutosize } from 'runed'
	import Issues from './Issues.svelte'
	import type { TextareaProps } from './type.js'

	let {
		label,
		field,
		value = $bindable(),
		class: klass,
		maxHeight = 200,
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
		maxHeight?: number
		variant?: 'floating' | 'block'
	} & TextareaProps = $props()

	let textarea = $state<HTMLTextAreaElement>()
	new TextareaAutosize({
		element: () => textarea,
		input: () => field?.value() || value || '',
		maxHeight: (() => maxHeight)()
	})

	const inputId = $props.id()
	const textareaProps = $derived({
		id: inputId,
		class: 'textarea w-full',
		placeholder: variant === 'floating' ? label : '',
		...props
	})
</script>

{#snippet snippetInput()}
	{#if field}
		<!-- Pas de `bind:value` ici: avec un `field`, `value` n'est que la valeur initiale,
		     comme dans InputString et InputNumber. -->
		<textarea
			bind:this={textarea}
			{...textareaProps}
			{...value === undefined ? field.as('text') : field.as('text', value)}
		></textarea>
	{:else}
		<textarea bind:this={textarea} {...textareaProps} bind:value></textarea>
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
	textarea[aria-invalid='true'] {
		--input-color: var(--color-error);
	}
</style>
