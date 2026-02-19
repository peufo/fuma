<script lang="ts" generics="Item extends {id: string | number}">
	import type { Snippet } from 'svelte';
	import { selector } from '$lib/action/selector.js';

	let {
		items,
		class: klass = '',
		isError = false,
		isLoading = false,
		focusIndex = $bindable(0),
		trigger,
		keyDownEvent,
		keyDownPreventDefault = true,
		onSelect,
		children
	}: {
		items: Item[];
		class?: string;
		isError?: boolean;
		isLoading?: boolean;
		focusIndex?: number;
		trigger?: HTMLElement;
		keyDownEvent?: KeyboardEvent;
		keyDownPreventDefault?: boolean;
		onSelect?: (index: number) => void;
		children: Snippet<[{ item: Item; index: number }]>;
	} = $props();
</script>

<ul
	use:selector={{
		trigger,
		focusIndex,
		onSelect,
		onFocus: (index) => (focusIndex = index),
		keyDownEvent,
		keyDownPreventDefault
	}}
	class="flex flex-col gap-1 {klass}"
>
	{#if isError}
		<li class="p-2 text-center">Erreur 🥲</li>
	{:else}
		{#each items as item, index (item.id)}
			{@const isFocused = focusIndex === index}
			<li
				role="menuitem"
				onclick={() => onSelect?.(index)}
				onkeydown={() => onSelect?.(index)}
				class="flex cursor-pointer items-center justify-start gap-3 rounded px-3 py-2 hover:bg-base-200"
				class:bg-base-300={isFocused}
			>
				{@render children({ item, index })}
			</li>
		{:else}
			<li class="px-3 py-2 rounded opacity-70">
				{isLoading ? 'Chargement...' : 'Aucun élément'}
			</li>
		{/each}
	{/if}
</ul>
