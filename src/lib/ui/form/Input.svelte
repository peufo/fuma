<script lang="ts" context="module">
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

	export const inputs = {
		text: InputText,
		textarea: InputTextarea,
		boolean: InputBoolean,
		date: InputDate,
		datetime: InputDatetime,
		number: InputNumber,
		password: InputPassword,
		radio: InputRadio,
		select: InputSelect,
		relation: InputRelation as typeof InputRelation<any>,
		relations: InputRelations as typeof InputRelations<any>
	} as const

	export type Inputs = typeof inputs
	export type InputsType = keyof Inputs
	export type InputProps<T extends InputsType> = ComponentProps<InstanceType<Inputs[T]>>
	export type InputsProps = { [T in InputsType]: InputProps<T> }

	export const inputsType = Object.keys(inputs) as InputsType[]
</script>

<script lang="ts">
	type InputType = $$Generic<InputTypes>
	type $$Props = InputProps<InputType> & { type: InputType; value: InputProps<InputType>['value'] }

	let inputType: InputType
	export { inputType as type }
	export let value: InputProps<InputType>['value']
</script>

<svelte:component this={inputs[inputType]} bind:value {...$$restProps} />
