<script lang="ts" generics="Item">
	import { CheckIcon, ChevronsUpDownIcon, SearchIcon, XIcon } from '@lucide/svelte'
	import type { RemoteFormField } from '@sveltejs/kit'
	import { untrack, type Snippet } from 'svelte'
	import type { ClassValue } from 'svelte/elements'
	import { slide } from 'svelte/transition'
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
		value = $bindable([]),
		placeholder = 'Selectionner des valeurs',
		canReset = false,
		class: klass,
		disabled = false,
		hint,
		append,
		labelAppend,
		onSelect,
		hotKey,
		variant = 'block'
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
		proposal?: Snippet<[Item, { isSelected: boolean; isFocus: boolean }]>
		field?: RemoteFormField<string[]>
		/**
		 * Les items, pas leurs valeurs soumises. Un parent qui les repilote après coup doit
		 * les lier par `bind:`: passé en simple prop, un `$bindable` cesse de suivre le
		 * parent dès que le composant y a écrit.
		 */
		value?: NoInfer<Item>[]
		placeholder?: string
		canReset?: boolean
		class?: ClassValue
		/** Les valeurs restent soumises, mais la sélection ne peut plus changer. */
		disabled?: boolean
		hint?: Snippet<[Item[]]>
		/** Rendu à droite du champ de recherche: une action « créer », typiquement. */
		append?: Snippet<[PopoverType]>
		/** Rendu à droite du libellé. Sans effet sur la variante `floating`. */
		labelAppend?: Snippet
		onSelect?: (items: NoInfer<Item>[], popover: PopoverType) => void
		hotKey?: string
		variant?: 'floating' | 'block'
	} = $props()

	const inputId = $props.id()
	const listId = `${inputId}-list`
	// `<label for>` ne nomme que les éléments étiquetables, ce qu'un `div` n'est pas: sans
	// cette référence explicite, le combobox reste sans nom accessible.
	const labelId = `${inputId}-label`
	let trigger = $state<HTMLDivElement>()

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

	// `value` porte les items et non les valeurs soumises: celles-ci s'en dérivent par
	// `getValue`, alors que l'inverse demanderait une requête. C'est aussi ce qui rend
	// l'état initial gratuit — pas de `defaultValue` à réconcilier avec le champ.
	const selectedValues = $derived(value.map(getValue))

	export const popover = usePopover({
		listenFocus: false,
		listenFocusout: true,
		onShow: () => command.focusTrigger(),
		// Le déclencheur est un `div`: `disabled` ne le neutralise pas comme un bouton, et
		// le raccourci ouvrirait un popover qu'aucun geste ne peut plus atteindre.
		hotKey: (() => (disabled ? undefined : hotKey))()
	})
	// Un multi-select ne se referme pas à chaque choix: `popover.hide()` n'est appelé
	// que par le bouton de fermeture.
	export const command = useCommand({
		isEnable: () => popover.isOpen,
		onSelect: (index) => {
			const item = options[index]
			if (item) toggle(item)
		}
	})

	function toggle(item: Item) {
		const itemValue = getValue(item)
		value = selectedValues.includes(itemValue)
			? value.filter((selectedItem) => getValue(selectedItem) !== itemValue)
			: [...value, item]
		onSelect?.(value, popover)
	}

	function remove(item: Item) {
		const itemValue = getValue(item)
		value = value.filter((selectedItem) => getValue(selectedItem) !== itemValue)
		onSelect?.(value, popover)
	}

	// L'annonce suit la valeur et non le geste: le parent peut l'écrire lui-même par `bind:`
	// — un item créé dans un tiroir — et `toggle` n'est alors jamais appelé.
	//
	// La ligne de base est prise au montage: annoncer la sélection initiale l'écrirait dans
	// l'état du champ, qui cesserait dès lors de consulter la valeur passée à `as()`.
	let announced = untrack(() => selectedValues.join('\n'))
	$effect(() => {
		const signature = selectedValues.join('\n')
		if (signature === announced) return
		announced = signature
		// Les cases cachées suffisent à soumettre; `set` garde la validation à jour.
		field?.set(selectedValues)
		// Un choix n'émet aucun évènement de formulaire: les cases sont écrites par le code,
		// et le popover reste ouvert — rien ne rend donc la main au déclencheur, contrairement
		// au select simple. Sans cette annonce, ce qui surveille le formulaire (une barre de
		// sauvegarde) ne voit la sélection qu'au choix suivant.
		trigger?.dispatchEvent(new Event('change', { bubbles: true }))
	})
</script>

{#snippet defaultSnippet(item: Item)}
	<span>{getLabel(item)}</span>
{/snippet}

{#snippet triggerCombobox()}
	<!-- Un `div` et non un `button`: les puces portent leur propre bouton de retrait, et
	     un bouton ne peut pas en contenir un autre. -->
	<div
		bind:this={trigger}
		id={inputId}
		role="combobox"
		aria-controls={listId}
		aria-labelledby={label ? labelId : undefined}
		aria-expanded={popover.isOpen}
		aria-haspopup="listbox"
		aria-disabled={disabled}
		tabindex={disabled ? -1 : 0}
		class={[
			'input h-auto min-h-(--size) w-full flex-wrap items-center gap-1 py-1',
			!disabled && 'cursor-pointer',
			field?.issues()?.length && 'input-error',
			klass
		]}
		onkeydown={(event) => {
			if (disabled) return
			if (event.key !== 'Enter' && event.key !== ' ') return
			event.preventDefault()
			popover.show()
		}}
		{...disabled ? {} : popover.trigger}
		{...isSearchable || disabled ? {} : command.trigger}
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
					{#if !disabled}
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
					{/if}
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

<div class="contents">
	{#if !label}
		{@render triggerCombobox()}
	{:else if variant === 'floating'}
		<label class="floating-label">
			<span id={labelId}>{label}</span>
			{@render triggerCombobox()}
		</label>
	{:else}
		<fieldset class="fieldset">
			<label id={labelId} class="label text-wrap" for={inputId}>
				<span>{label}</span>
				{@render labelAppend?.()}
			</label>
			{@render triggerCombobox()}
		</fieldset>
	{/if}

	<div
		{...popover.content}
		class={['my-2 rounded-box border bg-base-100 shadow-xl']}
		style="min-width: anchor-size(width);"
		tabindex="-1"
	>
		{#if isSearchable || (canReset && value.length) || append}
			<div class="sticky top-0 z-10 flex gap-2 bg-base-100/10 p-2 backdrop-blur-md">
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
				{#if canReset && value.length}
					<button
						class="btn btn-square btn-soft btn-sm"
						type="button"
						onclick={() => {
							value = []
							onSelect?.(value, popover)
							popover.hide()
						}}
						use:tip={{ content: 'Tout désélectionner' }}
					>
						<XIcon />
					</button>
				{/if}
				{@render append?.(popover)}
			</div>
		{/if}

		<ul
			id={listId}
			role="listbox"
			aria-multiselectable="true"
			class={['menu max-h-80 w-full flex-nowrap', (isSearchable || append) && 'pt-0']}
		>
			{#each options as item, index (item)}
				{@const isSelected = selectedValues.includes(getValue(item))}
				{@const isFocus = index === command.focusIndex}
				<li>
					<button
						{...command.item(index)}
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

	/* Le déclencheur est un `div`: ni `:disabled` ni `[disabled]` ne s'y appliquent, et le
	   style désactivé de daisyUI passe à côté. Reproduit ici sur `aria-disabled`, le seul
	   marqueur valide sur un `role="combobox"`. */
	div[aria-disabled='true'] {
		cursor: not-allowed;
		background-color: var(--color-base-200);
		border-color: var(--color-base-200);
		box-shadow: none;
	}
</style>
