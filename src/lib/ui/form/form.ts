import type { z } from 'zod'
import debounce from 'debounce'
import { writable, type Writable } from 'svelte/store'
import type { FormEventHandler } from 'svelte/elements'

export type Nullable<T> = {
	[P in keyof T]?: T[P] | null
}

export type BoolOrFunction<S extends z.core.$ZodShape> =
	| boolean
	| ((data: Nullable<FormDataInput<S>>) => unknown)

type FormDataInput<S extends z.core.$ZodShape> = z.input<z.core.$ZodObject<S>>

type HandleInputOptions<S extends z.core.$ZodShape> = {
	shape?: S
	setError: (key: string, value: string) => void
}

export function useHandleInput<S extends z.core.$ZodShape>({
	shape,
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
			if (!shape) return
			const { name } = target as HTMLInputElement
			const value = getTypedValue(target as HTMLInputElement)
			if (value === undefined) return
			if (name === undefined) return
			if (!shape[name]) return
			isDirty.set(true)
			// TODO: fix this type error please
			// @ts-ignore
			const res = shape[name].safeParse(value)
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
