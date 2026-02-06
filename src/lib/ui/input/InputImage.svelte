<script lang="ts">
	import { type Snippet } from 'svelte'
	import Cropper, { type CropArea } from 'svelte-easy-crop'
	import { Dialog } from '$lib/ui/dialog/index.js'

	let {
		key = '',
		aspect = 1,
		title = 'Image',
		formaction,
		onSubmit,
		children
	}: {
		key?: string
		aspect?: number
		title?: string
		formaction?: string
		onSubmit?: (value: { crop: CropArea; image: string }) => void
		children: Snippet<[{ show: () => void; close: () => void }]>
	} = $props()

	let dialog = $state<HTMLDialogElement>()
	let image = $state('')
	let crop = $state<CropArea>()
	let inputFile = $state<HTMLInputElement>()

	export function show() {
		inputFile?.click()
	}

	export function close() {
		dialog?.close()
	}

	function onFileChange() {
		if (!inputFile?.files) return
		const file = inputFile.files[0]
		const reader = new FileReader()
		reader.onload = ({ target }) => {
			image = (target?.result || '') as string
			dialog?.showModal()
		}
		reader.readAsDataURL(file)
	}

	function handleValidation() {
		close()
		if (crop && image) onSubmit?.({ crop, image })
	}
</script>

{@render children({ show, close })}

<input
	class="hidden"
	type="file"
	name="{key ? `${key}_` : ''}image"
	accept="image/jpeg, image/png, image/webp, image/gif, image/avif, image/tiff"
	bind:this={inputFile}
	onchange={onFileChange}
/>

<Dialog bind:dialog>
	{#snippet header()}
		<h2 class="card-title">
			{title}
		</h2>
	{/snippet}

	<div class="relative aspect-square overflow-hidden rounded-lg">
		<Cropper
			{image}
			{aspect}
			showGrid={false}
			zoomSpeed={0.2}
			oncropcomplete={(value) => (crop = value.pixels)}
		/>
	</div>
	<div class="mt-2 flex justify-end">
		<input type="hidden" name="{key ? `${key}_` : ''}crop" value={JSON.stringify(crop)} />

		<button
			{formaction}
			type={formaction ? 'submit' : 'button'}
			class="btn btn-primary"
			onclick={handleValidation}
		>
			Valider
		</button>
	</div>
</Dialog>
