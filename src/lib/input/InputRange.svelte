<script lang="ts">
	import type { RemoteFormField } from '@sveltejs/kit'
	import Issues from './Issues.svelte'
	import type { InputProps } from './type.js'

	let {
		label,
		field,
		value = $bindable(),
		name,
		class: klass,
		...props
	}: {
		label: string
		field?: RemoteFormField<number>
		value?: number
		/** Sans `field`, ce qui nomme la valeur soumise. Avec, `field.as()` s'en charge. */
		name?: string
	} & InputProps = $props()
</script>

<label>
	<div class="flex gap-2 px-3 text-sm">
		<span class="label text-wrap">{label}</span>
		<span class="label ml-auto">{field?.value() ?? value}</span>
	</div>
	{#if field}
		<input class={['range w-full range-sm', klass]} {...field.as('range')} {...props} />
	{:else}
		<input class={['range w-full range-sm', klass]} type="range" {name} bind:value {...props} />
	{/if}
	<Issues {field} />
</label>
