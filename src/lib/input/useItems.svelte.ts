import type { RemoteQueryFunction } from '@sveltejs/kit'
import debounce from 'debounce'

/**
 * Ce que la liste d'un select et `Loading` lisent d'une source. `RemoteQuery` le satisfait
 * structurellement, ce qui évite d'imposer une remote query à qui n'en a pas.
 */
export type QueryLike<T> = {
	readonly current: T | undefined
	readonly loading: boolean
	readonly error: unknown
	readonly ready: boolean
}

/**
 * Les trois façons d'alimenter un select:
 * - un tableau déjà chargé — le filtre reste local;
 * - une fonction, synchrone ou non — elle porte son propre filtre;
 * - une remote query — le serveur filtre.
 */
export type ItemsSource<Item> =
	| Item[]
	| ((arg: { search: string }) => Item[] | Promise<Item[]>)
	| RemoteQueryFunction<{ search: string }, Item[]>

export type UseItemsOptions<Item> = {
	source: () => ItemsSource<Item>
	search: () => string
	/** Base du filtre par défaut, et libellé affiché à défaut de snippet. */
	getLabel: (item: Item) => string
	filter?: () => ((item: Item, search: string) => boolean) | undefined
	debounceMs?: number
}

/** `item.id`, puis `item.value`: les deux formes que prennent les items en pratique. */
export function defaultGetValue<Item>(item: Item): string {
	if (item && typeof item === 'object') {
		if ('id' in item && typeof item.id === 'string') return item.id
		if ('value' in item && typeof item.value === 'string') return item.value
	}
	return JSON.stringify(item)
}

/** Un item porteur d'un `label` s'affiche par celui-ci, ce qui rend les options lisibles sans snippet. */
export function defaultGetLabel<Item>(item: Item, getValue: (item: Item) => string): string {
	if (item && typeof item === 'object' && 'label' in item) {
		if (typeof item.label === 'string') return item.label
	}
	return getValue(item)
}

/** Casse et diacritiques ignorées: « Genève » se trouve en tapant « geneve ». */
function normalize(value: string) {
	return value
		.toLowerCase()
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
}

type Resolved<Item> =
	/** Le tableau reçu en prop: c'est à nous de le filtrer. */
	| { kind: 'static'; value: Item[] }
	/** Une fonction synchrone a déjà filtré: y retoucher fausserait son intention. */
	| { kind: 'resolved'; value: Item[] }
	| { kind: 'query'; value: QueryLike<Item[]> }
	| { kind: 'promise'; value: Promise<Item[]> }

/** `RemoteQuery` est une `Promise` augmentée: `ready` est ce qui l'en distingue. */
function isQueryLike<T>(value: unknown): value is QueryLike<T> {
	return !!value && typeof value === 'object' && 'ready' in value
}

/**
 * Ramène les trois formes de `ItemsSource` à la seule que lisent les selects et `Loading`.
 */
export function useItems<Item>({
	source,
	search,
	getLabel,
	filter,
	debounceMs = 150
}: UseItemsOptions<Item>): QueryLike<Item[]> {
	// On temporise la valeur cherchée plutôt que l'appel: un seul mécanisme couvre les trois
	// formes, et les remote queries cessent de partir à chaque frappe.
	let debounced = $state(search())
	const apply = debounce((value: string) => {
		debounced = value
	}, debounceMs)

	$effect(() => {
		const value = search()
		// Une recherche vide s'applique tout de suite: ouvrir le popover ne doit rien attendre.
		if (!value) {
			apply.clear()
			debounced = value
			return
		}
		apply(value)
	})

	const resolved = $derived.by((): Resolved<Item> => {
		const items = source()
		if (Array.isArray(items)) return { kind: 'static', value: items }
		// Appel unique: c'est son retour, et lui seul, qui distingue les trois formes.
		const result = items({ search: debounced })
		if (Array.isArray(result)) return { kind: 'resolved', value: result }
		if (isQueryLike<Item[]>(result)) return { kind: 'query', value: result }
		return { kind: 'promise', value: result }
	})

	const pending = $state<{ current: Item[]; loading: boolean; error: unknown; ready: boolean }>({
		current: [],
		loading: false,
		error: undefined,
		ready: false
	})
	let sequence = 0

	$effect(() => {
		if (resolved.kind !== 'promise') return
		// Une réponse en retard ne doit pas écraser une plus récente.
		const current = ++sequence
		pending.loading = true
		resolved.value
			.then((items) => {
				if (current !== sequence) return
				pending.current = items
				pending.error = undefined
				pending.ready = true
			})
			.catch((error: unknown) => {
				if (current !== sequence) return
				pending.error = error
			})
			.finally(() => {
				if (current !== sequence) return
				pending.loading = false
			})
	})

	function filterStatic(items: Item[]) {
		if (!debounced) return items
		const match = filter?.()
		if (match) return items.filter((item) => match(item, debounced))
		const needle = normalize(debounced)
		return items.filter((item) => normalize(getLabel(item)).includes(needle))
	}

	return {
		get current() {
			switch (resolved.kind) {
				case 'static':
					return filterStatic(resolved.value)
				case 'resolved':
					return resolved.value
				case 'query':
					return resolved.value.current ?? []
				case 'promise':
					return pending.current
			}
		},
		get loading() {
			// Sans quoi la fenêtre de temporisation afficherait un résultat périmé sans indicateur.
			if (search() !== debounced) return true
			if (resolved.kind === 'query') return resolved.value.loading
			if (resolved.kind === 'promise') return pending.loading
			return false
		},
		get error() {
			if (resolved.kind === 'query') return resolved.value.error
			if (resolved.kind === 'promise') return pending.error
			return undefined
		},
		get ready() {
			if (resolved.kind === 'query') return resolved.value.ready
			if (resolved.kind === 'promise') return pending.ready
			return true
		}
	}
}
