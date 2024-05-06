<script lang="ts">
	import { FormControl, type InputProps } from './index.js'

	type $$Props = InputProps<string | number>
	$: ({ input, value: _value, ...props } = $$props as $$Props)
	$: ({ class: inputClass, ...inputProps } = input || {})
	export let value = _value
</script>

<FormControl {...props} let:key>
	<slot name="label_append" slot="label_append" />
	<input
		bind:value
		bind:this={props.inputElement}
		on:input
		on:focus
		on:blur
		type="number"
		name={key}
		id={key}
		inputmode="numeric"
		class="input input-bordered {inputClass || ''}"
		{...inputProps}
	/>
</FormControl>
