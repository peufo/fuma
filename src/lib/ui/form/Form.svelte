<script lang="ts" module>
	import { type z } from 'zod'
</script>

<script
	lang="ts"
	generics="
		Shape extends z.core.$ZodShape,
		Data extends z.input<z.core.$ZodObject<Shape>> = z.input<z.core.$ZodObject<Shape>>,
	"
>
	import { type Snippet } from 'svelte'
	import { useHandleInput } from '$lib/ui/form/form.js'
	import ButtonDelete from '$lib/ui/button/ButtonDelete.svelte'

	import { useForm, type UseFormOptions } from '$lib/validation/form.js'

	let {
		shape,
		class: klass = '',
		action = '',
		data = $bindable({}),
		options = {},
		onCreate,
		onUpdate,
		onDelete,
		children
	}: {
		shape: Shape
		data: Partial<Data>
		options?: UseFormOptions<Data>
		class?: string
		action?: string
		onCreate?: (data: Data) => void
		onUpdate?: (data: Data) => void
		onDelete?: () => void
		children: Snippet
	} = $props()

	let actionCreate = $derived(action + '_create')
	let actionUpdate = $derived(action + '_update')
	let actionDelete = $derived(action + '_delete')

	export function set<K extends keyof Data>(key: K, value: Partial<Data>[K]) {
		$isDirty = true
		data[key] = value
	}
	export function update(updater: (currentData: Partial<Data>) => Partial<Data>) {
		$isDirty = true
		data = updater(data)
	}

	const { enhance, setError } = $derived(
		useForm<Data>({
			...options,
			async onSuccess(url, data) {
				if (options.onSuccess) await options.onSuccess(url, data)
				const actionPath = url.pathname + url.search
				if (actionPath.includes(actionDelete)) onDelete?.()
				if (!data) return
				if (actionPath.includes(actionCreate)) onCreate?.(data)
				if (actionPath.includes(actionUpdate)) onUpdate?.(data)
			}
		})
	)
	const { handleInput, isDirty } = $derived(useHandleInput({ shape, setError }))
</script>

<form
	method="post"
	action={data?.id ? actionUpdate : actionCreate}
	enctype="multipart/form-data"
	class="{klass} flex flex-col gap-4"
	use:enhance
	oninput={handleInput}
>
	{#if data?.id}
		<input type="hidden" name="id" value={data.id} />
	{/if}

	{@render children?.()}

	<div class="sticky col-span-full mt-2 flex flex-row-reverse gap-2 border-t py-4 backdrop-blur-sm">
		<button class="btn btn-primary"> Valider </button>
		<div class="grow"></div>
		{#if data?.id && actionDelete}
			{@const formaction = `${action}${actionDelete}`}
			<ButtonDelete {formaction}>Supprimer</ButtonDelete>
		{/if}
	</div>
</form>
