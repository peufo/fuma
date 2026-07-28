import z from 'zod'
import { query } from '$app/server'
import { users } from '$lib/_doc/data.ts'

export const searchUsers = query(z.object({ search: z.string() }), ({ search }) => {
	const reg = new RegExp(search, 'ig')
	return users.filter((user) => user.name.match(reg))
})
