<script lang="ts">
	import { mdiClipboardTextOutline } from '@mdi/js'
	import { toast } from 'svelte-sonner'
	import { Icon } from '$lib/ui/icon/index.js'
	let valueOrGetValue: string | (() => Promise<string>)
	export { valueOrGetValue as value }
	export let title = ''
	export let icon = mdiClipboardTextOutline
	export let successMessage = 'Copied'

	let isLoading = false

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
			})
			.catch((error) => {
				toast.error(error)
			})
	}
</script>

<div class="relative">
	{#if isLoading}
		<span class="loading loading-spinner absolute left-1 top-1 scale-125 opacity-25" />
	{/if}
	<button
		class="btn btn-square btn-sm"
		on:click|preventDefault={handleClick}
		class:btn-disabled={isLoading}
	>
		<Icon
			path={icon}
			size={20}
			{title}
			class="transition-transform {isLoading ? 'scale-75' : ''}"
		/>
	</button>
</div>
