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
	'right-start': 'right span-bottom',
};

export type PopoverType = ReturnType<typeof usePopover>;
export type PopoverOptions = {
	mode?: 'auto' | 'hint' | 'manual';
	placement?: Placement;
	listenClick?: boolean;
	listenFocus?: boolean;
	listenHover?: boolean;
	/** Only when listenHover={true} */
	hideDelay?: number;
};

let popoverInstanceCount = 0;

export function usePopover({
	mode = 'auto',
	placement = 'bottom-start',
	listenClick = true,
	listenFocus = true,
	listenHover = false,
	hideDelay = 400,
}: PopoverOptions = {}) {
	const uid = popoverInstanceCount++;
	const anchorName = `--anchor-${uid}`;
	let popover = $state<HTMLElement>();
	let isOpen = $state(!!popover?.matches(':popover-open'));

	const hideDebounced = debounce(hide, hideDelay);
	function show() {
		popover?.showPopover();
	}
	function hide() {
		popover?.hidePopover();
	}
	function onMouseEnter() {
		hideDebounced.clear();
		show();
	}
	function onToggle(event: ToggleEvent) {
		isOpen = event.newState === 'open';
	}
	function attachTriggerListeners(activator: HTMLElement): () => void {
		const cleanups: (() => void)[] = [];
		if (listenClick) {
			cleanups.push(on(activator, 'click', show));
		}
		if (listenFocus) {
			cleanups.push(on(activator, 'focusin', show));
			// TODO: handle focusout ???
		}
		if (listenHover) {
			cleanups.push(on(activator, 'mouseenter', onMouseEnter));
			cleanups.push(on(activator, 'mouseleave', hideDebounced));
		}
		return () => {
			for (const cleanup of cleanups) cleanup();
		};
	}

	function attachPopoverListeners(node: HTMLElement): () => void {
		const cleanups: (() => void)[] = [];
		cleanups.push(on(node, 'toggle', onToggle));

		if (listenHover) {
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
		get isOpen() {
			return isOpen;
		},
		content: {
			popover: mode,
			[createAttachmentKey()]: (node: HTMLElement) => {
				popover = node;
				// biome-ignore lint/suspicious/noTsIgnore: await for a svelte-check update
				// @ts-ignore
				popover.style.positionAnchor = anchorName;
				// biome-ignore lint/suspicious/noTsIgnore: await for a svelte-check update
				// @ts-ignore
				popover.style.positionArea = placements[placement];
				popover.style.inset = 'auto';
				// biome-ignore lint/suspicious/noTsIgnore: await for a svelte-check update
				// @ts-ignore
				popover.style.positionTry = 'flip-x, flip-y';
				popover.style.position = 'relative';
				return attachPopoverListeners(node);
			},
		},
		trigger: {
			[createAttachmentKey()]: (node: HTMLElement) => {
				// biome-ignore lint/suspicious/noTsIgnore: await for a svelte-check update
				// @ts-ignore
				node.style.anchorName = anchorName;
				return attachTriggerListeners(node);
			},
		},
	};
}
