import type { Snippet } from 'svelte'

export type SnippetLike<Args extends unknown[] = unknown[]> =
	| Snippet<Args>
	| ((...args: Args) => ReturnType<Snippet>)
