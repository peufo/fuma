<script lang="ts">
	import type { Snippet } from 'svelte';
	import { MediaQuery } from 'svelte/reactivity';
	import { Dialog } from '$lib/ui/dialog/index.js';
	import { DropDown } from '$lib/ui/menu/index.js';
	import type { TippyProps } from '$lib/utils/tippy.js';

	let {
		tippyProps = {},
		class: klass = '',
		onShow,
		onHide,
		children
	}: {
		tippyProps?: Partial<TippyProps>;
		class?: string;
		onShow?: () => void;
		onHide?: () => void;
		children: Snippet;
	} = $props();

	const isSmallScreen = new MediaQuery('max-width: 600px;');
	let dropdown: DropDown | undefined = $state();
	let dialog: HTMLDialogElement | undefined = $state();

	export function show(event: MouseEvent) {
		if (isSmallScreen.current) {
			dialog?.showModal();
		} else {
			const target = event.target as HTMLElement;
			if (!target || !(target instanceof HTMLElement)) return;
			dropdown?.setTippyProps({
				getReferenceClientRect: () => new DOMRect(event.clientX, event.clientY)
			});
			dropdown?.show();
		}
		onShow?.();
	}

	export function hide() {
		if (isSmallScreen.current) dialog?.close();
		else dropdown?.hide();
		onHide?.();
	}
</script>

{#if isSmallScreen.current}
	<Dialog bind:dialog class={klass}>
		{@render children()}
	</Dialog>
{:else}
	<DropDown class={klass} bind:this={dropdown} tippyProps={{ offset: [0, -5], ...tippyProps }}>
		{@render children()}
	</DropDown>
{/if}
