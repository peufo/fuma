<script lang="ts">
	import { FormControl, type InputProps } from './index.js'
	import type { HTMLInputAttributes } from 'svelte/elements'

	type $$Props = InputProps<number>

	export let value: number | null | undefined = undefined
	export let input: HTMLInputAttributes | undefined = undefined
	export let inputElement: HTMLInputElement | undefined = undefined
</script>

<FormControl {...$$restProps} let:key>
	<slot name="label_append" slot="label_append" />
	<input
		bind:value
		bind:this={inputElement}
		on:input
		on:focus
		on:blur
		type="number"
		name={key}
		id={key}
		inputmode="numeric"
		class="input input-bordered"
		{...input}
	/>
</FormControl>
