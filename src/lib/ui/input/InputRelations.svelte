<script lang="ts" generics="RelationItem extends {id: string | number}">
	import type { HTMLInputAttributes } from 'svelte/elements'

	import { tick, type Component, type Snippet } from 'svelte'
	import { slide } from 'svelte/transition'
	import { toast } from 'svelte-sonner'
	import { XIcon, type IconProps } from '@lucide/svelte'
	import debounce from 'debounce'

	import { USE_COERCE_JSON } from '$lib/utils/constant.js'
	import { FormControl, SelectorList } from '$lib/ui/input/index.js'
	import { DropDown } from '$lib/ui/menu/index.js'
	import RelationAfter from './RelationAfter.svelte'

	let {
		search,
		value: items = $bindable(null),
		key = '',
		label = '',
		class: klass = '',
		classList = '',
		createUrl = '',
		createTitle = '',
		CreateIcon,
		error = '',
		placeholder = '',
		flatMode = false,
		debounceMs = 150,
		input,
		snipItem,
		snipSuggestion,
		snipAppend,
		onInput
	}: {
		search: (q: string) => Promise<RelationItem[]>
		value?: RelationItem[] | null
		key?: string
		label?: string
		class?: string
		classList?: string
		createUrl?: string
		createTitle?: string
		CreateIcon?: Component<IconProps>
		error?: string
		placeholder?: string
		flatMode?: boolean
		debounceMs?: number
		input?: HTMLInputAttributes
		snipItem: Snippet<[RelationItem]>
		snipSuggestion?: Snippet<[RelationItem]>
		snipAppend?: Snippet
		onInput?: (value: RelationItem[]) => void
	} = $props()

	let proposedItems = $state<RelationItem[]>([])
	let isLoading = $state(false)
	let isError = $state(false)
	let focusIndex = $state(0)
	let searchValue = $state('')
	let dropdown = $state<DropDown>()
	let inputSearch = $state<HTMLInputElement>()

	async function onSelect(index = focusIndex) {
		const proposedItem = proposedItems[index]
		if (!proposedItem) return
		if (!items) items = [proposedItem]
		else items = [...items, proposedItem]
		dropdown?.hide()
		inputSearch?.select()
		proposedItems = [...proposedItems.slice(0, index), ...proposedItems.slice(index + 1)]
		onInput?.(items)
		await tick()
		setTimeout(() => dropdown?.show(), 200)
	}

	function remove(index: number) {
		if (!items?.length) return
		items = [...items.slice(0, index), ...items.slice(index + 1)]
	}

	async function searchItems(searchValue = '') {
		try {
			isLoading = true
			isError = false
			focusIndex = 0
			const res = await search(searchValue)
			const currentIds = items?.map(({ id }) => id) || []
			proposedItems = res.filter(({ id }) => !currentIds.includes(id))
		} catch (error) {
			toast.error('Erreur')
			isError = true
			console.error(error)
		} finally {
			isLoading = false
		}
	}

	const searchItemsDebounce = $derived(debounce(searchItems, debounceMs))

	function handleFocus() {
		searchItems()
	}
	async function handleBlur() {
		searchValue = ''
	}
</script>

<DropDown bind:this={dropdown} disable={flatMode}>
	{#snippet activator()}
		<FormControl {key} {label} {error} class={klass}>
			<div class="flex flex-col gap-2">
				{#if items && items.length}
					<div class="flex flex-wrap gap-2">
						{#each items || [] as item, index (item.id)}
							<div
								transition:slide|local={{ axis: 'x', duration: 200 }}
								class="badge badge-outline badge-lg items-center pr-0 text-right whitespace-nowrap"
							>
								{@render snipItem(item)}
								<div
									class="btn btn-circle btn-ghost btn-xs mr-0.5 ml-1 h-4.5 min-h-4.5 w-4.5"
									role="button"
									tabindex="0"
									onclick={() => remove(index)}
									onkeyup={(event) => event.key === 'Enter' && remove(index)}
								>
									<XIcon size={16} />
								</div>
							</div>
						{/each}
					</div>
				{/if}
				<div class="flex grow gap-2">
					<div class="input input-bordered flex grow items-center pr-2">
						<input
							type="text"
							id={key}
							bind:this={inputSearch}
							bind:value={searchValue}
							oninput={(e) => searchItemsDebounce(e.currentTarget.value)}
							onfocus={handleFocus}
							onblur={handleBlur}
							autocomplete="off"
							{placeholder}
							class="grow"
							size={8}
							{...input}
						/>

						<RelationAfter {isLoading} {createUrl} {createTitle} {CreateIcon} />
					</div>
					{@render snipAppend?.()}
				</div>
			</div>

			<input
				type="hidden"
				name={key}
				value="{USE_COERCE_JSON}{JSON.stringify(items?.map(({ id }) => ({ id })) || [])}"
			/>
		</FormControl>
	{/snippet}

	<SelectorList
		trigger={inputSearch}
		items={proposedItems}
		{isError}
		{isLoading}
		bind:focusIndex
		class="w-full min-w-40 {classList}"
		{onSelect}
	>
		{#snippet children({ index })}
			{#if snipSuggestion}
				{@render snipSuggestion(proposedItems[index])}
			{:else}
				{@render snipItem(proposedItems[index])}
			{/if}
		{/snippet}
	</SelectorList>
</DropDown>
