<script lang="ts">
	import { CopyIcon, type IconProps } from '@lucide/svelte'
	import type { Component } from 'svelte'
	import type { ClassValue } from 'svelte/elements'
	import { tip } from '$lib/action/tip.js'
	import { type UseCopyOptions, useCopy } from './useCopy.svelte.ts'

	let {
		title = '',
		label = '',
		Icon = CopyIcon,
		class: klass = '',
		...copyOptions
	}: {
		/** Tooltip text */
		title?: string
		/** Button label */
		label?: string
		/** Icon component */
		Icon?: Component<IconProps>
		/** Additional CSS classes */
		class?: ClassValue
	} & UseCopyOptions = $props()

	const copy = $derived(useCopy(copyOptions))
</script>

<div class="relative">
	{#if copy.isLoading}
		<span class="loading absolute top-1 left-1 scale-125 loading-spinner opacity-25"></span>
	{/if}
	<button
		type="button"
		class={klass ? klass : `btn btn-sm ${label ? '' : ' btn-square'}`}
		{...copy}
		use:tip={{ content: title }}
	>
		<Icon size={20} class="transition-transform {copy.isLoading ? 'scale-75' : ''}" />
		{#if label}
			<span>{label}</span>
		{/if}
	</button>
</div>
