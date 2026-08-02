<script lang="ts" generics="Item">
	import { ChevronsUpDownIcon } from '@lucide/svelte'
	import type { RemoteFormField } from '@sveltejs/kit'
	import type { Snippet } from 'svelte'
	import type { ClassValue } from 'svelte/elements'
	import { useCommand } from '../command/useCommand.svelte.js'
	import { usePopover } from '../popover/usePopover.svelte.js'
	import Issues from './Issues.svelte'

	let {
		label,
		items,
		getValue,
		selected,
		proposal,
		field,
		value = $bindable(),
		placeholder = 'Selectionner une valeur',
		class: klass,
		onSelect,
		variant = 'block'
	}: {
		label?: string
		items: Item[]
		getValue: (item: Item) => string
		selected?: Snippet<[Item]>
		proposal?: Snippet<[Item, { isSelected: boolean; isFocus: boolean }]>
		field?: RemoteFormField<string>
		value?: string
		placeholder?: string
		class?: ClassValue
		onSelect?: (item: NoInfer<Item>) => void
		variant?: 'floating' | 'block'
	} = $props()

	const inputId = $props.id()

	let selectedItem = $state<Item | undefined>(undefined)
	const selectedValue = $derived(selectedItem && getValue(selectedItem))

	$effect(() => {
		const targetValue = field?.value() ?? value
		selectedItem = items.find((item) => getValue(item) === targetValue)
	})

	const popover = usePopover({ listenFocus: false })
	const command = useCommand({
		isEnable: () => popover.isOpen,
		onSelect: (index) => {
			popover.hide()
			const item = items[index]
			if (!item) return
			selectedItem = item
			if (field) {
				field.set(getValue(item))
			} else {
				value = getValue(item)
			}
			onSelect?.(item)
		}
	})

	// Même heuristique que `InputRelation`: un item porteur d'un `label` s'affiche par
	// celui-ci, ce qui rend les `Options` lisibles sans snippet.
	function getDefaultLabel(item: Item) {
		if (item && typeof item === 'object' && 'label' in item) {
			if (typeof item.label === 'string') return item.label
		}
		return getValue(item)
	}
</script>

<!-- `field.value()` est vide tant que rien n'a été choisi: sans le repli sur `value`, une
     sélection initiale ne serait jamais soumise. -->
{#if field && selectedValue !== undefined}
	<input {...field.as('hidden', selectedValue)} />
{/if}

{#snippet triggerButton()}
	<button
		id={inputId}
		type="button"
		class={['input w-full', field?.issues()?.length && 'input-error', klass]}
		{...popover.trigger}
		{...command.trigger}
	>
		<div class="grow text-left">
			{#if !selectedItem}
				<span class="opacity-60">{placeholder}</span>
			{:else if selected}
				<!-- item.icon not rerender if not wrapped in #key -->
				{#key selectedItem}{@render selected(selectedItem)}{/key}
			{:else}
				{getDefaultLabel(selectedItem)}
			{/if}
		</div>
		<ChevronsUpDownIcon size={14} />
	</button>
{/snippet}

<div>
	{#if !label}
		{@render triggerButton()}
	{:else if variant === 'floating'}
		<label class="floating-label">
			<span>{label}</span>
			{@render triggerButton()}
		</label>
	{:else}
		<fieldset class="fieldset">
			<label class="label" for={inputId}>{label}</label>
			{@render triggerButton()}
		</fieldset>
	{/if}

	<div
		{...popover.content}
		class={['my-2 rounded-box border bg-base-100 shadow-xl']}
		style="width: anchor-size(width);"
		tabindex="-1"
	>
		<ul class="menu max-h-80 w-full flex-nowrap">
			{#each items as item, index (item)}
				<!-- Comparer à la valeur et non à `command.selectedIndex`, qui reste à -1 tant que
				     rien n'a été cliqué: la valeur initiale doit apparaître comme sélectionnée. -->
				{@const isSelected = getValue(item) === selectedValue}
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
							{getDefaultLabel(item)}
						{/if}
					</button>
				</li>
			{/each}
		</ul>
	</div>
	<Issues {field} />
</div>

<style>
	div[popover] {
		border-color: color-mix(in oklab, var(--color-base-content) 20%, #0000);
	}
</style>
