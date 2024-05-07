import axios, {
	type AxiosRequestConfig,
	type CreateAxiosDefaults,
	type RawAxiosResponseHeaders
} from 'axios'
import * as devalue from 'devalue'
import type { TypeMap, ApiConfig, ApiClient, ModelApiQuery } from './config.js'

export function useApiClient<T extends TypeMap, C extends ApiConfig<T>>(
	prismaConfig: C,
	axiosConfig: CreateAxiosDefaults = {}
): ApiClient<T, C> {
	const _axios = axios.create({ baseURL: '/api', ...axiosConfig })
	function useSearch(model: string) {
		return async (search: string) => {
			const config = { params: { search, model } }
			const { data, headers } = await _axios.get('', config)
			ensureJson(headers)
			return devalue.unflatten(data) as T[]
		}
	}

	const api = Object.keys(prismaConfig).reduce(
		(acc, model) => ({
			...acc,
			[model]: useSearch(model)
		}),
		{}
	) as ApiClient<T, C>
	return api
}

function ensureJson(headers: RawAxiosResponseHeaders) {
	const contentType = headers['content-type']
	if (contentType !== 'application/json') {
		throw new Error(`Response Content-type is '${contentType}' instead 'application/json'`)
	}
}
