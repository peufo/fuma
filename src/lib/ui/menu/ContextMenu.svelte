<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import type { TippyProps } from '$lib/utils/tippy.js'

	import { Dialog, DropDown } from '$lib/index.js'
	import { isSmallScreen } from '$lib/store/index.js'

	export let tippyProps: Partial<TippyProps> = {}
	let klass = ''
	export { klass as class }

	const dispatch = createEventDispatcher<{ show: void; hide: void }>()

	let dropdown: DropDown
	let dialog: HTMLDialogElement

	export function show(event: MouseEvent) {
		if ($isSmallScreen) {
			dialog?.showModal()
		} else {
			const target = event.target as HTMLElement
			if (!target || !(target instanceof HTMLElement)) return
			dropdown?.setTippyProps({
				getReferenceClientRect: () => new DOMRect(event.clientX, event.clientY)
			})
			dropdown?.show()
		}

		dispatch('show')
	}

	export function hide() {
		if ($isSmallScreen) dialog?.close()
		else dropdown?.hide()
		dispatch('hide')
	}
</script>

{#if $isSmallScreen}
	<Dialog bind:dialog class={klass}>
		<div slot="header" class="contents">
			<slot name="header" />
		</div>
		<slot />
	</Dialog>
{:else}
	<DropDown class={klass} bind:this={dropdown} tippyProps={{ offset: [0, -5], ...tippyProps }}>
		<div class="flex flex-col gap-2 p-1">
			<slot name="header" />
			<slot />
		</div>
	</DropDown>
{/if}
