import debounce from 'debounce'
import { untrack } from 'svelte'
import { createAttachmentKey } from 'svelte/attachments'
import { on } from 'svelte/events'

type Alignement = 'start' | 'end'
type Position = 'left' | 'right' | 'top' | 'bottom'
export type Placement = Position | `${Position}-${Alignement}`
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
}

export type PopoverType = ReturnType<typeof usePopover>
export type PopoverOptions = {
	mode?: 'auto' | 'hint' | 'manual'
	placement?: Placement
	listenClick?: boolean
	listenFocus?: boolean
	listenHover?: boolean
	/** Only when listenHover={true} */
	hideDelay?: number
	onShow?: () => void
	onHide?: () => void
	hotKey?: string
}

let popoverInstanceCount = 0

export function usePopover({
	mode = 'auto',
	placement = 'bottom-start',
	listenClick = true,
	listenFocus = true,
	listenHover = false,
	hideDelay = 400,
	onShow,
	onHide,
	hotKey
}: PopoverOptions = {}) {
	const uid = popoverInstanceCount++
	const anchorName = `--anchor-${uid}`
	let content = $state<HTMLElement>()
	let activator = $state<HTMLElement>()
	let isOpen = $state(!!content?.matches(':popover-open'))

	const hideDebounced = debounce(hide, hideDelay)
	function show() {
		content?.showPopover()
		onShow?.()
	}
	function hide() {
		content?.hidePopover()
		onHide?.()
	}
	function onMouseEnter() {
		hideDebounced.clear()
		show()
	}
	function onToggle(event: ToggleEvent) {
		isOpen = event.newState === 'open'
	}
	function onFocusOut({ relatedTarget }: FocusEvent | MouseEvent) {
		if (!(relatedTarget instanceof Node)) return hide()
		if (!content?.contains(relatedTarget) && relatedTarget !== activator) return hide()
	}

	function attachTriggerListeners(node: HTMLElement): () => void {
		const cleanups: (() => void)[] = []
		if (listenClick) {
			cleanups.push(on(node, 'click', show))
		}
		if (listenFocus) {
			cleanups.push(on(node, 'focusin', show))
			cleanups.push(on(node, 'focusout', onFocusOut))
		}
		if (listenHover) {
			cleanups.push(on(node, 'mouseenter', onMouseEnter))
			cleanups.push(on(node, 'mouseleave', hideDebounced))
		}
		if (hotKey) {
			cleanups.push(on(window, 'keydown', handleHotKey))
		}

		return () => {
			for (const cleanup of cleanups) cleanup()
		}
	}
	function attachPopoverListeners(node: HTMLElement): () => void {
		const cleanups: (() => void)[] = []
		cleanups.push(on(node, 'toggle', onToggle))
		if (listenHover) {
			cleanups.push(on(node, 'mouseenter', onMouseEnter))
			cleanups.push(on(node, 'mouseleave', hideDebounced))
		}
		if (listenFocus) {
			cleanups.push(on(node, 'focusout', onFocusOut))
		}
		return () => {
			for (const cleanup of cleanups) cleanup()
		}
	}
	async function handleHotKey(event: KeyboardEvent) {
		const { metaKey, ctrlKey, key } = event
		if ((metaKey || ctrlKey) && key === hotKey) {
			event.preventDefault()
			show()
			return
		}
	}
	return {
		show,
		hide,
		get isOpen() {
			return isOpen
		},
		content: {
			popover: mode,
			[createAttachmentKey()]: (node: HTMLElement) => {
				untrack(() => (content = node))
				node.style.positionAnchor = anchorName
				node.style.positionArea = placements[placement]
				node.style.inset = 'auto'
				node.style.positionTry = 'flip-x, flip-y'
				node.style.position = 'relative'
				const cleanup = attachPopoverListeners(node)
				return () => {
					untrack(() => (content = undefined))
					cleanup()
				}
			}
		},
		trigger: {
			[createAttachmentKey()]: (node: HTMLElement) => {
				untrack(() => (activator = node))
				node.style.anchorName = anchorName
				const cleanup = attachTriggerListeners(node)
				return () => {
					untrack(() => (activator = undefined))
					cleanup()
				}
			}
		}
	}
}
