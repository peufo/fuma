<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import type { HTMLInputAttributes, FormEventHandler } from 'svelte/elements'
	import { FormControl, type InputProps } from './index.js'
	import { msToTime } from '$lib/utils/time.js'
	type $$Props = InputProps<number>

	export let value: number | null | undefined = undefined
	export let input: HTMLInputAttributes = {}

	$: ({ class: inputClass = '', ...inputProps } = input)

	let valueAsNumber = value
	let valueAsString = msToTime(value)
	$: if (value !== valueAsNumber) valueAsString = msToTime(value)

	const dispatch = createEventDispatcher<{ input: number }>()

	const onInput: FormEventHandler<HTMLInputElement> = (event) => {
		valueAsNumber = event.currentTarget.valueAsNumber
		value = valueAsNumber
		dispatch('input', valueAsNumber)
	}
</script>

<FormControl {...$$restProps} let:key>
	<input
		value={valueAsString}
		on:input={onInput}
		on:focus
		on:blur
		type="time"
		name={key}
		id={key}
		class="input input-bordered {inputClass}"
		{...inputProps}
	/>
</FormControl>
