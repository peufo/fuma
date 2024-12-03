<script lang="ts">
	import { FormControl, type InputProps } from './index.js'

	type $$Props = InputProps & { autocomplete?: string }
	$: ({ input, value: _value, ...props } = $$props as $$Props)
	export let value = _value
	export let autocomplete = 'current-password'
</script>

<FormControl {...props}>
	{#snippet children({ key })}
		<input
			bind:value
			on:input
			on:focus
			on:blur
			type="password"
			name={key}
			id={key}
			class="input input-bordered"
			{autocomplete}
			{...input}
		/>
	{/snippet}
</FormControl>
