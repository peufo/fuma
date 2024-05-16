<script lang="ts">
	import { derived } from 'svelte/store'
	import { page } from '$app/stores'

	import { jsonParse } from '$lib/utils/jsonParse.js'
	import type { TableField } from '$lib/ui/table/index.js'
	import { DropDown } from '$lib/ui/menu/index.js'
	import { Icon } from '$lib/ui/icon/index.js'
	import { type Options, parseOptions } from '$lib/utils/options.js'
	import { urlParam } from '$lib/store/param.js'
	import { mdiOrderBoolAscendingVariant } from '@mdi/js'

	export let field: TableField
	export let options: Options
	export let multiSelect = false
	export let placeholder = 'No option'

	let _options = initOptions($page.url)
	page.subscribe(({ url }) => (_options = initOptions(url)))

	$: optionsActive = _options.filter((option) => option.isActive)

	function initOptions({ searchParams }: URL) {
		const selection = searchParams.get(field.key)
		const selections = jsonParse<string[]>(searchParams.get(field.key), [])

		function getActive(value: string) {
			if (!multiSelect) return selection === value
			return selections.includes(value)
		}

		return parseOptions(options).map((option) => ({
			...option,
			isActive: getActive(option.value)
		}))
	}

	const getHref = derived(urlParam, (params) => (value: string) => {
		const selections = jsonParse<string[]>(params.get(field.key), [])
		if (!multiSelect) return params.toggle({ [field.key]: value }, 'skip', 'take')
		if (selections.includes(value)) {
			const newSelections = selections.filter((v) => v !== value)
			if (!newSelections.length) return params.without(field.key)
			return params.with({ [field.key]: JSON.stringify(newSelections) }, 'skip', 'take')
		}
		return params.with({ [field.key]: JSON.stringify([...selections, value]) }, 'skip', 'take')
	})
</script>

<th class="p-1">
	<DropDown hideOnBlur hideOnNav={!multiSelect} tippyProps={{ appendTo: () => document.body }}>
		<button slot="activator" class="menu-item min-h-8 w-full flex-wrap gap-y-1">
			<div class="flex gap-2">
				{field.label}
				{#if !optionsActive.length}
					<Icon path={mdiOrderBoolAscendingVariant} size={15} class="opacity-50" />
				{/if}
			</div>

			{#if optionsActive.length}
				<div class="flex flex-wrap gap-1">
					{#each optionsActive as option}
						<span class="badge badge-primary badge-xs text-[0.7rem] font-normal text-white">
							{#if option.icon}
								<Icon path={option.icon} size={10} class="-translate-x-1 fill-white/80" />
							{/if}
							{option.label}
						</span>
					{/each}
				</div>
			{/if}
		</button>

		<div class="flex flex-col gap-1">
			{#each _options as { isActive, icon, label, value }}
				<a
					href={$getHref(value)}
					class="menu-item px-3 py-2"
					class:active={isActive}
					data-sveltekit-noscroll
					data-sveltekit-replacestate
				>
					{#if icon}
						<Icon path={icon} size={18} class="opacity-60" />
					{/if}
					<span class="whitespace-nowrap font-normal">{label}</span>
				</a>
			{:else}
				<div class="menu-item disabled px-10">
					<span class="opacity-40">{placeholder}</span>
				</div>
			{/each}
		</div>
	</DropDown>
</th>
