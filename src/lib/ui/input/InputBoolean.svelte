<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { FormControl, type InputProps, bindCheckedWithParams } from './index.js'

	type $$Props = InputProps<boolean>
	$: ({ input, value: _value, bindWithParams, label, ...props } = $$restProps as $$Props)
	export let value = _value

	const dispatch = createEventDispatcher<{ change: boolean }>()
</script>

<FormControl {...props} let:key>
	<label for={key} class="label cursor-pointer">
		<span class="label-text">
			<slot>{label}</slot>
		</span>
	</label>

	<input
		bind:checked={value}
		use:bindCheckedWithParams={{ bindEnable: bindWithParams }}
		on:input={({ currentTarget: { checked } }) => dispatch('change', checked)}
		on:focus
		on:blur
		type="checkbox"
		id={key}
		class="checkbox ml-1"
		{...input}
	/>

	<input type="hidden" name={key} value={value ? 'true' : ''} />
</FormControl>
