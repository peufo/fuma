<script lang="ts" context="module">
	export type Crop = { width: number; height: number; x: number; y: number }
</script>

<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte'
	import Cropper from 'svelte-easy-crop'
	import { mdiTrayArrowUp } from '@mdi/js'

	import type { TippyInstance } from '$lib/utils/tippy.js'
	import { Icon } from '$lib/ui/icon/index.js'
	import { DropDown } from '$lib/ui/menu/index.js'
	import { Dialog } from '$lib/ui/dialog/index.js'

	export let aspect = 1
	export let title = 'Image'
	export let formaction: string | undefined = undefined
	export let key = ''
	let dialog: HTMLDialogElement
	let tip: TippyInstance
	let image = ''
	let crop: Crop | undefined = undefined
	let inputFile: HTMLInputElement

	const dispatch = createEventDispatcher<{ submit: { crop: Crop; image: string } }>()

	function onFileSelected() {
		if (!inputFile.files) return
		const file = inputFile.files[0]
		const reader = new FileReader()
		reader.onload = ({ target }) => {
			image = (target?.result || '') as string
			dialog?.showModal()
		}
		reader.readAsDataURL(file)
	}

	export function close() {
		tip?.hide()
		dialog?.close()
	}

	onMount(() => {
		if (!$$slots.actions) tip.disable()
	})
	function handleClickActivator() {
		if (!$$slots.actions) inputFile.click()
	}

	function handleValidation() {
		close()
		if (crop && image) dispatch('submit', { crop, image })
	}
</script>

<DropDown tippyProps={{ arrow: true }} hideOnBlur bind:tip>
	<button
		slot="activator"
		type="button"
		class="block overflow-hidden rounded-lg transition-shadow hover:shadow-lg"
		on:click={handleClickActivator}
	>
		<slot>image</slot>
	</button>
	{#if $$slots.actions}
		<div class="flex flex-col">
			<button
				type="button"
				class="menu-item relative"
				on:click={() => {
					inputFile.click()
				}}
			>
				<Icon path={mdiTrayArrowUp} class="opacity-70" size={20} />
				<span>Charger une image</span>
			</button>
			<slot name="actions" />
		</div>
	{/if}
</DropDown>

<Dialog bind:dialog>
	<h2 slot="header" class="card-title">
		{title}
	</h2>

	<div class="relative aspect-square overflow-hidden rounded-lg">
		<Cropper
			{image}
			{aspect}
			showGrid={false}
			zoomSpeed={0.2}
			on:cropcomplete={(e) => (crop = e.detail.pixels)}
		/>
	</div>
	<div class="mt-2 flex justify-end">
		<input type="hidden" name="{key ? `${key}_` : ''}crop" value={JSON.stringify(crop)} />
		<input
			class="hidden"
			type="file"
			name="{key ? `${key}_` : ''}image"
			accept="image/jpeg, image/png, image/webp, image/gif, image/avif, image/tiff"
			bind:this={inputFile}
			on:change={onFileSelected}
		/>

		<button
			{formaction}
			type={formaction ? 'submit' : 'button'}
			class="btn btn-primary"
			on:click={handleValidation}
		>
			Valider
		</button>
	</div>
</Dialog>
