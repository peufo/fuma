import { formAction } from '$lib/server/formAction.js'
import { shapeUser, type User } from './shape.js'

const dataUser: User = {
	name: 'Jonas',
	age: 31,
	friends: [
		{name: 'Bibi', age: 28}
	]
}

export const load = async () => {
	return {
		formDataUser: dataUser
	}
}

export const actions = {
	default: formAction(shapeUser, async ({ data }) => {
		Object.assign(dataUser, data)
		return dataUser
	})
}
