<script lang="ts">
	import type { Snippet } from 'svelte'
	import { MediaQuery } from 'svelte/reactivity'
	import { type PopoverOptions, usePopover } from '$lib/popover/index.js'
	import { Dialog } from '$lib/ui/dialog/index.js'

	let {
		class: klass = '',
		onShow,
		onHide,
		children,
		...popoverOptions
	}: {
		class?: string
		onShow?: () => void
		onHide?: () => void
		children: Snippet
	} & PopoverOptions = $props()

	const isSmallScreen = new MediaQuery('max-width: 600px;')
	// Le menu s'ouvre sur le curseur: un point invisible sert d'ancre et il n'y a aucun
	// élément déclencheur à écouter, l'ouverture passe uniquement par `show()`.
	const popover = usePopover({
		...(() => popoverOptions)(),
		listenClick: false,
		listenFocus: false
	})
	let dialog = $state<HTMLDialogElement>()
	let anchor = $state<HTMLElement>()

	export function show(event: MouseEvent) {
		if (isSmallScreen.current) {
			dialog?.showModal()
		} else {
			if (!anchor) return
			// Positionné dans la foulée plutôt que via un `$state`: `showPopover()` lit la
			// position de l'ancre avant qu'un effet Svelte ait eu le temps de s'appliquer.
			anchor.style.left = `${event.clientX}px`
			anchor.style.top = `${event.clientY}px`
			popover.show()
		}
		onShow?.()
	}

	export function hide() {
		if (isSmallScreen.current) dialog?.close()
		else popover.hide()
		onHide?.()
	}
</script>

{#if isSmallScreen.current}
	<Dialog bind:dialog class={klass}>
		{@render children()}
	</Dialog>
{:else}
	<div bind:this={anchor} {...popover.trigger} class="pointer-events-none fixed h-0 w-0"></div>

	<div {...popover.content} class={['rounded-box border bg-base-100 p-1 shadow-xl', klass]}>
		{@render children()}
	</div>
{/if}

<style>
	div[popover] {
		border-color: color-mix(in oklab, var(--color-base-content) 20%, #0000);
	}
</style>
