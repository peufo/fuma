<script lang="ts">
	import type { SuggestionProps } from '@tiptap/suggestion'
	import { SelectorList } from '$lib/ui/input/index.js'
	import type { SuggestionItem } from './suggestion.js'

	export let props: SuggestionProps<SuggestionItem>
	export let keyDownEvent: KeyboardEvent | undefined = undefined

	function onSelect(index: number) {
		const item = props.items[index]
		if (!item) return
		props.command(item)
	}
</script>

<SelectorList
	items={props.items}
	{keyDownEvent}
	keyDownPreventDefault={false}
	{onSelect}
	class=" max-h-64 overflow-auto"
>
	{#snippet children({ item })}
		<span>{item.label}</span>
	{/snippet}
</SelectorList>
