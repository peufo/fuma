export function maxHeightScreen(node: HTMLElement, { padding = 16 }: { padding?: number } = {}) {
	node.style.maxHeight = `${window.innerHeight - node.offsetTop - padding}px`
}
