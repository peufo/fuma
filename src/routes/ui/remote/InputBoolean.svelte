<script lang="ts">
	import type { RemoteFormField } from '@sveltejs/kit';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import Issues from './Issues.svelte';

	let {
		field,
		label,
		hint,
		type = 'text',
		class: klass,
		...props
	}: {
		label: string;
		hint?: string;
		field: RemoteFormField<boolean>;
	} & Omit<HTMLInputAttributes, 'name' | 'value' | 'aria-invalid'> = $props();

	const toggleValue = () => field.set(!field.value());
</script>

<div
	role="button"
	class="flex cursor-pointer border p-2 pl-3"
	tabindex="-1"
	onclick={() => toggleValue()}
	onkeydown={(e) => e.key === 'space' && toggleValue()}
>
	<div class="grow text-left">
		<div class="text-sm font-light">{label}</div>
		{#if hint}
			<div class="text-xs opacity-70">{hint}</div>
		{/if}
		<Issues {field} />
	</div>
	<input class={['toggle', klass]} {...field.as('checkbox')} {...props} />
</div>

<style>
	:global(input[aria-invalid='true']) {
		--input-color: var(--color-error);
	}
	div[role='button'] {
		border-radius: var(--radius-field);
		border-color: color-mix(in oklab, var(--color-base-content) 20%, #0000);
	}
	div[role='button']:hover {
		border-color: var(--color-base-content);
	}
</style>
