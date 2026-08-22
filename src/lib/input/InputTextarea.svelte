<script lang="ts">
	import type { RemoteFormField } from '@sveltejs/kit'
	import { TextareaAutosize } from 'runed'
	import Issues from './Issues.svelte'
	import type { TextareaProps } from './type.js'
	import type { Snippet } from 'svelte'

	let {
		label,
		field,
		value = $bindable(),
		class: klass,
		maxHeight = 200,
		variant = 'block',
		labelAppend,
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
		/**
		 * `bare` ne rend que le champ, sans enveloppe ni libellé visible: `label` devient le
		 * placeholder et le nom accessible, et `class` s'applique au `<textarea>`. C'est la
		 * variante d'un champ posé dans une barre de saisie, où l'appelant place lui-même ce qui
		 * l'accompagne.
		 */
		variant?: 'floating' | 'block' | 'bare'
		/** Rendu à droite du libellé. Sans effet sur les variantes `floating` et `bare`. */
		labelAppend?: Snippet
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
		placeholder: variant === 'block' ? '' : label,
		'aria-label': variant === 'bare' ? label : undefined,
		...props
	})
	const textareaClass = $derived(['textarea w-full', variant === 'bare' && klass])
</script>

{#snippet snippetInput()}
	{#if field}
		<!-- Pas de `bind:value` ici: avec un `field`, `value` n'est que la valeur initiale,
		     comme dans InputString et InputNumber. -->
		<textarea
			bind:this={textarea}
			{...textareaProps}
			class={textareaClass}
			{...value === undefined ? field.as('text') : field.as('text', value)}
		></textarea>
	{:else}
		<textarea bind:this={textarea} {...textareaProps} class={textareaClass} bind:value></textarea>
	{/if}
{/snippet}

{#if variant === 'floating'}
	<label class={['floating-label', klass]}>
		<span>{label}</span>
		{@render snippetInput()}
		<Issues {field} />
	</label>
{:else if variant === 'bare'}
	{@render snippetInput()}
	<Issues {field} />
{:else}
	<fieldset class={['fieldset', klass]}>
		<label class="label text-wrap" for={inputId}>
			<span>{label}</span>
			{@render labelAppend?.()}
		</label>
		{@render snippetInput()}
		<Issues {field} />
	</fieldset>
{/if}

<style>
	textarea[aria-invalid='true'] {
		--input-color: var(--color-error);
	}
</style>
