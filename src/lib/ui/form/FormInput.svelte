<script lang="ts">
	import { formInputs, type FormInputProps } from './formInput.js'

	type InputType = $$Generic<InputTypes>
	type $$Props = FormInputProps<InputType> & {
		type: InputType
		value: FormInputProps<InputType>['value']
	}

	let inputType: InputType
	export { inputType as type }
	export let value: FormInputProps<InputType>['value']
</script>

<svelte:component this={formInputs[inputType]} bind:value {...$$restProps} />
