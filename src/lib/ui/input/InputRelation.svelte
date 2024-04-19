<script lang="ts">
	import { createEventDispatcher, tick } from 'svelte'
	import debounce from 'debounce'
	import { toast } from 'svelte-sonner'
	import { mdiClose } from '@mdi/js'
	import type { Props as TippyProps } from 'tippy.js'

	import { FormControl, DropDown, Icon, SelectorList } from '$lib/ui/index.js'
	import RelationAfter from './RelationAfter.svelte'

	type RelationItem = $$Generic<{ id: string }>

	export let key = ''
	export let label = ''
	export let search: (q: string) => Promise<RelationItem[]>
	export let createUrl = ''
	export let createTitle = ''
	export let item: RelationItem | null = null
	export let error = ''
	export let placeholder = ''
	export let tippyProps: Partial<TippyProps> = {}
	export let flatMode = false

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

<DropDown {tippyProps} disable={flatMode}>
	<div class="contents" slot="activator">
		<FormControl {key} {label} {error} class={klass} let:key>
			<div class="flex grow gap-2" class:hidden={item}>
				<div class="relative flex grow items-center gap-2">
					<input
						type="text"
						id={key}
						name={key}
						bind:this={inputElement}
						bind:value={searchValue}
						on:input={(e) => searchItemsDebounce(e.currentTarget.value)}
						on:focus={handleFocus}
						on:blur={handleBlur}
						autocomplete="off"
						{placeholder}
						class="input input-bordered grow"
					/>

					<RelationAfter {isLoading} {createUrl} {createTitle} />
				</div>
				<slot name="append" />
			</div>

			{#if item}
				<div class="flex h-12 items-center gap-2 rounded-lg border pl-4 pr-2">
					<div class="grow">
						<slot name="item" {item}>
							{item.id}
						</slot>
					</div>
					<button type="button" on:click={() => clear()} class="btn btn-square btn-sm">
						<Icon path={mdiClose} />
					</button>
				</div>
				<input type="hidden" name={key} value={item.id} />
			{/if}
		</FormControl>
	</div>

	<SelectorList
		items={proposedItems}
		trigger={inputElement}
		{isError}
		{isLoading}
		{focusIndex}
		let:index
		class="w-full {classList}"
		on:select={({ detail }) => select(detail)}
	>
		<slot name="listItem" item={proposedItems[index]}>
			{proposedItems[index].id}
		</slot>
	</SelectorList>
</DropDown>
