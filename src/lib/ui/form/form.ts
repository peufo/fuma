import type { z } from 'zod'
import debounce from 'debounce'
import type { ComponentProps } from 'svelte'
import {  writable, type Writable } from 'svelte/store'
import type { FormEventHandler } from 'svelte/elements'
import { formInputsType, type FormInputsProps, type FormInputsType } from './formInput.js'

import type FormSection from './FormSection.svelte'

type Shape = z.ZodRawShape
type PickOne<T> = {
	[P in keyof T]: Record<P, T[P]> & Partial<Record<Exclude<keyof T, P>, undefined>>
}[keyof T]

export type Nullable<T> = {
	[P in keyof T]?: T[P] | null
}

export type BoolOrFunction<S extends Shape> =
	| boolean
	| ((data: Nullable<FormDataInput<S>>) => unknown)

export type FormDataInput<S extends Shape> = z.ZodObject<S>['_input']

export type FormField<S extends Shape> = {
	key: string & keyof S
	/** number col used by field */
	colSpan?: number
	/** hide field if true */
	hide?: BoolOrFunction<S>
} & PickOne<FormInputsProps>

export type FormSectionProps<S extends Shape> = ComponentProps<FormSection> & {
	/** hide group if true */
	hide?: BoolOrFunction<S>
}

export function initData<S extends Shape, Data extends FormDataInput<S> = FormDataInput<S>>(fields: FormField<S>[][]): Data {
	// @ts-ignore
	return fields.flat().reduce((acc, cur) => {
		const inputType = getFieldType(cur)
		// @ts-ignore
		return { ...acc, [cur.key]: cur[inputType]?.value }
	}, {})
}

export function getFieldType<S extends Shape>(field: FormField<S>): FormInputsType {
	const inputType = formInputsType.find((t) => field[t])
	if (!inputType) return 'text'
	return inputType
}

type HandleInputOptions<S extends Shape> = {
	model?: S
	setError: (key: string, value: string) => void
}

export function useHandleInput<S extends Shape>({
	model,
	setError
}: HandleInputOptions<S>): {
	isDirty: Writable<boolean>
	handleInput: FormEventHandler<HTMLFormElement>
} {
	const isDirty = writable(false)
	const setErrorDebounced = debounce(setError, 1500)

	return {
		isDirty,
		handleInput: ({ target }) => {
			if (!target) return
			isDirty.set(true)
			if (!model) return
			const { name, type, value, valueAsNumber, valueAsDate, checked } = target as HTMLInputElement
			const typeMapValue: Record<string, unknown> = {
				number: valueAsNumber,
				date: valueAsDate,
				text: value,
				checkbox: checked
			}
			const v = typeMapValue[type] ?? value
			if (v === undefined || name === undefined) return
			if (name === undefined) return
			if (!model[name]) return
			const res = model[name].safeParse(v)
			if (res.success) {
				setErrorDebounced.clear()
				setError(name, '')
			} else {
				setErrorDebounced(name, res.error.issues[0].message)
			}
		}
	}
}
