<script lang="ts">
	import type { RemoteFormField } from '@sveltejs/kit';
	import { type Options, parseOptions } from '$lib/utils/index.ts';
	import Issues from './Issues.svelte';
	import type { InputProps } from './type.ts';

	let {
		field,
		label,
		options: optionsProp,
		class: klass,
		...props
	}: {
		field: RemoteFormField<string>;
		label: string;
		hint?: string;
		options: Options;
	} & InputProps = $props();

	const options = $derived(parseOptions(optionsProp));
</script>

<div class="flex flex-col gap-1">
	<span class="label px-3 text-sm">{label}</span>
	<div class="join join-vertical">
		{#each options as option}
			<label class="input join-item flex items-center gap-2 not-disabled:cursor-pointer">
				{#if option.icon}
					<option.icon size={18} opacity={0.8} />
				{/if}
				<span>{option.label}</span>
				<input {...field.as('radio', option.value)} class={['radio ml-auto', klass]} {...props} />
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
