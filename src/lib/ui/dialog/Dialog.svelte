<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte'
	import { mdiClose } from '@mdi/js'
	import { Icon } from '$lib/ui/icon/index.js'
	import { contextContainer } from '../context.js'

	export let dialog: HTMLDialogElement
	export let hideCloseButton = false
	let klass = ''
	export { klass as class }

	const dispatch = createEventDispatcher<{ open: void; close: void }>()
	contextContainer.set('dialog')

	onMount(() => {
		const inputsSelector = 'input:not([type=hidden], [tabindex="-1"])'
		const inputs = dialog.querySelectorAll<HTMLInputElement>(inputsSelector)
		const buttons = dialog.querySelectorAll<HTMLButtonElement>('button')

		inputs.forEach((input) => (input.tabIndex = -1))
		buttons.forEach((button) => (button.tabIndex = -1))

		function onDialogOpen() {
			dispatch('open')
			inputs.forEach((input) => (input.tabIndex = 0))
			buttons.forEach((button) => (button.tabIndex = 0))
			if (!inputs[0]) return
			inputs[0].focus()
			inputs[0].select()
		}

		function onDialogClose() {
			dispatch('close')
			inputs.forEach((input) => (input.tabIndex = -1))
			buttons.forEach((button) => (button.tabIndex = -1))
		}

		const observer = new MutationObserver(() => (dialog.open ? onDialogOpen() : onDialogClose()))
		observer.observe(dialog, { attributeFilter: ['open'] })
		return () => observer.disconnect()
	})
</script>

<dialog bind:this={dialog} class="modal" tabindex="-1">
	<div class="modal-box bordered flex flex-col rounded-lg border p-0">
		<div class="relative flex items-center border-b p-4">
			<div class="grow">
				<slot name="header" />
			</div>

			{#if !hideCloseButton}
				<button
					type="button"
					class="ml btn btn-square btn-ghost btn-sm"
					on:click={() => dialog.close()}
				>
					<Icon path={mdiClose} />
				</button>
			{/if}
		</div>
		<div class="grow overflow-auto p-4 {klass}">
			<slot />
		</div>

		<slot name="footer" />
	</div>
</dialog>
