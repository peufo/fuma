<script lang="ts" generics="RelationItem extends {id: string | number}">
	import { createEventDispatcher, tick, type ComponentProps, type Snippet } from 'svelte'
	import type { HTMLInputAttributes } from 'svelte/elements'
	import debounce from 'debounce'
	import { toast } from 'svelte-sonner'
	import { mdiClose } from '@mdi/js'

	import { USE_COERCE_JSON } from '$lib/utils/constant.js'
	import { Icon } from '$lib/ui/icon/index.js'
	import { DropDown } from '$lib/ui/menu/index.js'
	import { FormControl, SelectorList } from '$lib/ui/input/index.js'
	import type { TippyProps } from '$lib/utils/tippy.js'
	import RelationAfter from './RelationAfter.svelte'

	export let key = Math.random().toString()
	export let label = ''
	export let search: (q: string) => Promise<RelationItem[]>
	export let createUrl = ''
	export let createTitle = 'Nouveau'
	export let createIcon: string | undefined = undefined
	let item: RelationItem | null = null
	export { item as value }
	export let error = ''
	export let placeholder = ''
	export let tippyProps: Partial<TippyProps> = {}
	export let dropdownProps: ComponentProps<DropDown> = {}
	export let flatMode = false
	export let snippetSelected: Snippet<[RelationItem]> | undefined = undefined
	export let slotItem: Snippet<[RelationItem]>
	export let slotSuggestion: Snippet<[RelationItem]> = slotItem
	export let input: HTMLInputAttributes | undefined = undefined
	export let append: Snippet | undefined = undefined

	let klass = ''
	export { klass as class }
	export let classList = ''

	let inputElement: HTMLInputElement

	let proposedItems: RelationItem[] = []

	let isLoading = false
	let isError = false
	let focusIndex = 0
	let searchValue = ''

	const dispatch = createEventDispatcher<{ input: { value: RelationItem } }>()

	export async function clear() {
		searchValue = ''
		item = null
		await tick()
		inputElement.focus()
	}

	async function select(index = focusIndex) {
		item = proposedItems[index]
		dispatch('input', { value: item })
	}

	async function searchItems(searchValue = '') {
		try {
			isLoading = true
			isError = false
			focusIndex = 0
			proposedItems = await search(searchValue)
		} catch (error) {
			toast.error('Erreur')
			isError = true
			console.error(error)
		} finally {
			isLoading = false
		}
	}

	const searchItemsDebounce = debounce(searchItems, 150)

	function handleFocus() {
		searchItems()
	}
	async function handleBlur() {
		searchValue = ''
	}
</script>

<DropDown {tippyProps} disable={flatMode} {...dropdownProps}>
	<div class="contents" slot="activator">
		<FormControl {key} {label} {error} class={klass}>
			{#snippet children({ key })}
				<div class="flex grow gap-2" class:hidden={item}>
					<div class="input input-bordered flex grow items-center pr-2">
						<input
							type="text"
							id={key}
							bind:this={inputElement}
							bind:value={searchValue}
							on:input={(e) => searchItemsDebounce(e.currentTarget.value)}
							on:focus={handleFocus}
							on:blur={handleBlur}
							autocomplete="off"
							{placeholder}
							class="grow"
							size={8}
							{...input}
						/>
						<RelationAfter {isLoading} {createUrl} {createTitle} {createIcon} />
					</div>
					{@render append?.()}
				</div>

				{#if item}
					{#if snippetSelected}
						{@render snippetSelected(item)}
					{:else}
						<div class="flex h-12 items-center gap-2 rounded-lg border bg-base-100 pl-4 pr-2">
							<div class="grow">
								{@render slotItem(item)}
							</div>
							<button
								type="button"
								on:click|stopPropagation={() => clear()}
								class="btn btn-square btn-sm"
							>
								<Icon path={mdiClose} />
							</button>
						</div>
					{/if}
					<input
						type="hidden"
						name={key}
						value="{USE_COERCE_JSON}{JSON.stringify({ id: item.id })}"
					/>
				{/if}
			{/snippet}
		</FormControl>
	</div>

	<SelectorList
		items={proposedItems}
		trigger={inputElement}
		{isError}
		{isLoading}
		{focusIndex}
		let:index
		class="w-full min-w-40 {classList}"
		on:select={({ detail }) => select(detail)}
	>
		{@render slotSuggestion(proposedItems[index])}
	</SelectorList>
</DropDown>
