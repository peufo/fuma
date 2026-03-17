<script lang="ts">
	import type { RemoteFormField } from '@sveltejs/kit';
	import { type Options, Pagination, parseOptions } from '$lib/index.ts';
	import Issues from './Issues.svelte';
	import type { SelectProps } from './type.ts';

	let {
		label,
		field,
		options: optionsProp,
		class: klass,
		multiple,
		...props
	}: {
		label: string;
		options: Options;
		field?: RemoteFormField<string | string[]>;
	} & SelectProps = $props();

	const options = $derived(parseOptions(optionsProp));
</script>
