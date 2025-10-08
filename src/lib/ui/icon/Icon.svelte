<script lang="ts">
	import { tippy, type TippyProps, type TippyInstance } from '$lib/utils/tippy.js'
	import { onMount, type Snippet } from 'svelte'

	export let path: string | Snippet
	export let title = ''
	export let size = 22
	let klass = ''
	export { klass as class }
	export let style = ''
	export let classSVG = ''
	export let tippyProps: Partial<TippyProps> = {}
	export let disableTitlePropagation = false
	const viewWidth = 24
	const viewHeight = 24

	let icon: HTMLElement

	let tip: TippyInstance | null = null
	$: tip?.setContent(title)

	onMount(() => {
		if (!title) return
		const parent = icon.parentElement
		const isButton = parent?.tagName === 'BUTTON' || parent?.tagName === 'A'
		const target = parent && isButton && !disableTitlePropagation ? parent : icon
		tip = tippy(target || icon, {
			content: title,
			trigger: 'mouseenter',
			...tippyProps
		})
		return () => {
			tip?.destroy()
		}
	})
</script>

<i bind:this={icon} class="fill-base-content grid place-content-center {klass}" {style}>
	{#if typeof path === 'string'}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox={`0 0 ${viewWidth} ${viewHeight}`}
			style="display: inline-block;"
			class={classSVG}
		>
			<path d={path} />
		</svg>
	{:else}
		{@render path()}
	{/if}
</i>
