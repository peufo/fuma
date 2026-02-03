import z from 'zod'
import type { Prisma } from '@prisma/client'
import { POST_PUBLICATION } from './constant.js'
import { enumOfObject, type ShapeOf, prismaRelation, prismaRelations } from '$lib/validation/zod.js'

export const modelPost = {
	title: z.string().min(1, 'Required'),
	content: z.string().min(10),
	isFavourite: z.boolean(),
	likeCount: z.number(),
	writingAt: z.date(),
	writingDuration: z.date(),
	isInteressing: z.boolean().optional(),
	viewCounter: z.number().optional(),
	publishedAt: z.date().optional().nullable(),
	publishedAtTime: z.date().optional().nullable(),
	publication: z.enum(enumOfObject(POST_PUBLICATION)),
	type: prismaRelation.connect,
	tags: prismaRelations.connect
} satisfies ShapeOf<Omit<Prisma.PostCreateInput, 'author'>>

export const modelPostUpdate = {
	...modelPost,
	id: z.string(),
	tags: prismaRelations.set
} satisfies ShapeOf<Omit<Prisma.PostUpdateInput, 'author'>>

export const modelTag = {
	name: z.string().min(1, 'Required')
} satisfies ShapeOf<Prisma.TagCreateInput>
