<script lang="ts">
	import { onMount, type Snippet } from 'svelte'
	import { XIcon } from '@lucide/svelte'
	import { activeElement } from 'runed'

	let {
		dialog = $bindable(),
		hideCloseButton = false,
		class: klass = '',
		onOpen,
		onClose,
		activator,
		header,
		footer,
		children
	}: {
		dialog?: HTMLDialogElement
		hideCloseButton?: boolean
		class?: string
		onOpen?: () => void
		onClose?: () => void
		activator?: Snippet<[{ showModal: () => void }]>
		header?: Snippet
		footer?: Snippet
		children: Snippet
	} = $props()

	onMount(() => {
		if (!dialog) return
		const inputsSelector = 'input:not([type=hidden], [tabindex="-1"])'
		const inputs = dialog.querySelectorAll<HTMLInputElement>(inputsSelector)
		const buttons = dialog.querySelectorAll<HTMLButtonElement>('button')

		inputs.forEach((input) => (input.tabIndex = -1))
		buttons.forEach((button) => (button.tabIndex = -1))

		function onDialogOpen() {
			onOpen?.()
			inputs.forEach((input) => (input.tabIndex = 0))
			buttons.forEach((button) => (button.tabIndex = 0))
			if (!inputs[0]) return
			inputs[0].focus()
			inputs[0].select()
		}

		function onDialogClose() {
			onClose?.()
			inputs.forEach((input) => (input.tabIndex = -1))
			buttons.forEach((button) => (button.tabIndex = -1))
		}

		const observer = new MutationObserver(() => (dialog?.open ? onDialogOpen() : onDialogClose()))
		observer.observe(dialog, { attributeFilter: ['open'] })
		return () => observer.disconnect()
	})
</script>

{@render activator?.({ showModal: () => dialog?.showModal() })}

<dialog bind:this={dialog} class="modal" tabindex="-1">
	<div class="modal-box bordered flex flex-col rounded-lg border p-0">
		<div class="relative flex items-center border-b p-4">
			<div class="grow">
				{@render header?.()}
			</div>

			{#if !hideCloseButton}
				<button
					type="button"
					class="ml btn btn-square btn-ghost btn-sm"
					onclick={() => dialog?.close()}
				>
					<XIcon />
				</button>
			{/if}
		</div>
		<div class="grow overflow-auto p-4 {klass}">
			{@render children()}
		</div>

		{@render footer?.()}
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
