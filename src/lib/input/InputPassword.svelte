<script lang="ts">
	import type { RemoteFormField } from '$app/server'
	import { EyeIcon, EyeOffIcon } from '@lucide/svelte'
	import Issues from './Issues.svelte'
	import type { InputProps } from './type.js'

	let {
		label,
		field,
		value = $bindable(),
		class: klass,
		...props
	}: {
		label: string
		field?: RemoteFormField<string>
		/**
		 * Sans `field`, la valeur liée. Avec, la valeur initiale du champ: celui-ci prend
		 * ensuite le relais et devient la source de vérité.
		 */
		value?: string
	} & InputProps = $props()

	const inputId = $props.id()
	let visible = $state(false)
	const type = $derived(visible ? 'text' : 'password')
	const inputProps = $derived({ id: inputId, class: 'grow', ...props })
</script>

<fieldset class={['fieldset', klass]}>
	<label class="label text-wrap" for={inputId}>{label}</label>
	<!-- Un `div` et non un `label`: le nom du bouton entrerait dans le nom accessible du champ. -->
	<div class="input w-full pr-1">
		{#if field}
			{#if value === undefined}
				<input {...inputProps} {...field.as(type)} />
			{:else}
				<input {...inputProps} {...field.as(type, value)} />
			{/if}
		{:else}
			<input {...inputProps} {type} bind:value />
		{/if}
		<!-- Avec `aria-pressed`, le libellé reste fixe: c'est l'état qui change, pas le nom. -->
		<button
			type="button"
			class="btn btn-square btn-ghost btn-sm"
			aria-label="Afficher le mot de passe"
			aria-pressed={visible}
			aria-controls={inputId}
			onclick={() => (visible = !visible)}
		>
			{#if visible}
				<EyeOffIcon size={18} class="opacity-70" />
			{:else}
				<EyeIcon size={18} class="opacity-70" />
			{/if}
		</button>
	</div>
	<Issues {field} />
</fieldset>

<style>
	.input:has(:global(input[aria-invalid='true'])) {
		--input-color: var(--color-error);
	}
</style>
