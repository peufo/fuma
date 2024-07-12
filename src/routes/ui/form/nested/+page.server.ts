import { formAction } from '$lib/server/formAction.js'
import { model } from './model.js'

export const actions = {
	default: formAction(model, async ({ data }) => {
		return data
	})
}
