<script lang="ts">
	import { FormControl, type InputProps } from './index.js'
	type $$Props = InputProps
	$: ({ input, value: _value, ...props } = $$props as $$Props)
	$: ({ class: inputClass, ...inputProps } = input || {})
	export let value = _value
</script>

<FormControl {...props} let:key>
	<input
		bind:value
		on:input
		on:focus
		on:blur
		type="time"
		name={key}
		id={key}
		class="input input-bordered {inputClass || ''}"
		{...inputProps}
	/>
</FormControl>
