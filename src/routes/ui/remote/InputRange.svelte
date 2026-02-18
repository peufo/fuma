<script lang="ts">
	import type { RemoteFormField } from '@sveltejs/kit';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import Issues from './Issues.svelte';

	let {
		label,
		field,
		class: klass,
		...props
	}: {
		label: string;
		field: RemoteFormField<number>;
	} & Omit<HTMLInputAttributes, 'name' | 'value' | 'aria-invalid'> = $props();
</script>

<label>
	<span class="px-3 text-sm font-light">{label}</span>
	<input class={['range range-sm', klass]} {...field.as('range')} {...props} />
	<Issues {field} />
</label>
