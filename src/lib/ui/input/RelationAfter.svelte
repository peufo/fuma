<script lang="ts">
	import { fade } from 'svelte/transition'
	import { createEventDispatcher } from 'svelte'
	import { mdiLoading, mdiPlus } from '@mdi/js'

	import Icon from '$lib/ui/Icon.svelte'

	export let isLoading: boolean
	export let createUrl = ''
	export let createTitle = ''
	export let createIcon = mdiPlus

	const dispatch = createEventDispatcher<{ unselect: void; create: void }>()
</script>

{#if isLoading}
	<div in:fade|local>
		<Icon
			path={mdiLoading}
			class="w-9"
			classSVG="animate-spin fill-primary-ligther stroke-primary-ligther"
		/>
	</div>
{:else if createUrl}
	<a href={createUrl} class="btn btn-square btn-sm" in:fade|local={{ duration: 200 }}>
		<Icon path={createIcon} on:click={() => dispatch('create')} title={createTitle} />
	</a>
{/if}
