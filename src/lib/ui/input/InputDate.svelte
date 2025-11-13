<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import type { FormEventHandler, HTMLInputAttributes } from 'svelte/elements'
	import dayjs from 'dayjs'

	import { FormControl, type InputProps } from './index.js'
	import { USE_COERCE_DATE } from '$lib/utils/constant.js'

	type $$Props = InputProps<Date | null | undefined> & { noPreserveTime?: boolean }
	export let value: Date | null | undefined = undefined
	export let input: HTMLInputAttributes = {}
	export let noPreserveTime = false
	$: ({ class: inputClass = '', ...inputProps } = input)

	const dispatch = createEventDispatcher<{ input: Date | null }>()

	const handleInput: FormEventHandler<HTMLInputElement> = ({ currentTarget }) => {
		const newValue = currentTarget.valueAsDate
		if (noPreserveTime) newValue?.setHours(0, 0, 0, 0)
		else
			newValue?.setHours(
				value?.getHours() || 0,
				value?.getMinutes() || 0,
				value?.getSeconds() || 0,
				0
			)
		value = newValue
		dispatch('input', value)
	}
</script>

<FormControl {...$$restProps}>
	{#snippet children({ key })}
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

		<input type="hidden" name={key} value="{USE_COERCE_DATE}{value?.toJSON()}" />
	{/snippet}
</FormControl>
