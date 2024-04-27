import type { z } from 'zod'
import type { ComponentProps } from 'svelte'
import { inputsType, type InputsProps, type InputsType } from './Input.svelte'
import type FormSection from './FormSection.svelte'

type Shape = z.ZodRawShape
type PickOne<T> = {
	[P in keyof T]: Record<P, T[P]> & Partial<Record<Exclude<keyof T, P>, undefined>>
}[keyof T]

export type BoolOrFunction<M extends Shape> = boolean | ((data: FormData<M>) => unknown)

export type FormData<M extends Shape> = Partial<z.infer<z.ZodObject<M>>>
export type FormField<M extends Shape> = {
	key: string & keyof M
	/** number col used by field */
	colSpan?: number
	/** hide field if true */
	hide?: BoolOrFunction<M>
} & PickOne<InputsProps>

export type FormSectionProps<M extends Shape> = ComponentProps<FormSection> & {
	/** hide group if true */
	hide?: BoolOrFunction<M>
}

export function initData<M extends Shape>(fields: FormField<M>[][]): FormData<M> {
	// @ts-ignore
	return fields.flat().reduce((acc, cur) => {
		const inputType = getFieldType(cur)
		// @ts-ignore
		return { ...acc, [cur.key]: cur[inputType]?.value }
	}, {})
}

export function getFieldType<M extends Shape>(field: FormField<M>): InputsType {
	const inputType = inputsType.find((t) => field[t])
	if (!inputType) return 'text'
	return inputType
}
