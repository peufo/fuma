<script lang="ts">
	import type { RemoteFormField } from '@sveltejs/kit'
	import { type Options, parseOptions } from '$lib/utils/index.js'
	import Issues from './Issues.svelte'

	let {
		field,
		label,
		value = $bindable(),
		options: optionsProp
	}: {
		field?: RemoteFormField<string>
		label: string
		value?: string
		options: Options
	} = $props()

	const options = $derived(parseOptions(optionsProp))
</script>

<div class="flex flex-col gap-1">
	<span class="label px-3 text-sm text-wrap">{label}</span>
	<div class="join join-vertical">
		{#each options as option (option.value)}
			{@const { class: klass, ...props } = option}
			{@const checked = field?.value() === option.value || value === option.value}
			<label
				class={[
					'input join-item not-disabled:cursor-pointer not-disabled:hover:bg-base-200',
					'group h-auto min-h-10'
				]}
			>
				<div class="flex h-(--size) grow items-center gap-2">
					{#if option.icon}
						<option.icon size={18} opacity={0.8} />
					{/if}
					<span class="grow">{option.label}</span>
					{#if field}
						<input {...field.as('radio', option.value)} class={['w-0']} {...props} />
					{:else}
						<input
							type="radio"
							{checked}
							onchange={() => (value = option.value)}
							class={['w-0']}
							{...props}
						/>
					{/if}
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
