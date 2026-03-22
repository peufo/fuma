import { createAttachmentKey } from 'svelte/attachments';
import { on } from 'svelte/events';

type Alignement = 'start' | 'end';
type Position = 'left' | 'right' | 'top' | 'bottom';
export type Placement = Position | `${Position}-${Alignement}`;
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
export type PopoverOptions = {
	mode?: 'auto' | 'hint' | 'manual';
	placement?: Placement;
	listeners?: ('hover' | 'focus' | 'click')[];
};

let popoverInstanceCount = 0;

export function usePopover({
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

	/** Don't hide if interest is in popover */
	function hideSoft(event: MouseEvent | FocusEvent) {
		console.log('related:', event.relatedTarget);
		console.log('active:', document.activeElement);
		if (popover?.contains(event.relatedTarget as Node)) return;
		// TODO: check if interest is not in popover before
		popover?.hidePopover();
	}

	function toggle() {
		popover?.togglePopover();
	}

	function attachActivatorListeners(activator: HTMLElement): () => void {
		const cleanups: (() => void)[] = [];
		if (listeners.includes('hover')) {
			cleanups.push(on(activator, 'mouseenter', show));
			cleanups.push(on(activator, 'mouseleave', hideSoft));
		}
		if (listeners.includes('focus')) {
			cleanups.push(on(activator, 'focusin', show));
			cleanups.push(on(activator, 'focusout', hideSoft));
		}
		if (listeners.includes('click')) {
			cleanups.push(on(activator, 'click', toggle));
		}
		return () => {
			cleanups.forEach((cleanup) => {
				cleanup();
			});
		};
	}

	function attachPopoverListeners(node: HTMLElement): () => void {
		const cleanups: (() => void)[] = [];
		if (listeners.includes('hover')) {
			cleanups.push(on(node, 'mouseleave', hideSoft));
		}
		if (listeners.includes('focus')) {
			cleanups.push(on(node, 'focusout', hideSoft));
		}
		return () => {
			cleanups.forEach((cleanup) => {
				cleanup();
			});
		};
	}

	return {
		show,
		hide,
		hideSoft,
		toggle,
		content: {
			popover: mode,
			[createAttachmentKey()]: (node: HTMLElement) => {
				popover = node;
				popover.style.positionAnchor = anchorName;
				popover.style.positionArea = placements[placement];
				popover.style.inset = 'auto';
				popover.style.positionTry = 'flip-x, flip-y';

				const cleanup = attachPopoverListeners(node);
				return () => {
					cleanup();
				};
			}
		},
		activator: {
			[createAttachmentKey()]: (node: HTMLElement) => {
				node.style.anchorName = anchorName;
				const cleanup = attachActivatorListeners(node);
				return () => {
					cleanup();
				};
			}
		}
	};
}
