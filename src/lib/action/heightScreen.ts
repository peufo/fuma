export function maxHeightScreen(node: HTMLElement, { padding = 16 }: { padding?: number } = {}) {
	function setMaxHeight() {
		node.style.maxHeight = `${window.innerHeight - node.offsetTop - padding}px`
	}
	setMaxHeight()
	window.addEventListener('resize', setMaxHeight)
	return {
		destroy() {
			window.removeEventListener('resize', setMaxHeight)
		}
	}
}
export function heightScreen(node: HTMLElement, { padding = 16 }: { padding?: number } = {}) {
	function setHeight() {
		node.style.height = `${window.innerHeight - node.offsetTop - padding}px`
	}
	setHeight()
	window.addEventListener('resize', setHeight)
	return {
		destroy() {
			window.removeEventListener('resize', setHeight)
		}
	}
}
