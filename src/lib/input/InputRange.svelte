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

<label>
	<div class="flex gap-2 px-3 text-sm">
		<span class="label">{label}</span>
		<span class="ml-auto">{field?.value() ?? value}</span>
	</div>
	{#if field}
		<input class={['range range-sm', klass]} {...field.as('range')} {...props} />
	{:else}
		<input class={['range range-sm', klass]} type="range" bind:value {...props} />
	{/if}
	<Issues {field} />
</label>
