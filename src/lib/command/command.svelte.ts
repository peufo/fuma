import { createAttachmentKey } from 'svelte/attachments'
import { on } from 'svelte/events'

type CommandOptions = {
	isEnable?: () => boolean
	onSelect?: (index: number) => unknown
	onFocus?: (index: number) => unknown
	hotKey?: string
}

export function useCommand({
	onSelect,
	onFocus,
	isEnable = () => true,
	hotKey
}: CommandOptions = {}) {
	let focusIndex = $state(0)
	let selectedIndex = $state(-1)
	let triggerElement = $state<HTMLElement>()
	const items: HTMLElement[] = []

	function onKeydown(event: KeyboardEvent) {
		if (!isEnable()) return
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault()
			onSelect?.(focusIndex)
			selectedIndex = focusIndex
			return
		}
		if (event.key === 'ArrowUp') {
			event.preventDefault()
			focusIndex--
			if (focusIndex < 0) focusIndex = items.length - 1
			onFocus?.(focusIndex)
			scrollFocusIntoView()
			return
		}
		if (event.key === 'ArrowDown') {
			event.preventDefault()
			focusIndex++
			if (focusIndex > items.length - 1) focusIndex = 0
			onFocus?.(focusIndex)
			scrollFocusIntoView()
			return
		}
	}

	function scrollFocusIntoView() {
		items.at(focusIndex)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
	}

	async function handleHotKey(event: KeyboardEvent) {
		const { metaKey, ctrlKey, key } = event
		if ((metaKey || ctrlKey) && key === hotKey) {
			event.preventDefault()
			focusTrigger()
			return
		}
	}

	function focusTrigger() {
		if (
			triggerElement instanceof HTMLInputElement ||
			triggerElement instanceof HTMLTextAreaElement
		) {
			triggerElement.select()
		}
	}

	return {
		get focusIndex() {
			return focusIndex
		},
		get selectedIndex() {
			return selectedIndex
		},
		set selectedIndex(index: number) {
			selectedIndex = index
		},
		trigger: {
			[createAttachmentKey()]: (node: HTMLElement) => {
				triggerElement = node
				const cleanups: (() => void)[] = []
				cleanups.push(on(node, 'keydown', onKeydown))
				if (hotKey) cleanups.push(on(window, 'keydown', handleHotKey))
				return () => {
					for (const cleanup of cleanups) cleanup()
				}
			}
		},
		focusTrigger,
		item: (index: number, scrollMargin = '8px') => ({
			[createAttachmentKey()]: (node: HTMLElement) => {
				node.style.scrollMargin = scrollMargin
				if (!items.includes(node)) items.splice(index, 0, node)
				const cleanup = on(node, 'click', () => {
					focusIndex = selectedIndex = items.indexOf(node)
					onSelect?.(selectedIndex)
				})
				return () => {
					cleanup()
					const i = items.indexOf(node)
					if (i !== -1) items.splice(i, 1)
				}
			}
		})
	}
}
