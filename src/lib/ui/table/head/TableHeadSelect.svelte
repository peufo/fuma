<script lang="ts" generics="Item extends ItemBase">
	import { ListFilterIcon } from '@lucide/svelte'
	import { page } from '$app/state'
	import { Popover } from '$lib/popover/index.js'
	import { param, urlParam } from '$lib/state/param.js'
	import type { ItemBase, TableField } from '$lib/ui/table/index.js'
	import { jsonParse } from '$lib/utils/jsonParse.js'
	import { type Options, parseOptions } from '$lib/utils/options.js'

	let {
		field,
		options: propOptions,
		multiSelect = false,
		placeholder = 'No option'
	}: {
		field: TableField<Item>
		options: Options
		multiSelect?: boolean
		placeholder?: string
	} = $props()

	let options = $derived.by(() => {
		const selection = page.url.searchParams.get(field.key)
		const selections = jsonParse<string[]>(page.url.searchParams.get(field.key), [])

		function getActive(value: string) {
			if (!multiSelect) return selection === value
			return selections.includes(value)
		}

		return parseOptions(propOptions).map((option) => ({
			...option,
			isActive: getActive(option.value)
		}))
	})

	let optionsActive = $derived(options.filter((option) => option.isActive))

	const getHref = $derived((value: string) => {
		const selections = jsonParse<string[]>(param.get(field.key), [])
		if (!multiSelect) return urlParam.toggle({ [field.key]: value }, 'skip', 'take')
		if (selections.includes(value)) {
			const newSelections = selections.filter((v) => v !== value)
			if (!newSelections.length) return urlParam.without(field.key)
			return urlParam.with({ [field.key]: JSON.stringify(newSelections) }, 'skip', 'take')
		}
		return urlParam.with({ [field.key]: JSON.stringify([...selections, value]) }, 'skip', 'take')
	})
</script>

<th class="p-1">
	<Popover class="p-1">
		{#snippet trigger(popover)}
			<button class="menu-item min-h-8 w-full flex-wrap gap-y-1" {...popover.trigger}>
				<div class="flex items-center gap-2">
					{field.label}
					{#if !optionsActive.length}
						<ListFilterIcon size={15} class="opacity-50" />
					{/if}
				</div>

				{#if optionsActive.length}
					<div class="flex flex-wrap gap-1">
						{#each optionsActive as option (option.value)}
							<span class="badge badge-xs text-[0.7rem] font-normal text-white badge-primary">
								{#if option.icon}
									<option.icon size={10} class="-translate-x-1 text-white/80" />
								{/if}
								{option.label}
							</span>
						{/each}
					</div>
				{/if}
			</button>
		{/snippet}

		{#snippet children(popover)}
			<div class="flex flex-col gap-1">
				{#each options as { isActive, icon: Icon, label, value } (value)}
					<a
						href={getHref(value)}
						class="menu-item px-3 py-2"
						class:active={isActive}
						data-sveltekit-noscroll
						data-sveltekit-replacestate
						onclick={multiSelect ? undefined : popover.hide}
					>
						{#if Icon}
							<Icon size={18} class="opacity-60" />
						{/if}
						<span class="font-normal whitespace-nowrap">{label}</span>
					</a>
				{:else}
					<div class="menu-item disabled px-10">
						<span class="opacity-40">{placeholder}</span>
					</div>
				{/each}
			</div>
		{/snippet}
	</Popover>
</th>
