<script lang="ts">
	import { CheckIcon } from '@lucide/svelte'
	import type { RemoteFormField } from '@sveltejs/kit'
	import { type Options, parseOptions } from '$lib/utils/index.js'
	import Issues from './Issues.svelte'
	import type { InputProps } from './type.js'

	let {
		field,
		label,
		value = $bindable([]),
		options: optionsProp,
		...props
	}: {
		field?: RemoteFormField<string[]>
		label: string
		/**
		 * Sans `field`, les valeurs liées. Avec, les valeurs initiales: les cases restent
		 * pilotées par `value`, `field.as('checkbox', …)` ne servant qu'à les nommer.
		 */
		value?: string[]
		options: Options
	} & InputProps = $props()

	const options = $derived(parseOptions(optionsProp))

	function toggle(optionValue: string, checked: boolean) {
		value = checked ? [...value, optionValue] : value.filter((v) => v !== optionValue)
		// Les cases suffisent à soumettre; `set` garde la validation du formulaire à jour.
		field?.set(value)
	}
</script>

<div class="flex flex-col gap-1">
	<span class="label px-3 text-sm">{label}</span>
	<div class="join join-vertical">
		{#each options as option (option.value)}
			{@const {
				class: klass,
				value: optionValue,
				label: optionLabel,
				icon: Icon,
				...optionProps
			} = option}
			{@const checked = value.includes(optionValue)}
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
					     sans lui les valeurs initiales ne partiraient pas tant que rien n'a été
					     coché, et le visuel ci-dessous s'en écarterait. -->
					<input
						{...field?.as('checkbox', optionValue)}
						type="checkbox"
						{checked}
						onchange={({ currentTarget }) => toggle(optionValue, currentTarget.checked)}
						class={['w-0']}
						{...props}
						{...optionProps}
					/>
					<!-- https://developer.mozilla.org/en-US/docs/Web/CSS/corner-shape  -->
					<div
						class={[
							'squircle',
							'ml-auto h-5 w-5 outline',
							'bg-base-100',
							!checked && 'outline-base-content/20',
							klass
						]}
					>
						<div
							class={[
								'squircle',
								'grid h-5 w-5 place-content-center',
								'bg-base-content',
								'ease scale-0 opacity-0',
								checked && 'scale-[80%] opacity-100'
							]}
						>
							<CheckIcon size={18} class={['stroke-base-100']} strokeWidth={4} />
						</div>
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
	.squircle {
		corner-shape: squircle;
		border-radius: 100%;
	}

	label:has(input[aria-invalid='true']) {
		--input-color: var(--color-error);
	}
	label:has(input:disabled) {
		cursor: not-allowed;
		border-color: var(--input-color);
	}
</style>
