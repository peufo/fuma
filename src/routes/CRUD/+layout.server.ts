import { prisma } from '$lib/private/prisma.js'
import { parseQuery } from '$lib/server/parseQuery.js'
import { z } from '$lib/validation/zod.js'

export const load = async ({ url }) => {
	const { form_post } = parseQuery(url, { form_post: z.string().optional() })

	return {
		post:
			form_post && form_post.length > 5
				? await prisma.post.findUniqueOrThrow({ where: { id: form_post }, include: { tags: true } })
				: undefined
	}
}
