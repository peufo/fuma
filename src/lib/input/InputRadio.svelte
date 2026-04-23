<script lang="ts">
	import type { RemoteFormField } from '@sveltejs/kit'
	import { type Options, parseOptions } from '$lib/utils/index.ts'
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
	<span class="label px-3 text-sm">{label}</span>
	<div class="join join-vertical">
		{#each options as option}
			{@const { class: klass, ...props } = option}
			<label class="input join-item not-disabled:cursor-pointer not-disabled:hover:bg-base-200">
				{#if option.icon}
					<option.icon size={18} opacity={0.8} />
				{/if}
				<span>{option.label}</span>
				{#if field}
					<input
						{...field.as('radio', option.value)}
						class={['radio ml-auto radio-sm', klass]}
						{...props}
					/>
				{:else}
					<input
						type="radio"
						checked={value === option.value}
						onchange={() => (value = option.value)}
						class={['radio ml-auto radio-sm', klass]}
						{...props}
					/>
				{/if}
			</label>
		{/each}
	</div>
	<Issues {field} />
</div>

<style>
	input {
		--input-color: var(--color-base-content);
	}
</style>
