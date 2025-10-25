<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte'
	import { mdiUnfoldMoreHorizontal } from '@mdi/js'

	import { Icon } from '$lib/ui/icon/index.js'
	import { DropDown } from '$lib/ui/menu/index.js'
	import { SelectorList, FormControl, type InputProps } from '$lib/ui/input/index.js'

	import { type Options, parseOptions } from '$lib/utils/options.js'
	import type { TippyProps } from '$lib/utils/tippy.js'

	type $$Props = Omit<InputProps, 'input' | 'inputElement'> & {
		options: Options
		tippyProps?: TippyProps
		placeholder?: string
	}
	$: ({ value: _value, options, tippyProps, placeholder, ...props } = $$props as $$Props)
	export let value = _value

	$: _options = parseOptions(options)
	$: selectedOption = _options.find((opt) => opt.value === value)

	let dropDown: DropDown
	let button: HTMLButtonElement
	const dispatch = createEventDispatcher<{ input: string; select: string }>()

	let focusIndex = 0
	onMount(() => {
		const index = _options.findIndex((opt) => opt.value === value)
		focusIndex = index === -1 ? 0 : index
	})

	function onSelect(index: number) {
		focusIndex = index
		value = _options[index].value
		dispatch('input', value)
		dispatch('select', value)
		dropDown.hide()
	}
</script>

<DropDown bind:this={dropDown}>
	<svelte:fragment slot="activator">
		<FormControl {...props}>
			{#snippet children({ key })}
				<button bind:this={button} id={key} type="button" class="input flex grow items-center pr-2">
					{#if selectedOption}
						{#if selectedOption.icon}
							<Icon path={selectedOption.icon} size={21} class="opacity-70" />
						{/if}
						<span>{selectedOption.label}</span>
					{:else if placeholder}
						<span class="opacity-60">{placeholder}</span>
					{/if}
					<Icon class="ml-auto" path={mdiUnfoldMoreHorizontal} size={18} />
				</button>
				{#if value !== undefined}
					<input type="hidden" name={key} {value} />
				{/if}
			{/snippet}
		</FormControl>
	</svelte:fragment>

	<SelectorList
		trigger={button}
		{focusIndex}
		items={_options.map((opt) => ({ id: opt.value, ...opt })).filter((opt) => !opt.disable)}
		let:item
		on:select={({ detail }) => onSelect(detail)}
		class="w-full"
	>
		{#if item.icon}
			<Icon path={item.icon} size={18} class="opacity-70" />
		{/if}
		<span class="pr-4 whitespace-nowrap">{item.label}</span>
	</SelectorList>
</DropDown>
