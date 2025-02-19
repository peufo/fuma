import { error } from '@sveltejs/kit'
import { formAction } from '$lib/server/formAction.js'
import { z } from '$lib/validation/zod.js'

import { modelPost, modelPostUpdate, modelTag } from '$lib/private/model.js'
import { prisma } from '$lib/private/prisma.js'
import { parseQuery } from '$lib/server/parseQuery.js'
import type { Prisma } from '@prisma/client'

export const load = async ({ url }) => {
	const query = parseQuery(url, {
		writingAt: z.filter.range,
		likeCount: z.filter.number
	})

	const where: Prisma.PostWhereInput = {}
	const orderBy: Prisma.PostOrderByWithRelationInput[] = []

	if (query.likeCount) {
		const { min, max, order } = query.likeCount
		where.likeCount = {}
		if (min !== undefined) where.likeCount.gte = min
		if (max !== undefined) where.likeCount.lte = max
		if (order) orderBy.push({ likeCount: order })
	}

	if (query.writingAt) {
		const { start, end, order } = query.writingAt
		where.writingAt = {}
		if (start) where.writingAt.gte = start
		if (end) where.writingAt.lte = end
		if (order) orderBy.push({ writingAt: order })
	}

	return {
		posts: await prisma.post.findMany({
			where,
			orderBy,
			include: { tags: true, author: { select: { id: true, username: true } } }
		})
	}
}

export const actions = {
	post_create: formAction(modelPost, async ({ data, locals: { user } }) => {
		if (!user) error(401)
		return prisma.post.create({ data: { ...data, author: { connect: { id: user.id } } } })
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
