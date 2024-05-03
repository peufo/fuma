<script lang="ts">
	import { InputImage, type Crop } from './index.js'
	import { PlaceholderImage } from '$lib/ui/placeholder/index.js'

	export let key = ''
	export let src = ''
	export let alt = ''
	let klass = ''
	export { klass as class }
	export let title = 'Image'
	export let x: number
	export let y: number
	export let aspect = x / y

	let crop: Crop | null = null
	let image = ''
	let scale = 0
	let preview: HTMLImageElement

	async function handleSubmit(detail: { crop: Crop; image: string }) {
		crop = detail.crop
		image = detail.image
		scale = x / crop.width
	}
</script>

<InputImage {key} {title} {aspect} on:submit={({ detail }) => handleSubmit(detail)}>
	{#if crop && image}
		<div
			class="relative overflow-hidden rounded-lg border"
			style:width="{x}px"
			style:height="{y}px"
		>
			<img
				src={image}
				alt="preview"
				bind:this={preview}
				class="absolute max-w-none"
				style:margin="-{scale * crop.y}px 0 0 -{scale * crop.x}px"
				style:width="{scale * preview?.naturalWidth}px"
				style:height="{scale * preview?.naturalHeight}px"
			/>
		</div>
	{:else if src}
		<div class="group relative">
			<span
				class="
				absolute inset-[1px] grid
				place-content-center rounded-lg bg-base-300/30
				font-medium opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100
			"
			>
				{title}
			</span>
			<img class="{klass} rounded-lg border" {src} {alt} width={x} height={y} />
		</div>
	{:else}
		<PlaceholderImage {x} {y}>{title}</PlaceholderImage>
	{/if}
</InputImage>
