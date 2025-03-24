<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import type { HTMLInputAttributes, FormEventHandler } from 'svelte/elements'
	import { FormControl, type InputProps } from './index.js'
	import dayjs from 'dayjs'
	type $$Props = InputProps<Date>

	export let value: Date | null | undefined = undefined
	export let input: HTMLInputAttributes = {}
	export let getDefaultDate = () => new Date(0)

	$: ({ class: inputClass = '', ...inputProps } = input)

	const dispatch = createEventDispatcher<{ input: Date | null }>()

	const onInput: FormEventHandler<HTMLInputElement> = ({ currentTarget }) => {
		value = getDateTime(currentTarget.value)
		dispatch('input', value)
	}

	function getDateTime(v: string | null | undefined): Date | null | undefined {
		if (!v) return value
		const date = value ? new Date(value) : getDefaultDate()
		const dateString = [
			date.getFullYear().toString(),
			(date.getMonth() + 1).toString().padStart(2, '0'),
			date.getDate().toString().padStart(2, '0')
		].join('-')
		return new Date(`${dateString}T${v}`)
	}
</script>

<FormControl {...$$restProps} let:key>
	<input
		value={value && dayjs(value).format('HH:mm')}
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
