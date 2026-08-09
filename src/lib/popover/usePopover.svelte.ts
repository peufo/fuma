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
	listenFocusout?: boolean
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
	listenFocusout = false,
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
	let isOpen = $state(false)

	const hideDebounced = debounce(hide, hideDelay)
	let isHiding = false
	function show() {
		// En refermant, le navigateur rend le focus au déclencheur si le focus était dans le
		// popover — un bouton « Ok » ou « Effacer », typiquement. Sans ce garde, le `focusin`
		// qui s'ensuit rouvre aussitôt ce qu'on vient de fermer, et `hide()` ne fait rien.
		if (isHiding) return
		content?.showPopover()
		onShow?.()
	}
	function hide() {
		isHiding = true
		content?.hidePopover()
		isHiding = false
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
		// Le focus ne va nulle part — `null`, ou `body` selon le navigateur: typiquement un
		// `mousedown` sur un élément non focusable, un jour du calendrier par exemple. Fermer ici
		// escamoterait la cible avant que le `click` ne l'atteigne; hors du popover, le
		// light-dismiss natif s'en charge de toute façon.
		if (!(relatedTarget instanceof Node) || relatedTarget === document.body) return
		if (!content?.contains(relatedTarget) && relatedTarget !== activator) return hide()
	}

	function attachTriggerListeners(node: HTMLElement): () => void {
		const cleanups: (() => void)[] = []
		if (listenClick) {
			cleanups.push(on(node, 'click', show))
		}
		if (listenFocus) {
			cleanups.push(on(node, 'focusin', show))
		}
		if (listenFocus || listenFocusout) {
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
		if (listenFocus || listenFocusout) {
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
				// `fixed` et non `relative`: dans le top layer `relative` est absolutisé, le bloc
				// conteneur devient alors le document et Chrome compense le défilement de page même
				// quand l'ancre vit dans un sous-arbre `position: fixed` (tiroir, en-tête collant) qui,
				// lui, ne défile pas — le popover dérivait d'exactement `window.scrollY`. `fixed` cale
				// le bloc conteneur sur le viewport, ce qui rend aussi `position-try` viewport-relatif.
				node.style.position = 'fixed'
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
