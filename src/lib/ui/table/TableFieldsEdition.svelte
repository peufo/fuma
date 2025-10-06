<script lang="ts" generics="Item extends ItemBase">
	import {
		mdiCheck,
		mdiCheckCircleOutline,
		mdiCircleSmall,
		mdiDotsHorizontal,
		mdiDrag,
		mdiPlus
	} from '@mdi/js'
	import type { TippyInstance } from '$lib/utils/tippy.js'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { urlParam } from '$lib/store/param.js'
	import { listEditable } from '$lib/action/list/index.js'
	import { jsonParse } from '$lib/utils/jsonParse.js'
	import { context } from '$lib/ui/table/context.js'
	import { Icon } from '$lib/ui/icon/index.js'
	import { DropDown } from '$lib/ui/menu/index.js'
	import type { ItemBase, TableField } from '$lib/ui/table/index.js'

	export let fields: TableField<Item>[]
	export let key: string
	export let onCreateField: (() => void) | undefined = undefined

	let tip: TippyInstance

	const { KEY_FIELDS_VISIBLE, KEY_FIELDS_HIDDEN, KEY_FIELDS_ORDER } = context.get(key)

	function getFieldHref(field: TableField<Item>) {
		if (field.locked) return
		const url = toggleParam(field.visible ? KEY_FIELDS_HIDDEN : KEY_FIELDS_VISIBLE, field.key)
		if (url.searchParams.has(field.key)) {
			url.searchParams.delete(field.key)
			url.searchParams.delete('skip')
			url.searchParams.delete('take')
		}
		return url.pathname + url.search
	}

	function toggleParam(paramKey: string, fieldKey: string): URL {
		const url = new URL($page.url)
		const fieldsKeys = jsonParse<string[]>($page.url.searchParams.get(paramKey), [])
		if (!fieldsKeys.includes(fieldKey)) fieldsKeys.push(fieldKey)
		else fieldsKeys.splice(fieldsKeys.indexOf(fieldKey), 1)

		if (fieldsKeys.length) url.searchParams.set(paramKey, JSON.stringify(fieldsKeys))
		else url.searchParams.delete(paramKey)

		return url
	}

	function handleReorder(newFieldsOrder: TableField<Item>[]) {
		fields = newFieldsOrder
		const fieldsOrder = fields.map((f) => f.key)
		const newUrl = $urlParam.with({ [KEY_FIELDS_ORDER]: JSON.stringify(fieldsOrder) })
		goto(newUrl, { replaceState: true, noScroll: true, keepFocus: true })
	}
</script>

<th class="sticky right-0 z-10 p-0 px-1" align="right">
	<DropDown
		bind:tip
		hideOnNav={false}
		class="max-h-none px-0"
		tippyProps={{ appendTo: () => document.body, placement: 'bottom-end' }}
	>
		<button slot="activator" type="button" class="btn btn-square btn-ghost btn-sm backdrop-blur">
			<Icon path={mdiDotsHorizontal} title="Définir les champs" />
		</button>

		{#if onCreateField}
			<div class="bordered flex items-center gap-2 border-b pr-1 pb-1 pl-2">
				<span class=" font-semibold opacity-70">Champs</span>
				<button
					type="button"
					class="btn btn-square btn-sm ml-auto"
					on:click={() => {
						if (onCreateField) onCreateField()
						tip.hide()
					}}
				>
					<Icon path={mdiPlus} title="Ajouter un champ" />
				</button>
			</div>
		{/if}

		<div class="max-h-[500px] overflow-auto px-1 pt-1">
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
							<Icon path={mdiCheck} class="fill-base-content/50" size={21} />
						{:else if $urlParam.has(field.key)}
							<Icon path={mdiCheckCircleOutline} class="fill-primary" size={21} />
						{:else if field._visible}
							<Icon path={mdiCheck} class="fill-success" size={21} />
						{:else}
							<Icon path={mdiCircleSmall} class="fill-base-content/50" size={21} />
						{/if}

						<span>{field.label}</span>

						<span
							class="drag-button btn btn-square btn-ghost btn-xs ml-auto"
							on:click|preventDefault
							role="none"
						>
							<Icon path={mdiDrag} size={18} class="fill-base-content/80" />
						</span>
					</a>
				{/each}
			</div>
		</div>
	</DropDown>
</th>
