<script lang="ts">
	import { CheckIcon } from '@lucide/svelte';
	import type { RemoteFormField } from '@sveltejs/kit';
	import Issues from './Issues.svelte';
	import type { InputProps } from './type.ts';

	let {
		field,
		label,
		hint,
		variant = 'switch',
		class: klass,
		...props
	}: {
		label: string;
		hint?: string;
		variant?: 'checkbox' | 'switch';
		field: RemoteFormField<boolean>;
	} & InputProps = $props();
</script>

<div>
	<label
		class={[
			'input block not-disabled:cursor-pointer not-disabled:hover:bg-base-200',
			'group h-auto min-h-10'
		]}
	>
		<div class="flex h-(--size) items-center gap-2">
			<div class="grow">{label}</div>
			<input {...field.as('checkbox')} class={['peer w-0']} {...props} />
			{#if variant === 'checkbox'}
				{@render checkbox()}
			{:else}
				{@render checkbox()}
			{/if}
		</div>
		{#if hint}
			<div class="-translate-y-2.5 pr-8 text-xs text-wrap opacity-70">{hint}</div>
		{/if}
	</label>
	<Issues {field} />
</div>

{#snippet checkbox()}
	<div class={['mask h-6 w-6 mask-squircle', 'bg-base-content']}>
		<div class={['mask h-6 w-6 mask-squircle', 'bg-base-100', 'scale-90']}>
			<div
				class={[
					'mask h-6 w-6 mask-squircle',
					'bg-base-content',
					'grid place-content-center',
					'scale-0 transition-all',
					field.value() && 'scale-75'
				]}
				style="transition-timing-function: cubic-bezier(0.275, 0.485, 0.515, 1.450);"
			>
				<CheckIcon size={20} class="stroke-base-100" strokeWidth={4} />
			</div>
		</div>
	</div>
{/snippet}

<style>
	label:has(input[aria-invalid='true']) {
		--input-color: var(--color-error);
	}
	label:has(input:disabled) {
		cursor: not-allowed;
		border-color: var(--input-color);
	}
</style>
