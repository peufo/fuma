import type { ComponentProps } from 'svelte'
import {
	InputText,
	InputTextarea,
	InputBoolean,
	InputDate,
	InputDatetime,
	InputNumber,
	InputPassword,
	InputRadio,
	InputSelect,
	InputRelation,
	InputRelations
} from '$lib/ui/input/index.js'

export const formInputs = {
	text: InputText,
	textarea: InputTextarea,
	boolean: InputBoolean,
	date: InputDate,
	datetime: InputDatetime,
	number: InputNumber,
	password: InputPassword,
	select: InputSelect,
	radio: InputRadio,
	relation: InputRelation as typeof InputRelation<any>,
	relations: InputRelations as typeof InputRelations<any>
} as const

export type FormInputs = typeof formInputs
export type FormInputsType = keyof FormInputs
export type FormInputProps<T extends FormInputsType> = ComponentProps<InstanceType<FormInputs[T]>>
export type FormInputsProps = { [T in FormInputsType]: FormInputProps<T> }

export const formInputsType = Object.keys(formInputs) as FormInputsType[]
export function relationProps<Item extends { id: string }>(
	props: ComponentProps<InstanceType<typeof InputRelation<Item>>>
) {
	return props
}
export function relationsProps<Item extends { id: string }>(
	props: ComponentProps<InstanceType<typeof InputRelations<Item>>>
) {
	return props
}
