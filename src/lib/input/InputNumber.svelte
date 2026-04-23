<script lang="ts">
	import type { RemoteFormField } from '@sveltejs/kit'
	import Issues from './Issues.svelte'
	import type { InputProps } from './type.ts'

	let {
		label,
		field,
		value = $bindable(),
		class: klass,
		...props
	}: {
		label: string
		field?: RemoteFormField<number>
		value?: number
	} & InputProps = $props()
</script>

<label class="floating-label">
	<span class="label">{label}</span>
	{#if field}
		<input placeholder={label} class={['input', klass]} {...field.as('number')} {...props} />
	{:else}
		<input placeholder={label} class={['input', klass]} type="number" bind:value {...props} />
	{/if}
	<Issues {field} />
</label>

<style>
	input[aria-invalid='true'] {
		--input-color: var(--color-error);
	}
</style>
