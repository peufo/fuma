import z from 'zod'

export const model = {
	name: z.string(),
	friends: z.array(
		z.object({
			name: z.string().min(3),
			age: z.number().min(10)
		})
	)
}
