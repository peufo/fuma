<script lang="ts">
	import type { FormEventHandler, HTMLInputAttributes } from 'svelte/elements'
	import { USE_COERCE_DATE } from '$lib/utils/constant.js'
	import { FormControl, type InputProps } from './index.js'
	import { createEventDispatcher } from 'svelte'
	import dayjs from 'dayjs'

	type $$Props = InputProps<Date | null | undefined>
	export let value: Date | null | undefined = undefined
	export let input: HTMLInputAttributes = {}
	$: ({ class: inputClass = '', ...inputProps } = input)

	const dispatch = createEventDispatcher<{ input: Date | null }>()

	const handleInput: FormEventHandler<HTMLInputElement> = ({ currentTarget }) => {
		value = getDateTime(currentTarget.value)
		dispatch('input', value)
	}

	function getDateTime(v: string | null | undefined): Date | null {
		if (typeof v !== 'string') return null
		return new Date(v)
	}
</script>

<FormControl {...$$restProps} let:key>
	<input
		value={value && dayjs(value).format('YYYY-MM-DDTHH:mm')}
		on:input={handleInput}
		on:focus
		on:blur
		type="datetime-local"
		id={key}
		class="input input-bordered {inputClass}"
		{...inputProps}
	/>

	<input type="hidden" name={key} value="{USE_COERCE_DATE}{value?.toJSON()}" />
</FormControl>
