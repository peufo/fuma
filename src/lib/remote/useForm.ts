import type { RemoteForm, RemoteFormInput } from '@sveltejs/kit'
import debounce from 'debounce'
import type { StandardSchemaV1 } from 'runed/kit'
import { type Attachment, createAttachmentKey } from 'svelte/attachments'
import { on } from 'svelte/events'

/**
 * Enable preflight and run validation on input
 */
export function useForm<Input extends RemoteFormInput | undefined, Output>(
	remoteForm: RemoteForm<Input, Output>,
	schema: StandardSchemaV1<Input>,
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
				instantValidation ? remoteForm.validate() : debouncedValidate()
			}
		})
	}
	Object.assign(remoteForm, { [createAttachmentKey()]: validation })
	return remoteForm.preflight(schema)
}
