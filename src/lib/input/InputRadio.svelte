<script lang="ts">
	import type { RemoteFormField } from '$app/server'
	import { type Options, parseOptions } from '#lib/utils/index.js'
	import Issues from './Issues.svelte'
	import type { InputProps } from './type.js'
	import type { Snippet } from 'svelte'

	let {
		field,
		label,
		value = $bindable(),
		options: optionsProp,
		labelAppend,
		orientation = 'vertical',
		...props
	}: {
		field?: RemoteFormField<string>
		label: string
		/**
		 * Sans `field`, la valeur liée. Avec, la valeur initiale: `as('radio', …)` prend la
		 * valeur de l'option et ne sait donc pas amorcer la sélection.
		 */
		value?: string
		options: Options
		/** Rendu à droite du libellé. */
		labelAppend?: Snippet
		/** Disposition des options. En `horizontal`, elles se partagent la largeur du parent à parts égales. */
		orientation?: 'horizontal' | 'vertical'
	} & InputProps = $props()

	const options = $derived(parseOptions(optionsProp))
</script>

<div class="flex flex-col gap-1">
	<span class="label text-xs text-wrap">
		<span>{label}</span>
		{@render labelAppend?.()}
	</span>
	<div class={['join', orientation === 'vertical' ? 'join-vertical' : 'join-horizontal']}>
		{#each options as option (option.value)}
			{@const {
				class: klass,
				value: optionValue,
				label: optionLabel,
				icon: Icon,
				...optionProps
			} = option}
			{@const checked = (field ? (field.value() ?? value) : value) === optionValue}
			<label
				class={[
					'input join-item not-disabled:cursor-pointer not-disabled:hover:bg-base-200',
					'group h-auto min-h-10'
				]}
			>
				<div
					class={[
						'flex h-(--size) grow items-center gap-2',
						orientation === 'horizontal' && 'min-w-0'
					]}
				>
					{#if Icon}
						<Icon size={18} opacity={0.8} />
					{/if}
					<span class={['grow', orientation === 'horizontal' && 'truncate']}>{optionLabel}</span>
					<!-- Le `checked` explicite prime sur celui de `as()`, qui lit `field.value()`:
					     sans lui la valeur initiale ne cocherait rien, et un groupe décoché ne
					     part pas dans le `FormData`. -->
					<input
						{...field?.as('radio', optionValue)}
						type="radio"
						{checked}
						onchange={() => (value = optionValue)}
						class={['w-0']}
						{...props}
						{...optionProps}
					/>
					<div
						class={[
							'ml-auto h-5 w-5 rounded-full outline',
							'bg-base-100',
							!checked && 'outline-base-content/20',
							klass
						]}
					>
						<div
							class={[
								'grid h-5 w-5 place-content-center rounded-full',
								'bg-base-content',
								'ease scale-0 opacity-0',
								checked && 'scale-[80%] opacity-100'
							]}
						></div>
					</div>
				</div>
			</label>
		{/each}
	</div>
	<Issues {field} />
</div>

<style>
	.ease {
		transition-property: translate background-color opacity;
		transition-timing-function: cubic-bezier(0.275, 0.485, 0.515, 1.45);
		transition-duration: 200ms;
	}

	/* Hors `@layer`, l'emporte sur le `display: inline-flex` de `.join`. Le min à 0 garde les
	   colonnes égales quand la place manque, les libellés étant alors tronqués. */
	.join-horizontal {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(0, 1fr);
	}
	.join-horizontal > label {
		/* `.input` impose `clamp(3rem, 20rem, 100%)` ; `auto` remplit la colonne. */
		width: auto;
	}

	label:has(input[aria-invalid='true']) {
		--input-color: var(--color-error);
	}
	label:has(input:disabled) {
		cursor: not-allowed;
		border-color: var(--input-color);
	}
</style>
