<script lang="ts">
	import { CopyIcon, type IconProps } from '@lucide/svelte'
	import type { Component } from 'svelte'
	import type { MouseEventHandler } from 'svelte/elements'
	import { toast } from 'svelte-sonner'
	import { tip } from '$lib/action/tip.js'

	let {
		value,
		title = '',
		label = '',
		Icon = CopyIcon,
		class: klass = '',
		successMessage = 'Copied',
		onSuccess
	}: {
		value: string | (() => Promise<string>)
		title?: string
		label?: string
		Icon?: Component<IconProps>
		class?: string
		successMessage?: string
		onSuccess?: () => void
	} = $props()

	let isLoading = $state(false)

	async function loadValue(): Promise<string> {
		if (typeof value === 'string') return value
		return value()
	}

	const onclick: MouseEventHandler<HTMLButtonElement> = async (event) => {
		event.preventDefault()
		if (isLoading) return
		isLoading = true
		const value = await loadValue().finally(() => (isLoading = false))

		navigator.clipboard
			.writeText(value)
			.then(() => {
				toast.success(successMessage)
				onSuccess?.()
			})
			.catch((error) => {
				toast.error(error)
			})
	}
</script>

<div class="relative">
	{#if isLoading}
		<span class="loading absolute top-1 left-1 scale-125 loading-spinner opacity-25"></span>
	{/if}
	<button
		type="button"
		class={klass ? klass : `btn btn-sm ${label ? '' : ' btn-square'}`}
		{onclick}
		class:btn-disabled={isLoading}
		use:tip={{ content: title }}
	>
		<Icon size={20} class="transition-transform {isLoading ? 'scale-75' : ''}" />
		{#if label}
			<span>{label}</span>
		{/if}
	</button>
</div>
