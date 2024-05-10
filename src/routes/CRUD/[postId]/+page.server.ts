import { prisma } from '$lib/private/prisma.js'

export const load = async ({ params: { postId } }) => {
	return {
		post: await prisma.post.findUniqueOrThrow({
			where: { id: postId },
			include: { tags: true, author: { select: { id: true, username: true } } }
		})
	}
}
