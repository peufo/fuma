import type {
	HTMLInputAttributes,
	HTMLOptionAttributes,
	HTMLSelectAttributes,
	HTMLTextareaAttributes
} from 'svelte/elements'

export type InputProps = Omit<HTMLInputAttributes, 'name' | 'value' | 'aria-invalid' | 'type'>

export type TextareaProps = Omit<HTMLTextareaAttributes, 'name' | 'value' | 'aria-invalid'>

export type OptionProps = Omit<HTMLOptionAttributes, 'name' | 'value' | 'aria-invalid'>

export type SelectProps = Omit<HTMLSelectAttributes, 'name' | 'value' | 'aria-invalid'>
