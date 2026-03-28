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
	let list: HTMLElement | undefined;
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
			scrollToFocus(items);
			return;
		}
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			focusIndex++;
			if (focusIndex > items.length - 1) focusIndex = 0;
			onFocus?.(focusIndex);
			scrollToFocus(items);
			return;
		}
	}

	function scrollToFocus(items: HTMLElement[]) {
		if (!(list instanceof HTMLElement)) {
			const err = 'The list container need to be defined like this: <ul {...command.list}>...</ul>';
			console.error(err);
			return;
		}
		const item = items.at(focusIndex);
		if (!item) return;
		const top = item.offsetTop - 4;
		if (top < list.scrollTop) {
			list.scrollTo({ top });
			return;
		}
		const bottom = item.offsetTop + item.offsetHeight;
		const delta = bottom - (list.scrollTop + list.offsetHeight) + 10;
		if (delta > 0) {
			list.scrollTo({ top: list.scrollTop + delta });
			return;
		}
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
		list: {
			[createAttachmentKey()]: (node: HTMLElement) => {
				list = node;
				return () => {
					list = undefined;
				};
			}
		},
		item: (index: number) => ({
			[createAttachmentKey()]: (node: HTMLElement) => {
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
