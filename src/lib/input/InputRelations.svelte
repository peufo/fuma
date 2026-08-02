<script lang="ts" generics="Item">
	import { CheckIcon, ChevronsUpDownIcon, SearchIcon, XIcon } from '@lucide/svelte'
	import type { RemoteFormField, RemoteQueryFunction } from '@sveltejs/kit'
	import type { Snippet } from 'svelte'
	import type { ClassValue } from 'svelte/elements'
	import { slide } from 'svelte/transition'
	import { tip } from '../action/tip.js'
	import { useCommand } from '../command/useCommand.svelte.js'
	import Loading from '../loading/Loading.svelte'
	import { type PopoverType, usePopover } from '../popover/usePopover.svelte.js'
	import Issues from './Issues.svelte'

	let {
		label,
		searchItems,
		getValue = defaultGetValue,
		selected = defaultSnippet,
		proposal = defaultSnippet,
		field,
		value = $bindable([]),
		placeholder = 'Selectionner des valeurs',
		class: klass,
		hint,
		append,
		onSelect,
		hotKey,
		variant = 'block'
	}: {
		searchItems: RemoteQueryFunction<{ search: string }, Item[]>
		label?: string
		getValue?: (item: NoInfer<Item>) => string
		selected?: Snippet<[Item]>
		proposal?: Snippet<[Item, { isSelected: boolean; isFocus: boolean }]>
		field?: RemoteFormField<string[]>
		value?: NoInfer<Item>[]
		placeholder?: string
		class?: ClassValue
		hint?: Snippet<[Item[]]>
		/** Rendu à droite du champ de recherche: une action « créer », typiquement. */
		append?: Snippet<[PopoverType]>
		onSelect?: (items: NoInfer<Item>[], popover: PopoverType) => void
		hotKey?: string
		variant?: 'floating' | 'block'
	} = $props()

	const inputId = $props.id()
	const listId = `${inputId}-list`

	let search = $state('')
	const query = $derived.by(() => searchItems({ search }))
	const items = $derived(query.current || [])

	// `value` porte les items et non les valeurs soumises: celles-ci s'en dérivent par
	// `getValue`, alors que l'inverse demanderait une requête. C'est aussi ce qui rend
	// l'état initial gratuit — pas de `defaultValue` à réconcilier avec le champ.
	const selectedValues = $derived(value.map(getValue))

	export const popover = usePopover({
		listenFocus: false,
		onShow: () => command.focusTrigger(),
		hotKey: (() => hotKey)()
	})
	// Un multi-select ne se referme pas à chaque choix: `popover.hide()` n'est appelé
	// que par le bouton de fermeture.
	export const command = useCommand({
		isEnable: () => popover.isOpen,
		onSelect: (index) => {
			const item = items[index]
			if (item) toggle(item)
		}
	})

	function toggle(item: Item) {
		const itemValue = getValue(item)
		value = selectedValues.includes(itemValue)
			? value.filter((selectedItem) => getValue(selectedItem) !== itemValue)
			: [...value, item]
		commit()
	}

	function remove(item: Item) {
		const itemValue = getValue(item)
		value = value.filter((selectedItem) => getValue(selectedItem) !== itemValue)
		commit()
	}

	function commit() {
		// Les cases cachées suffisent à soumettre; `set` garde la validation à jour.
		field?.set(selectedValues)
		onSelect?.(value, popover)
	}

	function defaultGetValue(item: Item): string {
		if (item && typeof item === 'object') {
			if ('id' in item && typeof item.id === 'string') return item.id
			if ('value' in item && typeof item.value === 'string') return item.value
		}
		return JSON.stringify(item)
	}

	function getDefaultLabel(item: Item) {
		if (item && typeof item === 'object' && 'label' in item) {
			if (typeof item.label === 'string') return item.label
		}
		return getValue(item)
	}
</script>

{#snippet defaultSnippet(item: Item)}
	<span>{getDefaultLabel(item)}</span>
{/snippet}

{#snippet triggerCombobox()}
	<!-- Un `div` et non un `button`: les puces portent leur propre bouton de retrait, et
	     un bouton ne peut pas en contenir un autre. -->
	<div
		id={inputId}
		role="combobox"
		aria-controls={listId}
		aria-expanded={popover.isOpen}
		aria-haspopup="listbox"
		tabindex="0"
		class={[
			'input h-auto min-h-10 w-full flex-wrap items-center gap-1 py-1.5',
			'not-disabled:cursor-pointer',
			field?.issues()?.length && 'input-error',
			klass
		]}
		onkeydown={(event) => {
			if (event.key !== 'Enter' && event.key !== ' ') return
			event.preventDefault()
			popover.show()
		}}
		{...popover.trigger}
	>
		{#if !value.length}
			<span class="opacity-60">{placeholder}</span>
		{:else}
			{#each value as item (getValue(item))}
				<span
					class="badge items-center gap-1 badge-sm"
					transition:slide={{ axis: 'x', duration: 150 }}
				>
					<!-- item.icon not rerender if not wrapped in #key -->
					{#key item}{@render selected(item)}{/key}
					<button
						type="button"
						class="btn btn-circle btn-ghost btn-xs"
						aria-label="Retirer"
						use:tip={{ content: 'Retirer' }}
						onclick={(event) => {
							// Sans quoi le clic remonte au combobox et rouvre le popover.
							event.stopPropagation()
							remove(item)
						}}
					>
						<XIcon size={12} />
					</button>
				</span>
			{/each}
		{/if}
		<ChevronsUpDownIcon class="ml-auto shrink-0" size={14} opacity={0.7} />
	</div>
{/snippet}

{#if field}
	<!-- Une case cochée par valeur: c'est ainsi qu'un champ `string[]` se soumet. Le
	     `checked` explicite prime sur celui de `as()`, qui lit `field.value()` — sans lui
	     la sélection initiale ne partirait pas tant que rien n'a été cliqué. -->
	{#each selectedValues as selectedValue (selectedValue)}
		<input {...field.as('checkbox', selectedValue)} checked class="hidden" />
	{/each}
{/if}

<div>
	{#if !label}
		{@render triggerCombobox()}
	{:else if variant === 'floating'}
		<label class="floating-label">
			<span>{label}</span>
			{@render triggerCombobox()}
		</label>
	{:else}
		<fieldset class="fieldset">
			<label class="label" for={inputId}>{label}</label>
			{@render triggerCombobox()}
		</fieldset>
	{/if}

	<div
		{...popover.content}
		class={['my-2 rounded-box border bg-base-100 shadow-xl']}
		style="min-width: anchor-size(width);"
		tabindex="-1"
	>
		<div class="sticky top-0 z-10 flex gap-2 bg-base-100/10 p-2 backdrop-blur-md">
			<label class="input grow input-ghost input-sm">
				<SearchIcon opacity={0.6} size={20} />
				<input
					type="search"
					placeholder="Recherche"
					autocomplete="off"
					bind:value={search}
					{...command.trigger}
				/>
			</label>
			{#if value.length}
				<button
					class="btn btn-square btn-soft btn-sm"
					type="button"
					onclick={() => {
						value = []
						commit()
						popover.hide()
					}}
					use:tip={{ content: 'Tout désélectionner' }}
				>
					<XIcon />
				</button>
			{/if}
			{@render append?.(popover)}
		</div>

		<ul
			id={listId}
			role="listbox"
			aria-multiselectable="true"
			class="menu max-h-80 w-full flex-nowrap pt-0"
		>
			{#each items as item, index (item)}
				{@const isSelected = selectedValues.includes(getValue(item))}
				{@const isFocus = index === command.focusIndex}
				<li>
					<button
						{...command.item(index, '')}
						class={[isSelected && 'border', isFocus && 'menu-focus', 'scroll-mt-13 scroll-mb-2']}
						type="button"
						tabindex="-1"
						role="option"
						aria-selected={isSelected}
					>
						{@render proposal(item, { isSelected, isFocus })}
						{#if proposal === defaultSnippet && isSelected}
							<CheckIcon class="ml-auto" size={18} />
						{/if}
					</button>
				</li>
			{/each}
		</ul>

		<Loading {query} />
	</div>
	<Issues {field} />
	{@render hint?.(value)}
</div>

<style>
	div[popover] {
		border-color: color-mix(in oklab, var(--color-base-content) 20%, #0000);
	}
</style>
