<script lang="ts">
	import { FormControl, type TextareaProps } from './index.js'
	type $$Props = TextareaProps
	$: ({ textarea, value: _value, ...props } = $$props as $$Props)
	$: ({ class: inputClass, ...inputProps } = textarea || {})
	export let value = _value
</script>

<FormControl {...props} let:key>
	<slot name="label_append" slot="label_append" />
	<textarea
		bind:value
		on:input
		on:focus
		on:blur
		name={key}
		id={key}
		class="textarea textarea-bordered {inputClass || ''}"
		rows="4"
		{...inputProps}
	/>
</FormControl>
