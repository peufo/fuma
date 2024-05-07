import { error, type RequestHandler } from '@sveltejs/kit'
import { json } from '$lib/server/json.js'
import { parseQuery } from '$lib/server/parseQuery.js'
import { type ApiConfig, modelApiQuery, type TypeMap } from './config.js'

interface BasicPrismaClient {
	[K: string]: any
	$connect: any
	$transaction: any
}

export function apiServer<T extends TypeMap>(
	config: ApiConfig<T>,
	client: BasicPrismaClient
): { GET: RequestHandler } {
	return {
		async GET(event) {
			const { model, search, take, skip } = parseQuery(event.url, modelApiQuery)
			if (!(model in config)) error(400, `Model "${model}" is not exposed in this API.`)
			const baseQuery = { take, skip }
			//@ts-ignore
			const result = await client[model].findMany({ ...baseQuery, ...config[model](search) })
			return json(result)
		}
	}
}
