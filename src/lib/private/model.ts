import { z, type ZodObj } from '$lib/validation/zod.js'
import type { Prisma } from '@prisma/client'

export const modelPost = {
	content: z.string().min(10),
	description: z.string().optional(),
	aString: z.string(),
	aBoolean: z.boolean(),
	aDate: z.date(),
	aNumber: z.number(),
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
