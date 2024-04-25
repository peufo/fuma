<script lang="ts">
	import { fade } from 'svelte/transition'
	import { createEventDispatcher } from 'svelte'
	import { mdiLoading, mdiPlus } from '@mdi/js'

	import Icon from '$lib/ui/Icon.svelte'

	export let isLoading: boolean
	export let createUrl = ''
	export let createTitle = ''

	const dispatch = createEventDispatcher<{ unselect: void; create: void }>()
</script>

{#if isLoading}
	<div class:right-10={createUrl} transition:fade|local>
		<Icon
			path={mdiLoading}
			class="w-9"
			classSVG="animate-spin fill-primary-ligther stroke-primary-ligther"
		/>
	</div>
{/if}

{#if createUrl}
	<button class="btn btn-square btn-sm">
		<Icon path={mdiPlus} on:click={() => dispatch('create')} title={createTitle} />
	</button>
{/if}
