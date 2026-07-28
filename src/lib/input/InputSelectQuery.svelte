<script lang="ts" generics="Item">
	import { ChevronsUpDownIcon, SearchIcon, XIcon } from '@lucide/svelte'
	import type { Snippet } from 'svelte'
	import type { RemoteFormField, RemoteQuery } from '@sveltejs/kit'
	import { useCommand } from '../command/command.svelte.ts'
	import { usePopover } from '../popover/popover.svelte.ts'
	import Loading from '../loading/Loading.svelte'
	import Issues from './Issues.svelte'
	import type { ClassValue } from 'svelte/elements'
	import { tip } from '../action/tip.ts'

	let {
		query,
		label,
		getValue = defaultGetValue,
		selected = defaultSnippet,
		proposal = defaultSnippet,
		field,
		value = $bindable(),
		placeholder = 'Selectionner une valeur',
		class: klass,
		nullable,
		onInput,
		hint
	}: {
		query: RemoteQuery<Item[]>
		label?: string
		getValue?: (item: NoInfer<Item>) => string
		selected?: Snippet<[Item]>
		proposal?: Snippet<[Item, { isSelected: boolean; isFocus: boolean }]>
		field?: RemoteFormField<string>
		value?: string
		placeholder?: string
		class?: ClassValue
		nullable?: boolean
		onInput?: (item: Item | undefined) => void
		hint?: Snippet<[Item | undefined]>
	} = $props()

	let search = $state('')

	let selectedItem = $state<Item | undefined>(undefined)
	const items = $derived(query.current || [])
	$effect(() => {
		const targetValue = (field?.value() ?? value)?.toString()
		if (!targetValue) {
			selectedItem = undefined
			command.selectedIndex = -1
			return
		}
		// TODO: Quelle est la meilleur facon de récupérer l'item initial ?
		// const allItems = [...(initialQuery.data || []), ...items]
		// const found = allItems.find((item) => getValue(item) === targetValue)
		// if (found) {
		// 	selectedItem = found
		// 	onInit?.(found)
		// }
		command.selectedIndex = items.findIndex((item) => getValue(item) === targetValue)
	})

	const popover = usePopover({
		listenFocus: false,
		onShow: () => command.focusTrigger()
	})
	const command = useCommand({
		isEnable: () => popover.isOpen,
		onSelect: (index) => {
			popover.hide()
			const item = items[index]
			if (!item) return
			selectedItem = item
			setValue(item)
		}
	})

	function setValue(item: Item | undefined) {
		const newValue = item && getValue(item)
		if (field) {
			field.set(newValue)
		} else {
			value = newValue
		}
		onInput?.(item)
	}

	function defaultGetValue(item: Item): string {
		if (item && typeof item === 'object') {
			if ('value' in item && typeof item.value === 'string') return item.value
			if ('rowid' in item && typeof item.rowid === 'string') return item.rowid
		}
		return JSON.stringify(item)
	}

	function getDefaultLabel(item: Item) {
		if (item && typeof item === 'object' && 'label' in item) {
			if (typeof item.label === 'string') return item.label
		}
		return getValue(item)
	}

	const isButtonSetNullVisible = $derived(nullable && (field?.value() || value))
</script>

{#snippet defaultSnippet(item: Item)}
	<span>{getDefaultLabel(item)}</span>
{/snippet}

{#snippet triggerButton()}
	<button
		type="button"
		class={['input', field?.issues.length && 'input-error', klass]}
		{...popover.trigger}
	>
		<div class="grow text-left">
			{#if !selectedItem}
				<span class="opacity-60">{placeholder}</span>
			{:else if selected}
				<!-- item.icon not rerender if not wrapped in #key -->
				{#key selectedItem}{@render selected(selectedItem)}{/key}
			{:else}
				{getValue(selectedItem)}
			{/if}
		</div>
		<ChevronsUpDownIcon size={14} opacity={0.7} />
	</button>
{/snippet}

{#if field}
	<input {...field.as('hidden', field.value() || '')} />
{/if}

<div>
	{#if label}
		<label class="floating-label">
			<span>{label}</span>
			{@render triggerButton()}
		</label>
	{:else}
		{@render triggerButton()}
	{/if}

	<div
		{...popover.content}
		class={['my-2 rounded-box border bg-base-100 shadow-xl', ' scroll-pt-10']}
		style="width: anchor-size(width);"
		tabindex="-1"
	>
		<div class="sticky top-0 z-10 flex gap-2 bg-base-100/10 p-2 backdrop-blur-md">
			<label class={['input input-sm grow input-ghost']}>
				<SearchIcon opacity={0.6} size={20} />
				<input
					type="search"
					placeholder="Recherche"
					autocomplete="off"
					bind:value={search}
					{...command.trigger}
				/>
			</label>
			{#if isButtonSetNullVisible}
				<button
					class="btn btn-square btn-soft btn-sm"
					type="button"
					onclick={() => {
						setValue(undefined)
						popover.hide()
					}}
					use:tip={{ content: 'Pas de sélection' }}
				>
					<XIcon />
				</button>
			{/if}
		</div>

		<ul class="menu max-h-80 w-full flex-nowrap">
			{#each items as item, index (item)}
				{@const isSelected = index === command.selectedIndex}
				{@const isFocus = index === command.focusIndex}
				<li>
					<button
						{...command.item(index)}
						class={[isSelected && 'border', isFocus && 'menu-focus']}
						type="button"
						tabindex="-1"
						role="option"
					>
						{#if proposal}
							{@render proposal(item, { isSelected, isFocus })}
						{:else}
							{getValue(item)}
						{/if}
					</button>
				</li>
			{/each}

			<Loading {query} />
		</ul>
	</div>
	<Issues {field} />
	{@render hint?.(selectedItem)}
</div>

<style>
	div[popover] {
		border-color: color-mix(in oklab, var(--color-base-content) 20%, #0000);
	}
</style>
