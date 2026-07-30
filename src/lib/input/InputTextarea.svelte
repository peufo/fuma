<script lang="ts">
	import type { RemoteFormField } from '@sveltejs/kit'
	import { TextareaAutosize } from 'runed'
	import Issues from './Issues.svelte'
	import type { TextareaProps } from './type.js'

	let {
		label,
		field,
		value = $bindable(),
		defaultValue,
		class: klass,
		maxHeight = 200,
		variant = 'block',
		...props
	}: {
		label: string
		field?: RemoteFormField<string>
		value?: string
		defaultValue?: string
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
</script>

{#snippet snippetInput()}
	<textarea
		id={inputId}
		placeholder={variant === 'floating' ? label : ''}
		class="textarea w-full"
		bind:this={textarea}
		{...defaultValue === undefined ? field?.as('text') : field?.as('text', defaultValue)}
		bind:value
		{...props}
	></textarea>
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
	textarea[aria-invalid='true'] {
		--input-color: var(--color-error);
	}
</style>
