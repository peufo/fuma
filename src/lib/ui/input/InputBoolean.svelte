<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import type { HTMLInputAttributes } from 'svelte/elements'
	import { FormControl, type InputProps, bindCheckedWithParams } from './index.js'
	import { USE_COERCE_BOOLEAN } from '$lib/utils/constant.js'

	type $$Props = InputProps<boolean> & { isRow?: boolean }
	export let value: boolean | null | undefined = false
	export let input: HTMLInputAttributes = {}
	export let inputElement: HTMLInputElement | undefined = undefined
	export let bindWithParams: boolean = false

	const dispatch = createEventDispatcher<{ change: boolean }>()
</script>

<FormControl {...$$restProps} let:key class="">
	<input
		bind:this={inputElement}
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

	<input type="hidden" name={key} value="{USE_COERCE_BOOLEAN}{value}" />
</FormControl>
