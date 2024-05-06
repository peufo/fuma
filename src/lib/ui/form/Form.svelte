<script lang="ts" context="module">
	import type { z } from 'zod'
	import type { FormDataInput } from '$lib/ui/form/form.js'
</script>

<script
	lang="ts"
	generics="Shape extends z.ZodRawShape, ReturnData extends Record<string, unknown> = FormDataInput<Shape>"
>
	import { createEventDispatcher, onMount } from 'svelte'
	import { fade } from 'svelte/transition'
	import { page } from '$app/stores'
	import { contextContainer } from '$lib/ui/context.js'
	import {
		initData,
		type FormField,
		type FormSectionProps,
		type BoolOrFunction,
		type Nullable,
		getFieldType,
		useHandleInput
	} from '$lib/ui/form/form.js'

	import { useForm, type UseFormOptions } from '$lib/validation/form.js'
	import FormInput from './FormInput.svelte'
	import FormSection from './FormSection.svelte'

	let klass = ''
	export { klass as class }
	export let classSection = ''
	export let classAction = ''
	export let model: Shape | undefined = undefined
	export let fields: FormField<Shape>[][] = []
	export let sections: FormSectionProps<Shape>[] = [{}]
	export let data: Nullable<FormDataInput<Shape>> = initData(fields)

	export let action = ''
	export let actionCreate = '_create'
	export let actionDelete = '_delete'
	export let actionUpdate = '_update'
	export let options: UseFormOptions<ReturnData> = {}
	export function set<K extends keyof Shape>(key: K, value: Nullable<FormDataInput<Shape>>[K]) {
		data[key] = value
	}

	const dispatch = createEventDispatcher<{ success: { action: URL; data?: ReturnData } }>()

	const { enhance, setError } = useForm<ReturnData>({
		...options,
		onSuccess(action, data) {
			dispatch('success', { action, data })
			if (options.onSuccess) options.onSuccess(action, data)
		}
	})
	const handleInput = model ? useHandleInput(model, { setError }) : () => {}

	onMount(lookupValueFromParams)

	function lookupValueFromParams() {
		fields.flat().forEach(({ key }) => {
			if (data[key]) return
			const value = $page.url.searchParams.get(key)
			if (value) data[key] = value
		})
	}

	const actionPadding = getActionPadding()
	function getActionPadding(): string {
		const container = contextContainer.get()
		if (container === 'card') return '-mx-2 sm:-mx-8 px-2 sm:px-8'
		if (container === 'drawer') return '-ml-8 -mr-4 pl-8 pr-4'
		return ''
	}

	const getBoolean = (bool?: BoolOrFunction<Shape>) => (_data: Nullable<FormDataInput<Shape>>) =>
		typeof bool === 'boolean' || bool === undefined ? !!bool : !!bool(_data)
</script>

<form
	method="post"
	action="{action}{data?.id ? actionUpdate : actionCreate}"
	enctype="multipart/form-data"
	class="{klass} flex flex-col gap-4"
	use:enhance
	on:input={handleInput}
>
	<slot />

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
									<FormInput
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

	<div
		class="
			{classAction} {actionPadding}
			sticky bottom-0 col-span-full mt-2 flex gap-2 border-t py-4 backdrop-blur-sm
		"
	>
		{#if data.id && actionDelete}
			<button class="btn-ghos btn text-error" type="button" formaction="{action}{actionDelete}">
				Supprimer
			</button>
		{/if}
		<div class="grow" />
		<button class="btn btn-primary"> Valider </button>
	</div>
</form>
