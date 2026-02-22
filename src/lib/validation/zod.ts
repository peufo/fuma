import z from 'zod';

export type ShapeOf<T extends Record<string, unknown>> = Readonly<
	Readonly<{
		[K in keyof T]: z.core.$ZodType<
			T[K],
			unknown,
			z.core.$ZodTypeInternals<T[K], unknown>
		>;
	}>
>;

export type JsonValue =
	| string
	| number
	| boolean
	| null
	| JsonValue[]
	| JsonRecord;
export type JsonRecord = { [key: string]: JsonValue };

export const zodJsonValue: z.core.$ZodType<JsonValue> = z.lazy(() =>
	z.union([
		z.null(),
		z.string(),
		z.number(),
		z.boolean(),
		zodJsonRecord,
		z.array(z.string()),
		z.array(z.number()),
		z.array(z.boolean()),
		z.array(zodJsonRecord),
	])
);
export const zodJsonRecord: z.core.$ZodType<JsonRecord> = z.record(
	z.string(),
	zodJsonValue
);
export const zodCoerceJson = z.string().transform((str, ctx) => {
	try {
		return JSON.parse(str);
	} catch (_err) {
		ctx.addIssue({ code: 'custom', message: 'Invalid JSON' });
		return z.NEVER;
	}
});

export const zodCoerceJsonValue = zodCoerceJson.pipe(zodJsonValue);
export const zodCoerceJsonRecord = zodCoerceJson.pipe(zodJsonRecord);

export const prismaRelation = {
	connect: z.object({ id: z.string() }).transform((connect) => ({ connect })),
	create<T extends z.core.$ZodShape>(shap: T) {
		return z.object(shap).transform((create) => ({ create }));
	},
	connectOrCreate<T extends z.core.$ZodShape>(shap: T) {
		return z.object(shap).transform((connectOrCreate) => ({ connectOrCreate }));
	},
	upsert<T extends z.core.$ZodShape>(shap: T) {
		return z.object(shap).transform((upsert) => ({ upsert }));
	},
	update<T extends z.core.$ZodShape>(shap: T) {
		return z.object(shap).transform((update) => ({ update }));
	},
};

type RelationsOperation = 'set' | 'disconnect' | 'delete' | 'connect';
type OperationResult = Partial<Record<RelationsOperation, { id: string }[]>>;
function relationsUniqueInput(operation: RelationsOperation = 'set') {
	return z
		.array(z.object({ id: z.string() }))
		.transform(
			(items) =>
				({ [operation]: items.map(({ id }) => ({ id })) }) as OperationResult
		);
}

function objectOrArray<T extends z.core.$ZodShape>(shap: T) {
	return z.union([z.array(z.object(shap)), z.object(shap)]);
}

export const prismaRelations = {
	set: relationsUniqueInput('set'),
	disconnect: relationsUniqueInput('disconnect'),
	delete: relationsUniqueInput('delete'),
	connect: relationsUniqueInput('connect'),
	create<T extends z.core.$ZodShape>(shap: T) {
		return objectOrArray(shap).transform((create) => ({ create }));
	},
	connectOrCreate<T extends z.core.$ZodShape>(shap: T) {
		return objectOrArray(shap).transform((connectOrCreate) => ({
			connectOrCreate,
		}));
	},
	upsert<T extends z.core.$ZodShape>(shap: T) {
		return objectOrArray(shap).transform((upsert) => ({ upsert }));
	},
	createMany<T extends z.core.$ZodShape>(shap: T) {
		return objectOrArray(shap).transform((createMany) => ({ createMany }));
	},
	update<T extends z.core.$ZodShape>(shap: T) {
		return objectOrArray(shap).transform((update) => ({ update }));
	},
	updateMany<T extends z.core.$ZodShape>(shap: T) {
		return objectOrArray(shap).transform((updateMany) => ({ updateMany }));
	},
	deleteMany<T extends z.core.$ZodShape>(shap: T) {
		return objectOrArray(shap).transform((deleteMany) => ({ deleteMany }));
	},
};

export const tableFilter = {
	number: zodCoerceJsonRecord.pipe(
		z.object({
			min: z.number().optional(),
			max: z.number().optional(),
			order: z.enum(['asc', 'desc']).optional(),
		})
	),
	multiselect: zodCoerceJsonValue.pipe(z.array(z.string())),
	range: zodCoerceJsonRecord.pipe(
		z.object({
			start: z.iso.date().optional(),
			end: z.iso.date().optional(),
			order: z.enum(['asc', 'desc']).optional(),
		})
	),
	boolean: z.enum(['true', 'false']).transform((value) => value === 'true'),
};

export const enumOfObject = Object.keys as <T extends {}>(
	o: T
) => UnionToTuple<keyof T>;

type UnionToIntersection<U> = (
	U extends unknown
		? (arg: U) => 0
		: never
) extends (arg: infer I) => 0
	? I
	: never;

type LastInUnion<U> =
	UnionToIntersection<U extends unknown ? (x: U) => 0 : never> extends (
		x: infer L
	) => 0
		? L
		: never;
export type UnionToTuple<U, Last = LastInUnion<U>> = [U] extends [never]
	? []
	: [...UnionToTuple<Exclude<U, Last>>, Last];
