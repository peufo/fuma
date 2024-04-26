<script lang="ts">
	import { FormControl, bindValueWithParams, type InputProps } from './index.js'

	type $$Props = InputProps
	$: ({ input, value: _value, wrapperClass, bindWithParams, ...props } = $$props as $$Props)
	$: ({ class: inputClass, ...inputProps } = input || {})
	export let value = _value
	export let inputElement: HTMLInputElement | undefined = undefined
</script>

<FormControl {...props} enhanceDisabled={props.enhanceDisabled || bindWithParams} let:key>
	<slot name="label_append" slot="label_append" />

	<div class={wrapperClass}>
		<slot name="prepend" {value} />
		<input
			bind:value
			on:input
			on:focus
			on:blur
			on:keydown
			on:keyup
			bind:this={inputElement}
			use:bindValueWithParams={{ bindEnable: bindWithParams, initValue: (v) => (value = v) }}
			type="text"
			name={key}
			id={key}
			size={1}
			class="input input-bordered w-full {inputClass || ''}"
			{...inputProps}
		/>
		<slot name="append" {value} />
	</div>
</FormControl>
