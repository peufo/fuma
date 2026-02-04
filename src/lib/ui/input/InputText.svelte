<script lang="ts">
	import type { Snippet } from 'svelte'
	import { FormControl, bindValueWithParams, type InputProps } from './index.js'
	import type { FocusEventHandler, FormEventHandler, KeyboardEventHandler } from 'svelte/elements'

	let {
		input,
		value = $bindable(),
		classWrapper,
		bindWithParams,
		inputElement = $bindable(),
		prepend,
		append,
		error = $bindable(),
		oninput,
		onfocus,
		onblur,
		onkeydown,
		onkeyup,
		...controlProps
	}: InputProps & {
		prepend?: Snippet<[value: string | null | undefined]>
		append?: Snippet<[value: string | null | undefined]>
		oninput?: FormEventHandler<HTMLInputElement>
		onfocus?: FocusEventHandler<HTMLInputElement>
		onblur?: FocusEventHandler<HTMLInputElement>
		onkeydown?: KeyboardEventHandler<HTMLInputElement>
		onkeyup?: KeyboardEventHandler<HTMLInputElement>
	} = $props()

	let inputProps = $derived({
		...input,
		class: `input input-bordered w-full ${input?.class || ''}`
	})
</script>

<FormControl
	{...controlProps}
	bind:error
	enhanceDisabled={controlProps.enhanceDisabled || bindWithParams}
>
	{#snippet children({ key })}
		<div class={classWrapper}>
			{@render prepend?.(value)}
			<input
				bind:value
				{oninput}
				{onfocus}
				{onblur}
				{onkeydown}
				{onkeyup}
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
