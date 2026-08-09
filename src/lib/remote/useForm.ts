import type { RemoteForm, RemoteFormEnhanceCallback, RemoteFormInput } from '@sveltejs/kit'
import debounce from 'debounce'
import type { StandardSchemaV1 } from 'runed/kit'
import { type Attachment, createAttachmentKey } from 'svelte/attachments'
import { on } from 'svelte/events'

/**
 * Enable preflight and run validation on input
 * @deprecated
 */
export function useForm<Input extends RemoteFormInput | undefined, Output>(
	remoteForm: RemoteForm<Input, Output>,
	schema: StandardSchemaV1<Input>,
	debounceMs = 1000
) {
	const validation = validationOnInput(remoteForm, debounceMs)
	Object.assign(remoteForm, { [createAttachmentKey()]: validation })
	return remoteForm.preflight(schema)
}

export function validationOnInput<Input extends RemoteFormInput | undefined, Output>(
	remoteForm: RemoteForm<Input, Output>,
	debounceMs = 1000
) {
	const validation: Attachment<HTMLFormElement> = (formElement) => {
		const debouncedValidate = debounce(() => remoteForm.validate(), debounceMs)
		return on(formElement, 'input', ({ target }) => {
			if (target instanceof HTMLInputElement || target instanceof HTMLSelectElement) {
				const instantValidation =
					target.ariaInvalid === 'true' ||
					target.type === 'checkbox' ||
					target.type === 'radio' ||
					target.tagName === 'SELECT'
				if (instantValidation) remoteForm.validate()
				else debouncedValidate()
			}
		})
	}
	return validation
}

type UseEnhanceCallbackOptions<Output> = {
	onSuccess?: (result: Output | undefined, element: HTMLFormElement) => void
	onError?: (err: unknown) => void
}

export function useEnhanceCallback<Input extends RemoteFormInput | void, Output>({
	onSuccess,
	onError
}: UseEnhanceCallbackOptions<Output>): RemoteFormEnhanceCallback<Input, Output> {
	// L'instance passée au callback ne porte plus `data` ni `form`: la donnée soumise n'est plus
	// exposée telle quelle, et l'élément s'appelle désormais `element`.
	return (form) => {
		form
			.submit()
			.then((succeeded) => {
				// `submit()` résout `false` quand le préflight ou la validation serveur a échoué.
				if (succeeded) onSuccess?.(form.result, form.element)
			})
			.catch((err) => {
				console.error(err)
				onError?.(err)
			})
	}
}
