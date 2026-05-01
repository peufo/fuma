import { randomBytes } from 'node:crypto'
import z from 'zod'
import { form, query } from '$app/server'
import { schemaUser, users } from '$lib/_doc/data.ts'

export const getUser = query(z.object({ age: z.number() }), async ({ age }) => {
	return {
		name: 'Jonas',
		age
	}
})

export const searchUsers = query(z.object({ search: z.string() }), ({ search }) => {
	const reg = new RegExp(search, 'ig')
	return users.filter((user) => user.name.match(reg) || user.cv.match(reg))
})

export const formCreateUser = form(schemaUser, async (data) => {
	users.push({
		id: randomBytes(16).toString('hex'),
		...data
	})
	return data
})
