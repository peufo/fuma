<script lang="ts">
	import { ChevronsUpDownIcon } from '@lucide/svelte';
	import type { RemoteFormField } from '@sveltejs/kit';
	import { type Option, type Options, parseOptions } from '$lib/index.ts';
	import Issues from './Issues.svelte';
	import type { SelectProps } from './type.ts';

	let {
		label,
		field,
		options: optionsProp,
		class: klass,
		...props
	}: {
		label: string;
		field: RemoteFormField<string>;
		options: Options;
	} & SelectProps = $props();

	const options = $derived(parseOptions(optionsProp));
</script>

<div>
	<label class="floating-label">
		<span>{label}</span>
		<select {...field.as('select')} class={['select', klass]} {...props}>
			{#each options as option}
				<option
					value={option.value}
					class={['grow gap-2', option.class]}
					disabled={option.disabled}
				>
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
