<script lang="ts">
	import { createEventDispatcher, tick } from 'svelte'

	import type { InputProps, TippyProps } from '$lib/index.js'
	import { type Options, type Option, parseOptions } from '$lib/utils/options.js'
	import { FormControl, DropDown, Icon, SelectorList } from '$lib/ui/index.js'

	type $$Props = InputProps & { options: Options; tippyProps?: TippyProps }
	$: ({ input, value: _value, options, tippyProps, ...props } = $$props as $$Props)
	$: ({ class: inputClass, ...inputProps } = input || {})
	export let value = _value
	export let inputElement: HTMLInputElement | undefined = undefined

	let focusIndex = 0
	let searchValue = ''

	const dispatch = createEventDispatcher<{ input: string }>()
	let filteredOptions: (Option & { id: string })[] = []
	$: _options = parseOptions(options)
	$: selectedOption = _options.find((opt) => opt.value === value)

	function filterOptions(value: string) {
		const reg = new RegExp(value, 'i')
		filteredOptions = _options
			.filter((opt) => opt.label.match(reg) || opt.value.match(reg))
			.map((opt) => ({ id: opt.value, ...opt }))
	}

	export async function clear() {
		searchValue = ''
		value = ''
		filterOptions('')
		await tick()
		inputElement?.focus()
	}

	async function select(index = focusIndex) {
		value = _options[index].value
		dispatch('input', value)
	}
</script>

<DropDown {tippyProps}>
	<div class="contents" slot="activator">
		<FormControl {...props} let:key>
			<div class="flex grow gap-2" class:hidden={selectedOption}>
				<div class="relative flex grow items-center gap-2">
					<input
						type="text"
						id={key}
						bind:this={inputElement}
						bind:value={searchValue}
						on:focus={() => filterOptions('')}
						on:blur={() => (searchValue = '')}
						on:input={(e) => filterOptions(e.currentTarget.value)}
						autocomplete="off"
						class="input input-bordered grow {inputClass || {}}"
						{...inputProps}
					/>
				</div>
				<slot name="append" />
			</div>

			{#if selectedOption}
				<button
					type="button"
					class="flex h-12 items-center gap-2 rounded-lg border pl-4 pr-2"
					on:click={clear}
					on:focus={clear}
				>
					{#if selectedOption.icon}
						<Icon path={selectedOption.icon} size={21} class="opacity-70" />
					{/if}
					<span>{selectedOption.label}</span>
				</button>
				<input type="hidden" name={key} value={selectedOption.value} />
			{/if}
		</FormControl>
	</div>

	<SelectorList
		items={filteredOptions}
		trigger={inputElement}
		{focusIndex}
		let:item
		class="w-full"
		on:select={({ detail }) => select(detail)}
	>
		{#if item.icon}
			<Icon path={item.icon} size={21} class="opacity-70" />
		{/if}
		<span class="whitespace-nowrap pr-4">{item.label}</span>
	</SelectorList>
</DropDown>
