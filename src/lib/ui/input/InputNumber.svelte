<script lang="ts">
	import { USE_COERCE_NUMBER } from '$lib/utils/constant.js'
	import { FormControl, type InputProps } from './index.js'
	import type { HTMLInputAttributes } from 'svelte/elements'

	type $$Props = InputProps<number>

	export let value: number | null | undefined = undefined
	export let input: HTMLInputAttributes | undefined = undefined
	export let inputElement: HTMLInputElement | undefined = undefined
</script>

<FormControl {...$$restProps}>
	{#snippet children({ key })}
		<input
			bind:value
			bind:this={inputElement}
			on:input
			on:focus
			on:blur
			type="number"
			id={key}
			inputmode="numeric"
			class="input input-bordered"
			{...input}
		/>
		{#if value !== undefined}
			<input type="hidden" name={key} value="{USE_COERCE_NUMBER}{value}" />
		{/if}
	{/snippet}
</FormControl>
