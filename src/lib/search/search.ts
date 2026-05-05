import type { FuseResultMatch, IFuseOptions } from 'fuse.js'
import Fuse from 'fuse.js'
import { mergeRanges } from 'perod'

export type CombinedFuseResult<T> = {
	item: T
	score: number
	matches: FuseResultMatch[]
}

type Keys<Item> = Partial<
	Record<keyof Item, Partial<{ weight: number; getFn: (item: Item) => string }>>
>

export type SearchOptions<Item, K extends Keys<Item> = Keys<Item>> = {
	items?: Item[]
	keys: K
} & Omit<IFuseOptions<Item>, 'includeMatches' | 'keys'>
export type SearchQueryOptions = {
	tokensSeparator?: string
	tokensMaxCount?: number
}
export type SearchQueryResult<Item, K extends Keys<Item> = Keys<Item>> = {
	item: Item
	spans: Record<keyof K, SearchQueryResultSpan[]>
	score: number
}
export type SearchQueryResultSpan = { value: string; isMatch: boolean }

export function useSearch<Item extends object, K extends Keys<Item>>({
	items = [],
	keys,
	...fuseOptions
}: SearchOptions<Item, K>) {
	const fuse = new Fuse<Item>(items, {
		includeMatches: true,
		ignoreLocation: true,
		ignoreDiacritics: true,
		keys: Object.entries(keys).map(([name, param]) => ({
			name,
			...(param || {})
		})),
		...fuseOptions
	})

	function query(
		value: string,
		{ tokensSeparator = ' ', tokensMaxCount = 4 }: SearchQueryOptions = {}
	): SearchQueryResult<Item, K>[] {
		const tokens = value.split(tokensSeparator).slice(0, tokensMaxCount)
		const fuseResults = multiTokenFuseSearch(fuse, tokens)
		const queryResults: SearchQueryResult<Item, K>[] = []
		for (const { item, matches, score } of fuseResults) {
			const spans: Partial<Record<keyof K, SearchQueryResultSpan[]>> = {}
			for (const key of Object.keys(keys)) {
				if (typeof value !== 'string') throw new Error('Value is not a string')
				spans[key as keyof K] = getSpans(key, matches)
			}
			queryResults.push({
				item,
				score,
				spans: spans as Record<keyof K, SearchQueryResultSpan[]>
			})
		}
		return queryResults
	}

	type PrismaWhereToken = { [P in keyof K]?: { contains: string } }
	type PrismaWhereTokens = { OR: PrismaWhereToken[] }[]

	function prismaWhereTokens(
		value: string,
		{ tokensSeparator = ' ', tokensMaxCount = 4 }: SearchQueryOptions = {}
	): PrismaWhereTokens {
		const tokens = value.split(tokensSeparator).slice(0, tokensMaxCount)
		const whereTokens: PrismaWhereTokens = []

		for (const token of tokens) {
			whereTokens.push({
				OR: Object.keys(keys).map((k) => ({ [k]: { contains: token } }) as PrismaWhereToken)
			})
		}
		return whereTokens
	}

	return {
		fuse,
		query,
		prismaWhereTokens
	}
}

function getSpans(key: string, matches: readonly FuseResultMatch[]): SearchQueryResultSpan[] {
	const { indices, value = '' } = matches?.find((m) => m.key === key) || {}
	if (!indices?.length) {
		return [{ value, isMatch: false }]
	}
	const spans: SearchQueryResultSpan[] = []
	if (indices[0][0] !== 0) {
		spans.push({ value: value.slice(0, indices[0][0]), isMatch: false })
	}
	const len = indices.length
	for (let index = 0; index < len; index++) {
		const [start, end] = indices[index]
		const nextStart = index === len - 1 ? undefined : indices[index + 1][0]
		spans.push({ value: value.slice(start, end + 1), isMatch: true })
		if (end < value.length) {
			spans.push({ value: value.slice(end + 1, nextStart), isMatch: false })
		}
	}
	return spans
}

function multiTokenFuseSearch<Item>(
	fuse: Fuse<Item>,
	tokens: string[]
): CombinedFuseResult<Item>[] {
	const resultsMap = new Map<Item, CombinedFuseResult<Item>>()
	function ensureEntry(item: Item): CombinedFuseResult<Item> {
		let entry = resultsMap.get(item)
		if (entry) return entry
		entry = { item, score: 0, matches: [] }
		resultsMap.set(item, entry)
		return entry
	}
	for (const token of tokens) {
		const results = fuse.search(token)
		for (const { item, score, matches } of results) {
			const entry = ensureEntry(item)
			if (!matches) continue
			entry.score += score || 0
			entry.matches = mergeMatches(entry.matches, matches)
		}
	}
	return [...resultsMap.values()].sort((a, b) => a.score - b.score)
}

function mergeMatches(a: FuseResultMatch[], b?: readonly FuseResultMatch[]): FuseResultMatch[] {
	if (!b || b.length === 0) return a
	const merged = [...a]
	for (const match of b) {
		const existing = merged.find((m) => m.key === match.key)
		if (existing) {
			// TODO: update perod package to handle tuple and export types
			existing.indices = mergeRanges(
				[...existing.indices, ...match.indices].map(([start, end]) => ({
					start,
					end
				}))
			).map(({ start, end }) => [start, end])
		} else {
			merged.push({ ...match })
		}
	}
	return merged
}
