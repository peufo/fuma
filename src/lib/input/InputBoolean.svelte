<script lang="ts">
	import { CheckIcon } from '@lucide/svelte'
	import type { RemoteFormField } from '@sveltejs/kit'
	import Issues from './Issues.svelte'
	import type { InputProps } from './type.js'

	let {
		field,
		label,
		checked = $bindable(),
		hint,
		variant = 'checkbox',
		...props
	}: {
		label: string
		field?: RemoteFormField<boolean>
		checked?: boolean
		hint?: string
		variant?: 'checkbox' | 'switch'
	} & InputProps = $props()

	let isChecked = $derived(field?.value() ?? checked)
</script>

<div>
	<label
		class={[
			'input block not-disabled:cursor-pointer not-disabled:hover:bg-base-200',
			'group h-auto min-h-10 w-full'
		]}
	>
		<div class="flex h-(--size) items-center gap-2">
			<div class="grow">{label}</div>
			{#if field}
				<input {...field.as('checkbox')} class={['peer w-0']} {...props} />
			{:else}
				<input type="checkbox" class={['peer w-0']} bind:checked {...props} />
			{/if}
			{#if variant === 'checkbox'}
				{@render variantCheckbox()}
			{:else}
				{@render variantSwitch()}
			{/if}
		</div>
		{#if hint}
			<div
				class={[
					'-translate-y-2.5 text-xs text-wrap opacity-70',
					variant === 'checkbox' ? 'pr-8' : 'pr-10'
				]}
			>
				{hint}
			</div>
		{/if}
	</label>
	<Issues {field} />
</div>

{#snippet variantCheckbox()}
	<!-- https://developer.mozilla.org/en-US/docs/Web/CSS/corner-shape  -->
	<div class={['squircle', 'h-5 w-5 outline', 'bg-base-100']}>
		<div
			class={[
				'squircle',
				'grid h-5 w-5 place-content-center',
				'bg-base-content',
				'ease scale-0 opacity-0',
				isChecked && 'scale-[80%] opacity-100'
			]}
		>
			<CheckIcon size={18} class={['stroke-base-100']} strokeWidth={4} />
		</div>
	</div>
{/snippet}

{#snippet variantSwitch()}
	<div class={['h-5 w-9 rounded-full bg-base-100 p-1 outline-1']}>
		<div
			class={[
				'grid h-3 w-3 place-content-center rounded-full bg-base-100 outline-1',
				'ease translate-x-0',
				isChecked ? 'translate-x-4 bg-base-content' : 'opacity-100'
			]}
		>
			<CheckIcon size={11} class={['stroke-base-100']} strokeWidth={4} />
		</div>
	</div>
{/snippet}

<style>
	.ease {
		transition-property: translate background-color opacity;
		transition-timing-function: cubic-bezier(0.275, 0.485, 0.515, 1.45);
		transition-duration: 200ms;
	}
	.squircle {
		corner-shape: squircle;
		border-radius: 100%;
	}

	label:has(input[aria-invalid='true']) {
		--input-color: var(--color-error);
	}
	label:has(input:disabled) {
		cursor: not-allowed;
		border-color: var(--input-color);
	}
</style>
