import { toTuple, z, type ZodObj } from '$lib/validation/zod.js'
import type { Prisma } from '@prisma/client'
import { POST_PUBLICATION } from './constant.js'

export const modelPost = {
	title: z.string(),
	content: z.string().min(10),
	isFavourite: z.boolean(),
	likeCount: z.number(),
	writingAt: z.date(),
	writingDuration: z.number(),
	publication: z.enum(toTuple(POST_PUBLICATION)),
	type: z.relation.connect,
	tags: z.relations.connect
} satisfies ZodObj<Omit<Prisma.PostCreateInput, 'author'>>

export const modelPostUpdate = {
	...modelPost,
	id: z.string(),
	tags: z.relations.set
} satisfies ZodObj<Omit<Prisma.PostUpdateInput, 'author'>>

export const modelTag = {
	name: z.string().min(2)
} satisfies ZodObj<Prisma.TagCreateInput>
