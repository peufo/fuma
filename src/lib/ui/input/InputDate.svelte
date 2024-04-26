<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import type { FormEventHandler } from 'svelte/elements'
	import dayjs from 'dayjs'

	import { FormControl, type InputProps } from './index.js'
	type $$Props = InputProps<Date | null>
	$: ({ input, value: _value, ...props } = $$props as $$Props)
	$: ({ class: inputClass, ...inputProps } = input || {})

	export let value = _value

	const dispatch = createEventDispatcher<{ input: Date | null }>()

	const handleInput: FormEventHandler<HTMLInputElement> = ({ currentTarget }) => {
		value = currentTarget.valueAsDate || null
		dispatch('input', value)
	}
</script>

<FormControl {...props} let:key>
	<input
		value={value && dayjs(value).format('YYYY-MM-DD')}
		on:input={handleInput}
		on:focus
		on:blur
		type="date"
		name={key}
		id={key}
		size={1}
		class="input input-bordered {inputClass || {}}"
		{...inputProps}
	/>
</FormControl>
