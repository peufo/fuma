import type { ComponentProps } from 'svelte'
import type { HTMLInputAttributes, HTMLTextareaAttributes } from 'svelte/elements'
import { default as FormControl } from './FormControl.svelte'

export type InputProps<T = string> = ComponentProps<FormControl> & {
	input?: HTMLInputAttributes
	inputElement?: HTMLInputElement
	wrapperClass?: string
	value?: T
	bindWithParams?: boolean
}
export type TextareaProps = ComponentProps<FormControl> & {
	textarea?: HTMLTextareaAttributes
	value?: string
	bindWithParams?: boolean
}
