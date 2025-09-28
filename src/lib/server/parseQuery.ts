import z from 'zod'
import { error } from '@sveltejs/kit'

export function parseQuery<Shape extends z.core.$ZodShape>(url: URL, shape: Shape) {
	const queryRaw: Record<string, unknown> = {}
	Object.keys(shape).forEach((name) => {
		const param = url.searchParams.get(name)
		if (param) queryRaw[name] = param
	})
	const parsed = z.object(shape).safeParse(queryRaw)
	if (parsed.success === false) error(400, { message: parsed.error.message })
	return parsed.data
}
