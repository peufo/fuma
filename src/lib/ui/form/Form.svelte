<script lang="ts" context="module">
	import { boolean, type z } from 'zod'
	import type { FormDataInput } from '$lib/ui/form/form.js'
</script>

<script
	lang="ts"
	generics="
		Shape extends z.core.$ZodShape,
		ReturnData extends Record<string, unknown> = FormDataInput<Shape>,
		Data extends FormDataInput<Shape> = FormDataInput<Shape>
	"
>
	import { onMount, type ComponentProps } from 'svelte'
	import { fade } from 'svelte/transition'
	import { page } from '$app/state'
	import { contextContainer } from '$lib/ui/context.js'
	import {
		initData,
		type FormField,
		type BoolOrFunction,
		type Nullable,
		getFieldType,
		useHandleInput
	} from '$lib/ui/form/form.js'
	import ButtonDelete from '$lib/ui/button/ButtonDelete.svelte'

	import { useForm, type UseFormOptions } from '$lib/validation/form.js'
	import FormSection from './FormSection.svelte'

	let {
		class: klass = '',
		classSection = '',
		classAction = '',
		model = undefined,
		fields = [],
		sections = [],
		action = '',
		actionCreate = '_create',
		actionDelete = '_delete',
		actionUpdate = '_update',
		disabled = false,

		/** Ignore actionCreate, actionDelete and actionUpdate */
		simpleAction = false,
		data: inputData,
		options = {}
	}: {
		class?: string
		classSection?: string
		classAction?: string
		model?: Shape
		fields?: FormField<Shape>[][]
		sections?: ComponentProps<typeof FormSection>[]
		action?: string
		actionCreate?: string
		actionDelete?: string
		actionUpdate?: string
		disabled?: boolean

		/** Ignore actionCreate, actionDelete and actionUpdate */
		simpleAction?: boolean
		data: Data
		options?: UseFormOptions<ReturnData>
	} = $props()

	let data: Partial<Data> = dataInput || {}

	export function set<K extends keyof Data>(key: K, value: Partial<Data>[K]) {
		isDirty.set(true)
		data[key] = value
	}
	export function update(updater: (currentData: Partial<Data>) => Partial<Data>) {
		isDirty.set(true)
		data = updater(data)
	}

	const dispatch = createEventDispatcher<{
		success: { action: URL; data?: ReturnData }
		created: ReturnData
		updated: ReturnData
		deleted: void
	}>()

	const { enhance, setError } = useForm<ReturnData>({
		...options,
		async onSuccess(url, data) {
			if (options.onSuccess) await options.onSuccess(url, data)
			dispatch('success', { action: url, data })
			const actionPath = url.pathname + url.search
			if (actionPath.includes(action + actionDelete)) dispatch('deleted')
			if (!data) return
			if (actionPath.includes(action + actionCreate)) dispatch('created', data)
			if (actionPath.includes(action + actionUpdate)) dispatch('updated', data)
		}
	})
	const { handleInput, isDirty } = useHandleInput({ model, setError })

	onMount(lookupValueFromParams)
	$: $isDirty ? (dataInput = data) : (data = dataInput || {})

	function lookupValueFromParams() {
		fields.flat().forEach(({ key }) => {
			if (data[key]) return
			const value = $page.url.searchParams.get(key)
			// TODO: fix data[key] type
			// @ts-ignore
			if (value && key in data) data[key] = value
		})
	}

	const actionPadding = getActionPadding()
	function getActionPadding(): string {
		const container = contextContainer.get()
		if (container === 'drawer') return 'bottom-0 -ml-8 -mr-4 pl-8 pr-4'
		if (container === 'card') return 'bottom-0 -mx-2 sm:-mx-8 px-2 sm:px-8'
		if (container === 'dialog') return '-bottom-4 -mx-4 px-4'
		return 'bottom-0'
	}

	const getBoolean = (bool?: BoolOrFunction<Shape>) => (_data: Nullable<Data>) =>
		typeof bool === 'boolean' || bool === undefined ? !!bool : !!bool(_data)
</script>

<form
	method="post"
	action="{action}{simpleAction ? '' : data?.id ? actionUpdate : actionCreate}"
	enctype="multipart/form-data"
	class="{klass} flex flex-col gap-4"
	use:enhance
	on:input={handleInput}
>
	{#if data?.id}
		<input type="hidden" name="id" value={data.id} />
	{/if}

	<slot />

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
									<!-- TODO: not a good aproach -->
									<!-- <FormInput
										key={field.key}
										type={inputType}
										bind:value={data[field.key]}
										{...field[inputType]}
									/> -->
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
			sticky col-span-full mt-2 flex flex-row-reverse gap-2 border-t py-4 backdrop-blur-sm
		"
	>
		<button class="btn btn-primary" {disabled}> Valider </button>
		<div class="grow"></div>
		{#if !simpleAction && data?.id && actionDelete}
			{@const formaction = `${action}${actionDelete}`}
			<slot name="delete" {formaction}>
				<ButtonDelete {formaction} {disabled}>Supprimer</ButtonDelete>
			</slot>
		{/if}
	</div>
</form>
