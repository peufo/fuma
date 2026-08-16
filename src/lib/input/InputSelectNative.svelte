<script lang="ts">
	import type { RemoteFormField } from '@sveltejs/kit'
	import { type Options, parseOptions } from '$lib/index.js'
	import Issues from './Issues.svelte'
	import type { SelectProps } from './type.js'

	let {
		label,
		field,
		value = $bindable(),
		options: optionsProp,
		class: klass,
		multiple,
		variant = 'block',
		...props
	}: {
		label: string
		options: Options
		field?: RemoteFormField<string | string[]>
		/**
		 * Sans `field`, la valeur liée. Avec, la valeur initiale du champ — celui-ci prend
		 * ensuite le relais et devient la source de vérité.
		 */
		value?: string | string[]
		variant?: 'floating' | 'block'
	} & SelectProps = $props()

	const options = $derived(parseOptions(optionsProp))
	const inputId = $props.id()

	// Sans valeur initiale, `as()` rend `value: undefined` tant que le champ n'a rien reçu: le
	// moindre re-rendu du spread — l'`aria-invalid` d'une soumission refusée, typiquement —
	// désélectionne alors tout. La liaison, elle, ne rattrape rien: sa source n'a pas bougé.
	const fieldProps = $derived.by(() => {
		if (!field) return undefined
		if (multiple === true) {
			const initial = Array.isArray(value) ? value : undefined
			return initial ? field.as('select multiple', initial) : field.as('select multiple')
		}
		const initial = typeof value === 'string' ? value : undefined
		return initial === undefined ? field.as('select') : field.as('select', initial)
	})
</script>

{#snippet snippetSelect()}
	<select id={inputId} class="select w-full" {...fieldProps} bind:value {...props}>
		{#each options as option (option.value)}
			<option value={option.value} class={['', option.class]} disabled={option.disabled}>
				{#if option.icon}
					<option.icon size={18} opacity={0.8} />
				{/if}
				<span class="grow">{option.label}</span>
			</option>
		{/each}
	</select>
{/snippet}

{#if variant === 'floating'}
	<label class={['floating-label', klass]}>
		<span>{label}</span>
		{@render snippetSelect()}
		<Issues {field} />
	</label>
{:else}
	<fieldset class={['fieldset', klass]}>
		<label class="label text-wrap" for={inputId}>{label}</label>
		{@render snippetSelect()}
		<Issues {field} />
	</fieldset>
{/if}

<style>
	option::checkmark {
		order: 1;
		margin-left: auto;
	}

	select[aria-invalid='true'] {
		--input-color: var(--color-error);
	}
</style>
