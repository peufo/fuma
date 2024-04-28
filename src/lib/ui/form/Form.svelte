<script lang="ts">
	import {
		initData,
		type FormField,
		type FormSectionProps,
		type FormData,
		type BoolOrFunction,
		getFieldType
	} from './form.js'

	import { createEventDispatcher, onMount } from 'svelte'
	import { fade } from 'svelte/transition'
	import type { z } from 'zod'
	import { page } from '$app/stores'
	import { useForm } from '$lib/validation/form.js'

	import Input from './FormInput.svelte'
	import FormSection from './FormSection.svelte'

	type Shape = $$Generic<z.ZodRawShape>
	let klass = ''
	export { klass as class }
	export let classSection = ''

	export let fields: FormField<Shape>[][] = []
	export let sections: FormSectionProps<Shape>[] = [{}]
	export let data: FormData<Shape> = initData(fields)

	export let action = ''
	export let actionDelete = ''
	export let actionPrefix = ''
	export let successMessage = 'Succès'
	export function set<K extends keyof Shape>(key: K, value: FormData<Shape>[K]) {
		data[key] = value
	}

	const dispatch = createEventDispatcher<{ success: { action: URL; data?: FormData<Shape> } }>()

	const { enhance } = useForm<FormData<Shape>>({
		onSuccess(action, data) {
			dispatch('success', { action, data })
		},
		successMessage
	})

	onMount(lookupValueFromParams)

	function lookupValueFromParams() {
		fields.flat().forEach(({ key }) => {
			if (data[key]) return
			const value = $page.url.searchParams.get(key)
			if (value) data[key] = value
		})
	}

	const getBoolean = (bool?: BoolOrFunction<Shape>) => (_data: FormData<Shape>) =>
		typeof bool === 'boolean' || bool === undefined ? !!bool : !!bool(_data)

	/* TODO include this features on fuma/useForm
	// export let model: z.ZodObject<Shape>
	const handleInput: FormEventHandler<HTMLFormElement> = ({ target }) => {
		if (!target) return
		data = data

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
		if (!model.shape[name]) return
		const res = model.shape[name].safeParse(v)
		if (res.success) {
			addError.clear()
			delete errors[name]
			errors = errors
		} else {
			addError(name, res.error.issues[0].message)
		}
	}
	const addError = debounce((key: string, error: string) => {
		errors = { ...errors, [key]: error }
	}, 1500)
	*/
</script>

<form
	method="post"
	action="{actionPrefix}{action}"
	enctype="multipart/form-data"
	class="{klass} flex flex-col gap-4"
	use:enhance
>
	{#if data.id}
		<input type="hidden" name="id" value={data.id} />
	{/if}

	{#each fields as groupFields, groupIndex}
		{@const section = sections[groupIndex] || {}}
		{#if !getBoolean(section?.hide)(data)}
			<div class="contents" in:fade|local={{ duration: 200 }}>
				<FormSection {...section} class="{classSection} {section.class || ''} max-w-full">
					<div class="grid grid-cols-4 gap-x-4 gap-y-2">
						{#each groupFields as field (field.key)}
							{#if !getBoolean(field.hide)(data)}
								{@const inputType = getFieldType(field)}
								<div
									style={`grid-column: span ${field.colSpan || 2};`}
									in:fade|local={{ duration: 200 }}
								>
									<Input
										key={field.key}
										type={inputType}
										bind:value={data[field.key]}
										{...field[inputType]}
									/>
								</div>
							{/if}
						{/each}
					</div>
				</FormSection>
			</div>
		{/if}
	{/each}

	<div class="sticky bottom-0 col-span-full mt-2 flex gap-2 border-t px-4 py-4 backdrop-blur-sm">
		{#if actionDelete}
			<button
				class="btn-ghos btn text-error"
				type="button"
				formaction="{actionPrefix}{actionDelete}"
			>
				Supprimer
			</button>
		{/if}
		<div class="grow" />
		<button class="btn btn-primary"> Valider </button>
	</div>
</form>
