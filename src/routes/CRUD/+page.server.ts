import { error } from '@sveltejs/kit'
import { formAction } from '$lib/server/formAction.js'
import { z } from '$lib/validation/zod.js'

import { modelPost, modelPostUpdate, modelTag } from '$lib/private/model.js'
import { prisma } from '$lib/private/prisma.js'

export const load = async () => {
	return {
		posts: await prisma.post.findMany({
			include: { tags: true, author: { select: { id: true, username: true } } }
		})
	}
}

export const actions = {
	post_create: formAction(modelPost, async ({ data, locals: { user } }) => {
		if (!user) error(401)
		return prisma.post.create({ data: { ...data, authorId: user.id } })
	}),
	post_update: formAction(modelPostUpdate, async ({ data, locals }) => {
		if (!locals.user) error(401)
		return prisma.post.update({ where: { id: data.id }, data })
	}),
	post_delete: formAction({ id: z.string() }, async ({ data, locals }) => {
		if (!locals.user) error(401)
		return prisma.post.delete({ where: data })
	}),
	tag_create: formAction(modelTag, async ({ data }) => prisma.tag.create({ data }))
}
