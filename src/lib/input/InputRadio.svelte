<script lang="ts">
	import type { RemoteFormField } from '@sveltejs/kit'
	import { type Options, parseOptions } from '$lib/utils/index.js'
	import Issues from './Issues.svelte'
	import type { InputProps } from './type.js'
	import type { Snippet } from 'svelte'

	let {
		field,
		label,
		value = $bindable(),
		options: optionsProp,
		labelAppend,
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
	} & InputProps = $props()

	const options = $derived(parseOptions(optionsProp))
</script>

<div class="flex flex-col gap-1">
	<span class="label text-xs text-wrap">
		<span>{label}</span>
		{@render labelAppend?.()}
	</span>
	<div class="join join-vertical">
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
				<div class="flex h-(--size) grow items-center gap-2">
					{#if Icon}
						<Icon size={18} opacity={0.8} />
					{/if}
					<span class="grow">{optionLabel}</span>
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

	label:has(input[aria-invalid='true']) {
		--input-color: var(--color-error);
	}
	label:has(input:disabled) {
		cursor: not-allowed;
		border-color: var(--input-color);
	}
</style>
