<script lang="ts">
	import type { Component } from 'svelte'
	import { fade } from 'svelte/transition'
	import { LoaderCircleIcon, PlusIcon, type IconProps } from '@lucide/svelte'

	let {
		isLoading = $bindable(false),
		createUrl = '',
		createTitle = '',
		CreateIcon = PlusIcon,
		onCreate
	}: {
		isLoading: boolean
		createUrl?: string
		createTitle?: string
		CreateIcon?: Component<IconProps>
		onCreate?: () => void
	} = $props()
</script>

{#if isLoading}
	<div in:fade|local>
		<LoaderCircleIcon class="w-9 animate-spin fill-primary-ligther stroke-primary-ligther" />
	</div>
{:else if createUrl}
	<a
		href={createUrl}
		class="btn btn-square btn-xs"
		in:fade|local={{ duration: 200 }}
		data-sveltekit-noscroll
		data-sveltekit-replacestate
	>
		<CreateIcon onclick={onCreate} title={createTitle} />
	</a>
{/if}
