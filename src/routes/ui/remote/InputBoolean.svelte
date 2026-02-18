<script lang="ts">
	import type { RemoteFormField } from '@sveltejs/kit';
	import { tick } from 'svelte';
	import Issues from './Issues.svelte';
	import type { InputProps } from './type.ts';

	let {
		field,
		label,
		hint,
		variant = 'toggle',
		class: klass,
		...props
	}: {
		label: string;
		hint?: string;
		variant?: 'checkbox' | 'toggle';
		field: RemoteFormField<boolean>;
	} & InputProps = $props();

	let input = $state<HTMLInputElement>();

	const toggleValue = async () => {
		field.set(!field.value());
		await tick();
		input?.dispatchEvent(new Event('input', { bubbles: true }));
	};
</script>

<div>
	<div
		role="button"
		class={['flex cursor-pointer border p-2 pl-3', !hint && 'items-center']}
		tabindex="-1"
		onclick={() => toggleValue()}
		onkeydown={(e) => e.key === 'space' && toggleValue()}
	>
		<div class="grow text-left">
			<div class="text-sm font-light">{label}</div>
			{#if hint}
				<div class="text-xs opacity-70">{hint}</div>
			{/if}
		</div>
		<input class={[variant, klass]} {...field.as('checkbox')} {...props} bind:this={input} />
	</div>
	<Issues {field} />
</div>

<style>
	div[role='button'] {
		--input-color: color-mix(in oklab, var(--color-base-content) 20%, #0000);
		border-radius: var(--radius-field);
		border-color: var(--input-color);
	}
	div[role='button']:has(input[aria-invalid='true']) {
		--input-color: var(--color-error);
	}
	div[role='button']:hover {
		border-color: var(--color-base-content);
	}
</style>
