<script lang="ts">
	import type { Snippet } from 'svelte'
	import { FormControl, bindValueWithParams, type InputProps } from './index.js'

	let {
		input,
		value = $bindable(),
		classWrapper,
		bindWithParams,
		inputElement = $bindable(),
		prepend,
		append,
		...controlProps
	}: InputProps & {
		prepend?: Snippet<[value: string | null | undefined]>
		append?: Snippet<[value: string | null | undefined]>
	} = $props()

	let inputProps = $derived({
		...input,
		class: `input input-bordered w-full ${input?.class || ''}`
	})
</script>

<FormControl {...controlProps} enhanceDisabled={controlProps.enhanceDisabled || bindWithParams}>
	{#snippet children({ key })}
		<div class={classWrapper}>
			{@render prepend?.(value)}
			<input
				bind:value
				on:input
				on:focus
				on:blur
				on:keydown
				on:keyup
				bind:this={inputElement}
				use:bindValueWithParams={{ bindEnable: bindWithParams, initValue: (v) => (value = v) }}
				type="text"
				name={key}
				id={key}
				{...inputProps}
			/>
			{@render append?.(value)}
		</div>
	{/snippet}
</FormControl>
