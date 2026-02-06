<script lang="ts">
	import { ChevronsUpDownIcon } from '@lucide/svelte'

	import { DropDown } from '$lib/ui/menu/index.js'
	import { SelectorList } from '$lib/ui/input/index.js'
	import { type Options, parseOptions } from '$lib/utils/options.js'
	import type { TippyProps } from '$lib/utils/tippy.js'
	import type { Snippet } from 'svelte'

	let {
		options: optionsProp,
		tippyProps = {},
		onSelect,
		children: childrenProp
	}: {
		options: Options
		tippyProps: Partial<TippyProps>
		onSelect?: (value: string) => void
		children?: Snippet
	} = $props()

	let options = $derived(parseOptions(optionsProp))
	let trigger = $state<HTMLElement>()
</script>

<DropDown {tippyProps}>
	{#snippet activator()}
		<button
			bind:this={trigger}
			type="button"
			class="flex h-12 items-center gap-2 rounded-lg border pl-4 pr-2"
		>
			{#if childrenProp}
				{@render childrenProp()}
			{:else}
				<span>Menu</span>
			{/if}
			<ChevronsUpDownIcon class="ml-auto" size={18} />
		</button>
	{/snippet}

	{#snippet children({ hide })}
		<SelectorList
			{trigger}
			items={options.map((opt) => ({ id: opt.value, ...opt }))}
			onSelect={(index) => {
				onSelect?.(options[index].value)
				hide()
			}}
			class="w-full"
		>
			{#snippet children({ item })}
				{#if item.icon}
					<item.icon size={18} class="opacity-70" />
				{/if}
				<span class="whitespace-nowrap pr-4">{item.label}</span>
			{/snippet}
		</SelectorList>
	{/snippet}
</DropDown>
