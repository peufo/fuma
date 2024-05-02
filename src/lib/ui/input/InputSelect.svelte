<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte'

	import { SelectorList, DropDown, Icon, FormControl, type InputProps } from '$lib/ui/index.js'
	import { type Options, parseOptions } from '$lib/utils/options.js'
	import type { TippyProps } from '$lib/utils/tippy.js'
	import { mdiUnfoldMoreHorizontal } from '@mdi/js'

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
	const dispatch = createEventDispatcher<{ input: string }>()

	let focusIndex = 0
	onMount(() => {
		const index = _options.findIndex((opt) => opt.value === value)
		focusIndex = index === -1 ? 0 : index
	})

	function onSelect(index: number) {
		focusIndex = index
		value = _options[index].value
		dispatch('input', value)
		dropDown.hide()
	}
</script>

<DropDown bind:this={dropDown}>
	<svelte:fragment slot="activator">
		<FormControl {...props} let:key>
			<button
				bind:this={button}
				id={key}
				type="button"
				class="flex h-12 items-center gap-2 rounded-lg border pl-4 pr-2"
			>
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
			<input type="hidden" name={key} {value} />
		</FormControl>
	</svelte:fragment>

	<SelectorList
		trigger={button}
		{focusIndex}
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
