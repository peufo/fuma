import type { ShapeOf } from '$lib/index.js'
import z from 'zod'

export type User = {
    name: string
    age: number
    friends: Omit<User, 'friends'>[]
}

export const shapeUser = {
	name: z.string(),
    age: z.number(),
	friends: z.array(
		z.object({
			name: z.string().min(3),
			age: z.number().min(10)
		})
	)
} satisfies ShapeOf<User>