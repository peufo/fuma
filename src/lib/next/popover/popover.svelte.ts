import debounce from 'debounce';
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
	hideDelay?: number;
};

let popoverInstanceCount = 0;

export function usePopover({
	mode = 'manual',
	placement = 'bottom-start',
	listeners = ['click'],
	hideDelay = 400
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

	const hideDebounced = debounce(hide, hideDelay);

	function onMouseEnter() {
		hideDebounced.clear();
		show();
	}

	// Don't hide if popover have the focus
	function hideSoftFocus(event: FocusEvent) {
		hide();
	}

	function toggle() {
		console.log(popover?.matches(':popover-open'));
		if (popover?.matches(':popover-open')) popover.hidePopover();
		else popover?.showPopover();
	}

	function attachActivatorListeners(activator: HTMLElement): () => void {
		const cleanups: (() => void)[] = [];
		if (listeners.includes('hover')) {
			cleanups.push(on(activator, 'mouseenter', onMouseEnter));
			cleanups.push(on(activator, 'mouseleave', hideDebounced));
		}
		if (listeners.includes('focus')) {
			cleanups.push(on(activator, 'focusin', show));
			cleanups.push(on(activator, 'focusout', hideSoftFocus));
		}
		if (listeners.includes('click')) {
			cleanups.push(on(activator, 'click', toggle));
		}
		return () => {
			for (const cleanup of cleanups) cleanup();
		};
	}

	function attachPopoverListeners(node: HTMLElement): () => void {
		const cleanups: (() => void)[] = [];
		if (listeners.includes('hover')) {
			cleanups.push(on(node, 'mouseenter', onMouseEnter));
			cleanups.push(on(node, 'mouseleave', hideDebounced));
		}
		return () => {
			for (const cleanup of cleanups) cleanup();
		};
	}

	return {
		show,
		hide,
		toggle,
		content: {
			popover: mode,
			[createAttachmentKey()]: (node: HTMLElement) => {
				popover = node;
				popover.style.positionAnchor = anchorName;
				popover.style.positionArea = placements[placement];
				popover.style.inset = 'auto';
				popover.style.positionTry = 'flip-x, flip-y';
				popover.style.position = 'relative';
				return attachPopoverListeners(node);
			}
		},
		activator: {
			[createAttachmentKey()]: (node: HTMLElement) => {
				node.style.anchorName = anchorName;
				return attachActivatorListeners(node);
			}
		}
	};
}
