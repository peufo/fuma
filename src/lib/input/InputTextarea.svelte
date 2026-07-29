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
		variant = 'floating',
		...props
	}: {
		label: string
		field?: RemoteFormField<string>
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
</script>

{#snippet snippetInput()}
	<textarea
		id={inputId}
		placeholder={variant === 'floating' ? label : ''}
		class={['textarea', klass]}
		bind:this={textarea}
		{...field?.as('text')}
		bind:value
		{...props}
	></textarea>
{/snippet}

{#if variant === 'floating'}
	<label class="floating-label">
		<span>{label}</span>
		{@render snippetInput()}
		<Issues {field} />
	</label>
{:else}
	<fieldset class="fieldset">
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
