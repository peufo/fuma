<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import type { FormEventHandler, HTMLInputAttributes } from 'svelte/elements'
	import dayjs from 'dayjs'

	import { FormControl, type InputProps } from './index.js'
	import { USE_COERCE_DATE } from '$lib/utils/constant.js'

	type $$Props = InputProps<Date | null | undefined>
	export let value: Date | null | undefined = undefined
	export let input: HTMLInputAttributes = {}
	$: ({ class: inputClass = '', ...inputProps } = input)

	const dispatch = createEventDispatcher<{ input: Date | null }>()

	const handleInput: FormEventHandler<HTMLInputElement> = ({ currentTarget }) => {
		value = currentTarget.valueAsDate || null
		dispatch('input', value)
	}
</script>

<FormControl {...$$restProps} let:key>
	<input
		value={value && dayjs(value).format('YYYY-MM-DD')}
		on:input={handleInput}
		on:focus
		on:blur
		type="date"
		id={key}
		class="input input-bordered {inputClass}"
		{...inputProps}
	/>

	{#if value !== undefined}
		<input type="hidden" name={key} value="{USE_COERCE_DATE}{value?.toJSON()}" />
	{/if}
</FormControl>
