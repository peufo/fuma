<script lang="ts">
	import { GhostIcon, LoaderCircleIcon, TriangleAlertIcon } from '@lucide/svelte'
	import type { RemoteQuery } from '@sveltejs/kit'
	import type { ClassValue } from 'svelte/elements'
	import { fade } from 'svelte/transition'

	let {
		query,
		empty = 'Aucun résultat',
		error = 'Une erreur est survenue',
		class: klass
	}: {
		query: RemoteQuery<unknown>
		empty?: string
		error?: string
		class?: ClassValue
	} = $props()

	const isEmpty = $derived.by(() => {
		if (!query.ready) return true
		if (!query.current) return true
		if (Array.isArray(query.current) && !query.current.length) return true
		return false
	})

	const box = 'm-2 flex flex-col items-center gap-1 rounded border border-dashed p-2 text-sm'
</script>

{#if query.loading}
	<div class={['grid h-12 place-content-center', klass]} in:fade={{ duration: 200 }}>
		<LoaderCircleIcon class="animate-spin" opacity={0.7} />
	</div>
{:else if query.error}
	<div class={[box, 'border-error/50 text-error', klass]} in:fade={{ duration: 200 }}>
		<TriangleAlertIcon size={18} />
		<span>{error}</span>
	</div>
{:else if isEmpty}
	<div class={[box, 'border-base-content/50 opacity-70', klass]} in:fade={{ duration: 200 }}>
		<GhostIcon size={18} />
		<span>{empty}</span>
	</div>
{/if}
