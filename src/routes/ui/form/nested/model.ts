import { type ShapeOf } from '$lib/index.js'
import type { Prisma } from '@prisma/client'

// TODO: real exemple

export const model = {
	name: z.string(),
	friends: z.array(
		z.object({
			name: z.string().min(3),
			age: z.number().min(10)
		})
	)
} satisfies ShapeOf<Prisma.UserCreateInput>
