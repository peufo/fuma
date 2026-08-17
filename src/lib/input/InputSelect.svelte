<script lang="ts" generics="Item">
	import { ChevronsUpDownIcon, SearchIcon, XIcon } from '@lucide/svelte'
	import type { RemoteFormField } from '@sveltejs/kit'
	import type { Snippet } from 'svelte'
	import type { ClassValue, HTMLLiAttributes } from 'svelte/elements'
	import { tip } from '../action/tip.js'
	import { useCommand } from '../command/useCommand.svelte.js'
	import Loading from '../loading/Loading.svelte'
	import { type PopoverType, usePopover } from '../popover/usePopover.svelte.js'
	import Issues from './Issues.svelte'
	import {
		defaultGetLabel,
		defaultGetValue,
		type ItemsSource,
		useItems
	} from './useItems.svelte.js'

	let {
		label,
		items,
		getValue = defaultGetValue,
		getLabel = (item) => defaultGetLabel(item, getValue),
		filter,
		searchable,
		debounceMs,
		selected = defaultSnippet,
		proposal = defaultSnippet,
		field,
		value = $bindable(),
		placeholder = 'Selectionner une valeur',
		class: klass,
		nullable,
		hint,
		append,
		header,
		proposalAppend,
		onSelect,
		hotKey,
		variant = 'block',
		propsLi
	}: {
		/** Un tableau déjà chargé, une fonction (synchrone ou non), ou une remote query. */
		items: ItemsSource<Item>
		label?: string
		getValue?: (item: NoInfer<Item>) => string
		/** Libellé affiché à défaut de snippet, et base du filtre d'une source tableau. */
		getLabel?: (item: NoInfer<Item>) => string
		/** Ne s'applique qu'à une source tableau: une fonction porte son propre filtre. */
		filter?: (item: NoInfer<Item>, search: string) => boolean
		/** Par défaut: toujours pour une fonction, au-delà de 7 entrées pour un tableau. */
		searchable?: boolean
		debounceMs?: number
		selected?: Snippet<[Item]>
		proposal?: Snippet<[Item, { popover: PopoverType; isSelected: boolean; isFocus: boolean }]>
		proposalAppend?: Snippet<
			[Item, { popover: PopoverType; isSelected: boolean; isFocus: boolean }]
		>
		field?: RemoteFormField<string>
		/**
		 * L'item, pas sa valeur soumise. Un parent qui le repilote après coup — remise à
		 * zéro, changement de jeu d'options — doit le lier par `bind:`: passé en simple
		 * prop, un `$bindable` cesse de suivre le parent dès que le composant y a écrit.
		 */
		value?: NoInfer<Item>
		placeholder?: string
		class?: ClassValue
		nullable?: boolean
		hint?: Snippet<[Item | undefined]>
		/** Rendu à droite du champ de recherche: une action « créer », typiquement. */
		append?: Snippet<[PopoverType]>
		header?: Snippet<[PopoverType]>
		onSelect?: (item: NoInfer<Item> | undefined, popover: PopoverType) => void
		hotKey?: string
		variant?: 'floating' | 'block'
		propsLi?: HTMLLiAttributes
	} = $props()

	const inputId = $props.id()

	let search = $state('')
	// Une énumération courte n'a que faire d'un champ de recherche; une fonction, elle, ne
	// peut pas s'en passer, puisque le composant ne sait pas la filtrer.
	const isSearchable = $derived(searchable ?? (Array.isArray(items) ? items.length > 7 : true))
	const query = useItems({
		source: () => items,
		search: () => search,
		getLabel: (item) => getLabel(item),
		filter: () => filter,
		debounceMs: (() => debounceMs)()
	})
	const options = $derived(query.current ?? [])

	// `value` porte l'item et non sa valeur soumise: celle-ci s'en dérive par `getValue`,
	// alors que l'inverse demanderait une requête. C'est aussi ce qui rend l'état initial
	// gratuit — pas de `defaultValue` à réconcilier avec la valeur du champ.
	const submittedValue = $derived(value ? getValue(value) : undefined)

	export const popover = usePopover({
		listenFocus: false,
		listenFocusout: true,
		onShow: () => command.focusTrigger(),
		hotKey: (() => hotKey)()
	})
	export const command = useCommand({
		isEnable: () => popover.isOpen,
		onSelect: (index) => {
			popover.hide()
			const item = options[index]
			onSelect?.(item, popover)
			if (!item) return
			setValue(item)
		}
	})

	function setValue(item: Item | undefined) {
		value = item
		// L'input caché suffit à soumettre; `set` garde la validation du formulaire à jour.
		field?.set(item && getValue(item))
	}

	const isButtonSetNullVisible = $derived(nullable && value)
</script>

{#snippet defaultSnippet(item: Item)}
	<span>{getLabel(item)}</span>
{/snippet}

{#snippet triggerButton()}
	<button
		id={inputId}
		type="button"
		class={['input', field?.issues()?.length && 'input-error', klass]}
		{...popover.trigger}
		{...isSearchable ? {} : command.trigger}
	>
		<div class="grow text-left">
			{#if !value}
				<span class="opacity-60">{placeholder}</span>
			{:else}
				<!-- item.icon not rerender if not wrapped in #key -->
				{#key value}{@render selected(value)}{/key}
			{/if}
		</div>
		<ChevronsUpDownIcon size={14} opacity={0.7} />
	</button>
{/snippet}

<!-- Rien à soumettre tant qu'aucune valeur n'est choisie: `as('hidden')` refuse une
     valeur vide. -->
{#if field && submittedValue}
	<input {...field.as('hidden', submittedValue)} />
{/if}

<div class="contents">
	{#if !label}
		{@render triggerButton()}
	{:else if variant === 'floating'}
		<label class="floating-label">
			<span>{label}</span>
			{@render triggerButton()}
		</label>
	{:else}
		<fieldset class="fieldset">
			<label class="label text-wrap" for={inputId}>{label}</label>
			{@render triggerButton()}
		</fieldset>
	{/if}

	<div
		{...popover.content}
		class={['my-2 rounded-box border bg-base-100 shadow-xl']}
		style="min-width: anchor-size(width);"
		tabindex="-1"
	>
		{#if isSearchable || isButtonSetNullVisible || append || header}
			<div class="sticky top-0 z-10 flex gap-2 bg-base-100/10 p-1 backdrop-blur-md">
				{#if header}
					{@render header(popover)}
				{:else}
					{#if isSearchable}
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
					{:else}
						<div class="grow"></div>
					{/if}
					{#if isButtonSetNullVisible}
						<button
							class="btn btn-square btn-soft btn-sm"
							type="button"
							onclick={() => {
								setValue(undefined)
								onSelect?.(undefined, popover)
								popover.hide()
							}}
							use:tip={{ content: 'Pas de sélection' }}
						>
							<XIcon />
						</button>
					{/if}
					{@render append?.(popover)}
				{/if}
			</div>
		{/if}

		<ul
			class={[
				'menu max-h-80 w-full flex-nowrap gap-1 p-1',
				(isSearchable || append || header) && 'pt-0'
			]}
		>
			{#each options as item, index (item)}
				{@const isSelected = submittedValue === getValue(item)}
				{@const isFocus = index === command.focusIndex}
				<li {...propsLi}>
					<button
						{...command.item(index, '')}
						class={[
							isSelected && 'border-hard border',
							isFocus && 'menu-focus',
							'grow scroll-mt-13 scroll-mb-2'
						]}
						type="button"
						tabindex="-1"
						role="option"
					>
						{@render proposal(item, { popover, isSelected, isFocus })}
					</button>
					{@render proposalAppend?.(item, { popover, isSelected, isFocus })}
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
