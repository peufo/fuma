import { createAttachmentKey } from 'svelte/attachments'
import { on } from 'svelte/events'
import { toast } from 'svelte-sonner'

export type UseCopyOptions = {
	value: string | (() => string) | (() => Promise<string>)
	successMessage?: string
	onSuccess?: () => void
}

export function useCopy({ value, onSuccess, successMessage = 'Copied' }: UseCopyOptions) {
	let isLoading = $state(false)
	async function loadValue(): Promise<string> {
		if (typeof value === 'string') return value
		return value()
	}
	async function onclick(event: MouseEvent) {
		event.preventDefault()
		if (isLoading) return
		isLoading = true
		const value = await loadValue().finally(() => (isLoading = false))

		navigator.clipboard
			.writeText(value)
			.then(() => {
				toast.success(successMessage)
				onSuccess?.()
			})
			.catch((error) => {
				toast.error(error)
			})
	}

	return {
		get isLoading() {
			return isLoading
		},
		get disabled() {
			return isLoading
		},
		[createAttachmentKey()]: (node: HTMLElement) => on(node, 'click', onclick)
	}
}
