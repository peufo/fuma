import type { z } from 'zod'
import debounce from 'debounce'
import { writable, type Writable } from 'svelte/store'
import type { FormEventHandler } from 'svelte/elements'
import { formInputsType, type FormInputsProps, type FormInputsType } from './formInput.js'


type PickOne<T> = {
	[P in keyof T]: Record<P, T[P]> & Partial<Record<Exclude<keyof T, P>, undefined>>
}[keyof T]

export type Nullable<T> = {
	[P in keyof T]?: T[P] | null
}

export type BoolOrFunction<S extends z.core.$ZodShape> =
	| boolean
	| ((data: Nullable<FormDataInput<S>>) => unknown)

type FormDataInput<S extends z.core.$ZodShape> = z.input<z.core.$ZodObject<S>>

export type FormField<S extends z.core.$ZodShape> = {
	key: string & keyof S
	/** number col used by field */
	colSpan?: number
	/** hide field if true */
	hide?: BoolOrFunction<S>
} & PickOne<FormInputsProps>

export function initData<
	S extends z.core.$ZodShape,
	Data extends FormDataInput<S> = FormDataInput<S>
>(fields: FormField<S>[][]): Data {
	// @ts-ignore
	return fields.flat().reduce((acc, cur) => {
		const inputType = getFieldType(cur)
		// @ts-ignore
		return { ...acc, [cur.key]: cur[inputType]?.value }
	}, {})
}

export function getFieldType<S extends z.core.$ZodShape>(field: FormField<S>): FormInputsType {
	const inputType = formInputsType.find((t) => field[t])
	if (!inputType) return 'text'
	return inputType
}

type HandleInputOptions<S extends z.core.$ZodShape> = {
	model?: S
	setError: (key: string, value: string) => void
}

export function useHandleInput<S extends z.core.$ZodShape>({
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
			if (!model) return
			const { name } = target as HTMLInputElement
			const value = getTypedValue(target as HTMLInputElement)
			if (value === undefined) return
			if (name === undefined) return
			if (!model[name]) return
			isDirty.set(true)
			// TODO: fix this type error please
			// @ts-ignore
			const res = model[name].safeParse(value)
			if (res.success) {
				setErrorDebounced.clear()
				setError(name, '')
			} else {
				setErrorDebounced(name, res.error.issues[0].message)
			}
		}
	}
}

function getTypedValue(target: HTMLInputElement) {
	const { type, value, valueAsNumber, valueAsDate, checked } = target as HTMLInputElement
	const typeMapValue: Record<string, unknown> = {
		number: valueAsNumber,
		date: valueAsDate,
		text: value,
		checkbox: checked
	}
	return typeMapValue[type] ?? value
}
