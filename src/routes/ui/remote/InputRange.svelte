<script lang="ts">
	import type { RemoteFormField } from '@sveltejs/kit';
	import Issues from './Issues.svelte';
	import type { InputProps } from './type.ts';

	let {
		label,
		field,
		class: klass,
		...props
	}: {
		label: string;
		field: RemoteFormField<number>;
	} & InputProps = $props();
</script>

<label>
	<span class="px-3 text-sm font-light">{label}</span>
	<input class={['range range-sm', klass]} {...field.as('range')} {...props} />
	<Issues {field} />
</label>
