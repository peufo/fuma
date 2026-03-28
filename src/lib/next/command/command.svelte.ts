import { createAttachmentKey } from 'svelte/attachments';
import { on } from 'svelte/events';

type CommandOptions = {
	isEnable?: () => boolean;
	onSelect?: (index: number) => unknown;
	onFocus?: (index: number) => unknown;
};

export function useCommand({ onSelect, onFocus, isEnable = () => true }: CommandOptions = {}) {
	let focusIndex = $state(0);
	let selectedIndex = $state(-1);
	const items: HTMLElement[] = [];

	function onKeydown(event: KeyboardEvent) {
		if (!isEnable()) return;
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			onSelect?.(focusIndex);
			selectedIndex = focusIndex;
			return;
		}
		if (event.key === 'ArrowUp') {
			event.preventDefault();
			focusIndex--;
			if (focusIndex < 0) focusIndex = items.length - 1;
			onFocus?.(focusIndex);
			scrollFocusIntoView();
			return;
		}
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			focusIndex++;
			if (focusIndex > items.length - 1) focusIndex = 0;
			onFocus?.(focusIndex);
			scrollFocusIntoView();
			return;
		}
	}

	function scrollFocusIntoView() {
		items.at(focusIndex)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
	}

	return {
		get focusIndex() {
			return focusIndex;
		},
		get selectedIndex() {
			return selectedIndex;
		},
		trigger: {
			[createAttachmentKey()]: (node: HTMLElement) => {
				return on(node, 'keydown', onKeydown);
			}
		},
		item: (index: number) => ({
			[createAttachmentKey()]: (node: HTMLElement) => {
				node.style.scrollMargin = '8px';
				if (!items.includes(node)) items.splice(index, 0, node);
				const cleanup = on(node, 'click', () => {
					focusIndex = selectedIndex = items.indexOf(node);
					onSelect?.(selectedIndex);
				});
				return () => {
					cleanup();
					const i = items.indexOf(node);
					if (i !== -1) items.splice(i, 1);
				};
			}
		})
	};
}
