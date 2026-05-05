import type { RemoteForm, RemoteFormInput } from '@sveltejs/kit'
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

type UseEnhanceCallbackOptions<Input extends RemoteFormInput | void> = {
	onSuccess?: (data: Input, form: HTMLFormElement) => void
	onError?: (err: unknown) => void
}
type EnhanceCallback<Input extends RemoteFormInput | void> = Parameters<
	RemoteForm<Input, unknown>['enhance']
>[0]

export function useEnhanceCallback<Input extends RemoteFormInput | void>({
	onSuccess,
	onError
}: UseEnhanceCallbackOptions<Input>): EnhanceCallback<Input> {
	return ({ submit, data, form }) => {
		submit()
			.then(() => {
				onSuccess?.(data, form)
			})
			.catch((err) => {
				console.error(err)
				onError?.(err)
			})
	}
}
