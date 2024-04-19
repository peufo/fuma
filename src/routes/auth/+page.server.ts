import {  fail, redirect } from '@sveltejs/kit'
import zod from 'zod'
import { Argon2id } from 'oslo/password'
import type { User } from '@prisma/client'

import { parseFormData, tryOrFail } from '$lib/server/index.js'
import { lucia } from '$lib/server/auth.js'
import { prisma } from '$lib/server/prisma.js'
import type { RequestEvent } from './$types.ts'

export const load = async ({ locals }) => {
	if (locals.session) return redirect(302, '/')
}

export const actions = {
	register: async (event) => {
		const { err, data } = await parseFormData(event.request, {
			email: zod.string().toLowerCase().email(),
			username: zod.string().min(3),
			password: zod.string().min(8)
		})
		if (err) return err

		data.password = await new Argon2id().hash(data.password)

		return tryOrFail(async () => {
			const user = await prisma.user.create({ data })
			await createSession(user, event)
		}, '/')
	},
	login: async (event) => {
		const { err, data } = await parseFormData(event.request, {
			username: zod.string(),
			password: zod.string()
		})

		if (err) return err

		return tryOrFail(async () => {
			const user = await prisma.user.findFirst({
				where: {
					OR: [{ email: data.username }, { username: data.username }]
				}
			})
			if (!user) throw new Error('Incorrect username or password')
			if (!user.password) throw new Error('Login with password is not enable')

			const validPassword = await new Argon2id().verify(user.password, data.password)
			if (!validPassword) throw Error('Incorrect username or password')

			await createSession(user, event)
		}, '/')
	},
	logout: async ({ locals: { session }, cookies }) => {
		if (!session) return fail(401)
		await lucia.invalidateSession(session.id)
		const sessionCookie = lucia.createBlankSessionCookie()
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		})
		redirect(302, '/auth')
	}
}

async function createSession(user: User, event: RequestEvent) {
	const session = await lucia.createSession(user.id, {})
	const sessionCookie = lucia.createSessionCookie(session.id)
	event.cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	})
}
