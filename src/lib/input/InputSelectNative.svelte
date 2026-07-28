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
		...props
	}: {
		label: string
		options: Options
		field?: RemoteFormField<string | string[]>
		value?: string | string[]
	} & SelectProps = $props()

	const options = $derived(parseOptions(optionsProp))
</script>

<div>
	<label class="floating-label">
		<span>{label}</span>
		<select
			class={['select', klass]}
			{...field?.as(multiple !== true ? 'select' : 'select multiple')}
			bind:value
			{...props}
		>
			{#each options as option (option.value)}
				<option value={option.value} class={['', option.class]} disabled={option.disabled}>
					{#if option.icon}
						<option.icon size={18} opacity={0.8} />
					{/if}
					<span class="grow">{option.label}</span>
				</option>
			{/each}
		</select>
	</label>
	<Issues {field} />
</div>

<style>
	option::checkmark {
		order: 1;
		margin-left: auto;
	}

	select[aria-invalid='true'] {
		--input-color: var(--color-error);
	}
</style>
