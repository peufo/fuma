import { z, type ZodObj } from '$lib/validation/zod.js'
import type { OperationPayload, GetResult, Args } from '@prisma/client/runtime/library.js'

export type Operation =
	| 'findFirst'
	| 'findFirstOrThrow'
	| 'findUnique'
	| 'findUniqueOrThrow'
	| 'findMany'
	| 'create'
	| 'createMany'
	| 'update'
	| 'updateMany'
	| 'upsert'
	| 'delete'
	| 'deleteMany'
	| 'aggregate'
	| 'count'
	| 'groupBy'

export type TypeMap = {
	model: {
		[M: string]: {
			payload: OperationPayload
			operations: {
				[O in Operation]: {
					args: {}
				}
			}
		}
	}
}

export type Result<
	T extends TypeMap,
	M extends keyof T['model'],
	Query extends {},
	Payload extends T['model'][M]['payload'] = T['model'][M]['payload']
> = GetResult<Payload, Query, 'findMany'>

export type Query<
	T extends TypeMap,
	M extends keyof T['model'],
	O extends Operation = 'findMany'
> = T['model'][M]['operations'][O]['args']

export type QueryToResult<
	T extends TypeMap,
	M extends keyof T['model'],
	O extends Operation = 'findMany',
	Q extends Query<T, M, O> = {}
> = (query: Q) => Promise<Result<T, M, Q>>

export type ApiPrismaClient<T extends TypeMap> = {
	[M in keyof T['model']]: {
		[O in Operation]: QueryToResult<T, M, O>
	}
}

/**
 * @example
 * const config = {
 *		user: (contains) => ({ where: { username: { contains } } }),
 * } satisfies ApiConfig<Prisma.TypeMap>
 */
export type ApiConfig<T extends TypeMap> = {
	[M in keyof T['model']]?: (search: string) => Query<T, M, 'findMany'>
}

export type ApiClient<T extends TypeMap, C extends ApiConfig<T>> = {
	[M in keyof C]: C[M] extends (...args: any) => infer Q
		? (search: string) => Promise<Result<T, M & string, Q & {}>>
		: never
}

export type ModelApiQuery = {
	model: string
	search?: string
	take?: number
	skip?: number
}

export const modelApiQuery = {
	model: z.string(),
	search: z.string().default(''),
	take: z.number().default(10),
	skip: z.number().default(0)
} satisfies ZodObj<ModelApiQuery>
