export const CLASSNAME_PLACEHOLDER = 'item-placholder'

export interface CreatePlaceholderArgs {
	listElement: HTMLElement
	itemElement: HTMLElement
	indexFrom: number
}
export function createPlaceholder({ listElement, itemElement, indexFrom }: CreatePlaceholderArgs) {
	const itemsEl = [...listElement.children]
	const placeholderEl = document.createElement('div')
	const style = getComputedStyle(itemElement)
	placeholderEl.classList.add(CLASSNAME_PLACEHOLDER)
	placeholderEl.style.height = `${itemElement.offsetHeight}px`
	placeholderEl.style.width = style.width
	placeholderEl.style.margin = style.margin
	placeholderEl.style.borderRadius = style.borderRadius
	placeholderEl.style.background = style.background
	placeholderEl.style.opacity = '0.5'
	console.log(placeholderEl)
	placeholderEl.style.flexShrink = '0'
	listElement.insertBefore(placeholderEl, itemElement)
	const moveTo = (index: number) => {
		const selectorIndex = index < indexFrom ? index : index + 1
		const itemEl = itemsEl[selectorIndex]
		listElement.insertBefore(placeholderEl, itemEl)
	}
	return {
		moveTo,
		remove() {
			const parent = placeholderEl.parentNode
			parent?.removeChild(placeholderEl)
			placeholderEl.remove()
		}
	}
}
