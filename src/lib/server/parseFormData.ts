import {
	USE_COERCE_BOOLEAN,
	USE_COERCE_DATE,
	USE_COERCE_JSON,
	USE_COERCE_NUMBER
} from '$lib/utils/constant.js'
import { jsonParse } from '$lib/utils/jsonParse.js'
import z from 'zod'

export type Issue = z.ZodIssue & { received: string; expected: string; unionErrors?: z.ZodError[] }

export async function parseFormData<Shape extends z.ZodRawShape>(
	requestOrFormData: Request | FormData,
	shapes: Shape | Shape[],
	validation?: z.SuperRefinement<z.objectOutputType<Shape, z.ZodTypeAny>>
) {
	const formData =
		requestOrFormData instanceof Request ? await requestOrFormData.formData() : requestOrFormData

	const [firstShap, ...unionShaps] = Array.isArray(shapes) ? shapes : [shapes]
	const shema = z.object(firstShap).superRefine(validation || (() => {}))
	unionShaps.forEach((shap) => shema.or(z.object(shap)))

	const formDataFlateObject: Record<string, unknown> = Object.fromEntries(formData)
	const formDataFlateObjectCoerced = coerceFlateData(formDataFlateObject)
	const formDataObject = flateToNeestedObject(formDataFlateObjectCoerced)

	console.log('data', formDataObject)

	const parsed = shema.safeParse(formDataObject)
	if (parsed.success === false) {
		const issueToPOJO = (issue: Issue) => ({
			message: issue.message,
			path: issue.path,
			code: issue.code,
			received: issue.received,
			expected: issue.expected,
			unionErrors: issue.unionErrors?.map((err) => err.flatten())
		})

		const issues = (parsed.error.issues as Issue[]).map(issueToPOJO)
		throw { issues }
	}

	return { data: parsed.data, formData }
}

function coerceFlateData(flateData: Record<string, unknown>) {
	const coerceMap: Record<string, (value: string) => unknown> = {
		[USE_COERCE_JSON]: (value) => jsonParse(value, {}),
		[USE_COERCE_DATE]: (value) => (value ? new Date(value) : undefined),
		[USE_COERCE_NUMBER]: (value) => (value === '' || value === null ? null : +value),
		[USE_COERCE_BOOLEAN]: (value) => value === 'true'
	}

	function coerceValue(value: unknown) {
		if (typeof value !== 'string') return value
		const coerce = Object.entries(coerceMap).find(([TOKEN]) => value.startsWith(TOKEN))
		if (!coerce) return value
		return coerce[1](value.replace(coerce[0], ''))
	}
	return Object.entries(flateData).reduce(
		(acc, [key, value]) => ({ ...acc, [key]: coerceValue(value) }),
		{}
	)
}

function flateToNeestedObject(flatObject: Record<string, unknown>) {
	const obj: Record<string, unknown> = {}
	Object.entries(flatObject).forEach(([key, value]) => {
		set(obj, key, value)
	})
	return obj
}

function set(obj: Record<string, any>, path: string | number | (string | number)[], value: any) {
	if (typeof path === 'number') path = [path]
	if (!path || path.length === 0) return obj
	if (typeof path === 'string') return set(obj, path.split('.').map(getKey), value)

	const currentPath = path[0]
	const currentValue = obj[currentPath]

	if (path.length === 1) {
		if (currentValue === undefined) {
			obj[currentPath] = value
		}
		return currentValue
	}

	if (currentValue === undefined) {
		//check if we assume an array
		if (typeof path[1] === 'number') {
			obj[currentPath] = []
		} else {
			obj[currentPath] = {}
		}
	}

	return set(obj[currentPath], path.slice(1), value)
}

function getKey(key: string) {
	const intKey = parseInt(key)
	if (intKey.toString() === key) return intKey
	return key
}
