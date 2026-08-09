<script lang="ts" generics="Item extends ItemBase">
	import {
		CheckIcon,
		CircleCheckIcon,
		CircleIcon,
		EllipsisIcon,
		GripIcon,
		PlusIcon
	} from '@lucide/svelte'
	import { goto } from '$app/navigation'
	import { page } from '$app/state'
	import { listEditable } from '$lib/action/list/index.js'
	import { tip } from '$lib/action/tip.js'
	import { Popover } from '$lib/popover/index.js'
	import { param, urlParam } from '$lib/state/param.js'
	import { context } from '$lib/ui/table/context.js'
	import type { ItemBase, TableField } from '$lib/ui/table/index.js'
	import { jsonParse } from '$lib/utils/jsonParse.js'
	import type { ResolvedPathname } from '$app/types'

	let {
		fields,
		key,
		onCreateField
	}: {
		fields: TableField<Item>[]
		key: string
		onCreateField?: () => void
	} = $props()

	let { KEY_FIELDS_VISIBLE, KEY_FIELDS_HIDDEN, KEY_FIELDS_ORDER } = $derived(context.get(key))

	function getFieldHref(field: TableField<Item>) {
		if (field.locked) return '' as ResolvedPathname
		const url = toggleParam(field.visible ? KEY_FIELDS_HIDDEN : KEY_FIELDS_VISIBLE, field.key)
		if (url.searchParams.has(field.key)) {
			url.searchParams.delete(field.key)
			url.searchParams.delete('skip')
			url.searchParams.delete('take')
		}
		return (url.pathname + url.search) as ResolvedPathname
	}

	function toggleParam(paramKey: string, fieldKey: string): URL {
		const url = new URL(page.url)
		const fieldsKeys = jsonParse<string[]>(page.url.searchParams.get(paramKey), [])
		if (!fieldsKeys.includes(fieldKey)) fieldsKeys.push(fieldKey)
		else fieldsKeys.splice(fieldsKeys.indexOf(fieldKey), 1)

		if (fieldsKeys.length) url.searchParams.set(paramKey, JSON.stringify(fieldsKeys))
		else url.searchParams.delete(paramKey)

		return url
	}

	function handleReorder(newFieldsOrder: TableField<Item>[]) {
		fields = newFieldsOrder
		const fieldsOrder = fields.map((f) => f.key)
		const newUrl = urlParam.with({
			[KEY_FIELDS_ORDER]: JSON.stringify(fieldsOrder)
		})
		goto(newUrl, { replaceState: true, noScroll: true, keepFocus: true })
	}
</script>

<th class="sticky right-0 z-10 p-0 px-1" align="right">
	<Popover placement="bottom-end" class="px-0 py-1">
		{#snippet trigger(popover)}
			<button
				type="button"
				class="btn btn-square btn-ghost backdrop-blur btn-sm"
				use:tip={{ content: 'Dénfinir les champs' }}
				{...popover.trigger}
			>
				<EllipsisIcon />
			</button>
		{/snippet}

		{#snippet children(popover)}
			{#if onCreateField}
				<div class="bordered flex items-center gap-2 border-b pr-1 pb-1 pl-2">
					<span class=" font-semibold opacity-70">Champs</span>
					<button
						type="button"
						class="btn ml-auto btn-square btn-sm"
						onclick={() => {
							if (onCreateField) onCreateField()
							popover.hide()
						}}
					>
						<PlusIcon title="Ajouter un champ" />
					</button>
				</div>
			{/if}

			<div class="max-h-125 overflow-auto px-1 pt-1">
				<div
					use:listEditable={{
						items: fields,
						onChange: handleReorder,
						dragElementsSelector: '.drag-button'
					}}
				>
					{#each fields as field (field.key)}
						<a
							draggable="false"
							href={getFieldHref(field)}
							class="menu-item w-full"
							class:disabled={field.locked}
							data-sveltekit-keepfocus
							data-sveltekit-replacestate
							data-sveltekit-noscroll
						>
							{#if field.locked}
								<CheckIcon class="fill-base-content/50" size={21} />
							{:else if param.has(field.key)}
								<CircleCheckIcon class="fill-primary" size={21} />
							{:else if field._visible}
								<CheckIcon class="fill-success" size={21} />
							{:else}
								<CircleIcon class="fill-base-content/50" size={21} />
							{/if}

							<span>{field.label}</span>

							<span
								class="drag-button btn ml-auto btn-square btn-ghost btn-xs"
								onclick={(e) => e.preventDefault()}
								role="none"
							>
								<GripIcon size={18} class="fill-base-content/80" />
							</span>
						</a>
					{/each}
				</div>
			</div>
		{/snippet}
	</Popover>
</th>
