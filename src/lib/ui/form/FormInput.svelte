<script lang="ts" generics="InputType extends FormInputsType">
	import { formInputs, type FormInputProps, type FormInputsType } from './formInput.js'

	type $$Props = FormInputProps<InputType> & {
		type: InputType
		value: FormInputProps<InputType>['value']
	}

	let inputType: InputType
	export { inputType as type }
	export let value: FormInputProps<InputType>['value']
	$: component = formInputs[inputType] as any
</script>

<svelte:component this={component} bind:value {...$$restProps} />
