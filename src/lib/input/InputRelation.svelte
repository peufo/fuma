<script lang="ts" generics="Item">
	import { ChevronsUpDownIcon, GhostIcon, SearchIcon, LoaderCircleIcon } from '@lucide/svelte'
	import type { RemoteFormField, RemoteQueryFunction } from '@sveltejs/kit'
	import type { Snippet } from 'svelte'
	import { useCommand } from '../command/command.svelte.ts'
	import { usePopover, type PopoverType } from '../popover/popover.svelte.ts'
	import Issues from './Issues.svelte'
	import { fade } from 'svelte/transition'

	let {
		label,
		searchItems,
		getValue,
		selected,
		proposal,
		field,
		value = $bindable(),
		onSelect,
		hotKey
	}: {
		label: string
		searchItems: RemoteQueryFunction<{ search: string }, Item[]>
		getValue: (item: NoInfer<Item>) => string
		selected?: Snippet<[Item]>
		proposal?: Snippet<[Item, { isSelected: boolean; isFocus: boolean }]>
		field?: RemoteFormField<string>
		value?: string
		onSelect?: (item: NoInfer<Item> | undefined, popover: PopoverType) => void
		hotKey?: string
	} = $props()

	let search = $state('')
	const items = $derived.by(() => searchItems({ search }))

	let selectedItem = $state<Item | undefined>(undefined)

	export const popover = usePopover({
		listenFocus: false,
		onShow: () => command.focusTrigger(),
		hotKey: (() => hotKey)()
	})
	export const command = useCommand({
		isEnable: () => popover.isOpen,
		onSelect: (index) => {
			popover.hide()
			const item = items.current?.[index]
			onSelect?.(item, popover)
			if (!item) return
			selectedItem = item
			if (field) {
				field.set(getValue(item))
			} else {
				value = getValue(item)
			}
		}
	})
</script>

{#if field?.value() !== undefined}
	<input {...field.as('hidden', field.value() as string)} />
{/if}

<div>
	<label class="floating-label">
		<span>{label}</span>
		<button
			class={['input', field?.issues.length && 'input-error']}
			{...popover.trigger}
			type="button"
		>
			<div class="grow text-left">
				{#if !selectedItem}
					<span class="opacity-60">Select a value</span>
				{:else if selected}
					<!-- item.icon not rerender if not wrapped in #key -->
					{#key selectedItem}{@render selected(selectedItem)}{/key}
				{:else}
					{getValue(selectedItem)}
				{/if}
			</div>
			<ChevronsUpDownIcon size={14} />
		</button>
	</label>

	<div
		{...popover.content}
		class={['my-2 rounded-box border bg-base-100 shadow-xl']}
		style="min-width: anchor-size(width);"
		tabindex="-1"
	>
		<div class="sticky top-0 z-10 input-sm bg-base-100 p-2">
			<label class="input input-sm input-ghost">
				<SearchIcon size={16} opacity={0.7} />
				<input type="search" {...command.trigger} class="focus:ring-0" bind:value={search} />
			</label>
		</div>

		<ul class="menu max-h-80 w-full flex-nowrap pt-0">
			{#each items.current as item, index (item)}
				{@const isSelected = index === command.selectedIndex}
				{@const isFocus = index === command.focusIndex}
				<li>
					<button
						{...command.item(index, '')}
						class={[isFocus && 'menu-focus', 'scroll-mt-13 scroll-mb-2']}
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
		</ul>

		{#if items.loading}
			<div class="grid h-12 place-content-center" in:fade={{ duration: 200 }}>
				<LoaderCircleIcon class="animate-spin" opacity={0.7} />
			</div>
		{:else if !items.current?.length}
			<div
				class={[
					'm-2 mt-0 flex flex-col items-center gap-1 rounded p-2',
					'border border-dashed border-base-content/50 opacity-70'
				]}
				in:fade={{ duration: 200 }}
			>
				<GhostIcon size={18} />
				<span class="text-sm">No results</span>
			</div>
		{/if}
	</div>
	<Issues {field} />
</div>

<style>
	div[popover] {
		border-color: color-mix(in oklab, var(--color-base-content) 20%, #0000);
	}
</style>
