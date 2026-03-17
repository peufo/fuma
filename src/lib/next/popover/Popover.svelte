<script lang="ts" module>
	type Alignement = 'start' | 'end';
	type Position = 'left' | 'right' | 'top' | 'bottom';
	type Placement = Position | `${Position}-${Alignement}`;
	const placements: Record<Placement, string> = {
		top: 'top',
		'top-end': 'top span-left',
		'top-start': 'top span-right',
		bottom: 'bottom',
		'bottom-end': 'bottom span-left',
		'bottom-start': 'bottom span-right',
		left: 'left',
		'left-end': 'left span-top',
		'left-start': 'left span-bottom',
		right: 'right',
		'right-end': 'right span-top',
		'right-start': 'right span-bottom'
	};

	export type PopoverType = ReturnType<typeof usePopover>;

	type PopoverOptions = {
		mode?: 'auto' | 'hint' | 'manual';
		placement?: Placement;
		listeners?: ('mouseover' | 'focus' | 'click')[];
	};

	let popoverInstanceCount = 0;

	function usePopover({
		mode = 'auto',
		placement = 'bottom-start',
		listeners = ['click']
	}: PopoverOptions = {}) {
		const uid = popoverInstanceCount++;
		const anchorName = `--anchor-${uid}`;
		let popover = $state<HTMLElement>();

		function show() {
			popover?.showPopover();
		}

		function hide() {
			popover?.hidePopover();
		}

		function toggle() {
			popover?.togglePopover();
		}

		return {
			show,
			hide,
			toggle,
			content: {
				popover: mode,
				[createAttachmentKey()]: (node: HTMLElement) => {
					popover = node;
					// @ts-expect-error
					popover.style.positionAnchor = anchorName;
					// @ts-expect-error
					popover.style.positionArea = placements[placement];
				}
			},
			activator: {
				[createAttachmentKey()]: (node: HTMLElement) => {
					// @ts-expect-error
					node.style.anchorName = anchorName;

					const cleanups: (() => void)[] = [];
					if (listeners.includes('mouseover')) {
						cleanups.push(on(node, 'mouseenter', () => show()));
						cleanups.push(on(node, 'mouseleave', () => hide()));
					}
					if (listeners.includes('focus')) {
						cleanups.push(on(node, 'focusin', () => show()));
						cleanups.push(on(node, 'focusout', () => hide()));
					}
					if (listeners.includes('click')) {
						cleanups.push(on(node, 'click', () => toggle()));
					}
					return () => {
						for (const cleanup of cleanups) cleanup();
					};
				}
			}
		};
	}
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { createAttachmentKey } from 'svelte/attachments';
	import type { ClassValue } from 'svelte/elements';
	import { on } from 'svelte/events';

	let {
		children,
		activator,
		class: klass = '',
		...popoverOptions
	}: {
		children: Snippet<[PopoverType]>;
		activator: Snippet<[PopoverType]>;
		placement?: Placement;
		class?: ClassValue;
	} & PopoverOptions = $props();

	let popover = usePopover(popoverOptions);
</script>

{@render activator(popover)}

<div {...popover.content} class={['shadow-sm" rounded-box border bg-base-100', klass]}>
	{@render children(popover)}
</div>

<style>
	div[popover] {
		inset: auto;
		position-try: flip-x, flip-y;
	}

	div[popover]:popover-open {
		transition-property: opacity, scale;
		transition-duration: 150ms;
		opacity: 1;
		scale: 1;
		@starting-style {
			opacity: 0;
			scale: 0.95;
		}
	}
</style>
