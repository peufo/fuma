<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { mdiUnfoldMoreHorizontal } from '@mdi/js'

	import { Icon } from '$lib/ui/icon/index.js'
	import { DropDown } from '$lib/ui/menu/index.js'
	import { SelectorList } from '$lib/ui/input/index.js'
	import { type Options, parseOptions } from '$lib/utils/options.js'

	export let options: Options

	$: _options = parseOptions(options)

	let trigger: HTMLDivElement

	let dropDown: DropDown
	const dispatch = createEventDispatcher<{ select: string }>()

	function onSelect(index: number) {
		const option = _options[index]
		dispatch('select', option.value)
		dropDown.hide()
	}
</script>

<DropDown bind:this={dropDown}>
	<div class="contents" bind:this={trigger} slot="activator">
		<slot>
			<button type="button" class="flex h-12 items-center gap-2 rounded-lg border pl-4 pr-2">
				<span>Menu</span>
				<Icon class="ml-auto" path={mdiUnfoldMoreHorizontal} size={18} />
			</button>
		</slot>
	</div>

	<SelectorList
		{trigger}
		items={_options.map((opt) => ({ id: opt.value, ...opt }))}
		let:item
		on:select={({ detail }) => onSelect(detail)}
		class="w-full"
	>
		{#if item.icon}
			<Icon path={item.icon} size={18} class="opacity-70" />
		{/if}
		<span class="whitespace-nowrap pr-4">{item.label}</span>
	</SelectorList>
</DropDown>
