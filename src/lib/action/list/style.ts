export function useDragStyle(itemElement: HTMLElement) {
	const { zIndex, top, width, height, position, marginTop, translate } =
		getComputedStyle(itemElement)

	return {
		init() {
			itemElement.style.zIndex = `${safeParseInt(zIndex) + 1}`
			itemElement.style.top = `${itemElement.offsetTop - safeParseFloat(marginTop)}px`
			itemElement.style.width = `${itemElement.offsetWidth}px`
			itemElement.style.height = `${itemElement.offsetHeight}px`
			itemElement.style.position = 'absolute'
		},
		move(deltaY: number) {
			itemElement.style.translate = `0px ${deltaY}px`
		},
		reset() {
			itemElement.style.position = position
			itemElement.style.zIndex = zIndex
			itemElement.style.translate = translate
			itemElement.style.top = top
			itemElement.style.width = width
			itemElement.style.height = height
		}
	}
}

function safeParseInt(value: string): number {
	const parsedValue = parseInt(value)
	return isNaN(parsedValue) ? 0 : parsedValue
}

function safeParseFloat(value: string): number {
	const parsedValue = parseFloat(value)
	return isNaN(parsedValue) ? 0 : parsedValue
}
