<script lang="ts">
	import type { HTMLInputAttributes, FormEventHandler } from 'svelte/elements'
	import { FormControl, type InputProps } from './index.js'
	import { createEventDispatcher } from 'svelte'
	type $$Props = InputProps<number>

	export let value: number | null | undefined = undefined
	export let input: HTMLInputAttributes = {}

	$: ({ class: inputClass = '', ...inputProps } = input)

	let valueAsNumber = value
	let valueAsString = msToString(value)
	$: if (value !== valueAsNumber) valueAsString = msToString(value)

	const dispatch = createEventDispatcher<{ input: number }>()

	function msToString(ms: number | null | undefined): string {
		if (ms === null || ms === undefined) return ''
		const hours = Math.floor(ms / (1000 * 60 * 60))
		const minutes = Math.floor(ms / (1000 * 60) - hours * 60)
		const secondes = Math.floor(ms / 1000 - minutes * 60)
		const format = (n: number) => n.toString().padStart(2, '0')
		return [format(hours), format(minutes), format(secondes)].join(':')
	}

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
