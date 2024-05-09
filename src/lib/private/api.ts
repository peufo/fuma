import type { Prisma } from '@prisma/client'
import type { ApiConfig } from '$lib/api/config.js'
import { useApiClient } from '$lib/api/client.js'

export const apiConfig = {
	Tag: (search) => ({ where: { name: { contains: search } } }),
	Post: (search) => ({
		where: { tags: { some: { name: { contains: search } } } },
		include: { tags: true }
	}),
	PostType: (search) => ({ where: { name: { contains: search } } })
} satisfies ApiConfig<Prisma.TypeMap>

export const api = useApiClient<Prisma.TypeMap, typeof apiConfig>(apiConfig)
