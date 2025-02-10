<script lang="ts">
	import { mdiClipboardTextOutline } from '@mdi/js'
	import { toast } from 'svelte-sonner'
	import { Icon } from '$lib/ui/icon/index.js'
	import { createEventDispatcher } from 'svelte'
	let valueOrGetValue: string | (() => Promise<string>)
	export { valueOrGetValue as value }
	export let title = ''
	export let label = ''
	export let icon = mdiClipboardTextOutline
	export let successMessage = 'Copied'
	let klass = ''
	export { klass as class }

	let isLoading = false
	const disptach = createEventDispatcher<{ success: void }>()

	async function loadValue(): Promise<string> {
		if (typeof valueOrGetValue === 'string') return valueOrGetValue
		return valueOrGetValue()
	}

	async function handleClick() {
		if (isLoading) return
		isLoading = true
		const value = await loadValue().finally(() => (isLoading = false))

		navigator.clipboard
			.writeText(value)
			.then(() => {
				toast.success(successMessage)
				disptach('success')
			})
			.catch((error) => {
				toast.error(error)
			})
	}
</script>

<div class="relative">
	{#if isLoading}
		<span class="loading loading-spinner absolute left-1 top-1 scale-125 opacity-25"></span>
	{/if}
	<button
		class={klass ? klass : `btn btn-sm ${label ? '' : ' btn-square'}`}
		on:click|preventDefault={handleClick}
		class:btn-disabled={isLoading}
	>
		<Icon
			path={icon}
			size={20}
			{title}
			class="transition-transform {isLoading ? 'scale-75' : ''}"
		/>
		{#if label}
			<span>{label}</span>
		{/if}
	</button>
</div>
