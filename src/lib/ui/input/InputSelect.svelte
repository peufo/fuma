<script lang="ts">
	import { ChevronsUpDownIcon } from '@lucide/svelte';
	import { FormControl, type InputProps, SelectorList } from '$lib/ui/input/index.js';
	import { DropDown } from '$lib/ui/menu/index.js';
	import { type Options, parseOptions } from '$lib/utils/options.js';
	import type { TippyProps } from '$lib/utils/tippy.js';

	let {
		value = $bindable(''),
		options: optionsProp,
		tippyProps,
		placeholder,
		disabled,
		onInput,
		...props
	}: Omit<InputProps, 'input' | 'inputElement'> & {
		options: Options;
		tippyProps?: TippyProps;
		placeholder?: string;
		disabled?: boolean;
		onInput?: (value: string | null) => void;
	} = $props();

	let options = $derived(parseOptions(optionsProp));
	let selectedOption = $derived(options.find((opt) => opt.value === value));

	let dropDown = $state<DropDown>();
	let button = $state<HTMLButtonElement>();
	let focusIndex = $state(
		(() => {
			const index = options.findIndex((opt) => opt.value === value);
			return index === -1 ? 0 : index;
		})()
	);

	function onSelect(index: number) {
		focusIndex = index;
		value = options[index].value;
		onInput?.(value);
		dropDown?.hide();
	}
</script>

<DropDown bind:this={dropDown}>
	{#snippet activator()}
		<FormControl {...props}>
			{#snippet children({ key })}
				<button
					bind:this={button}
					id={key}
					{disabled}
					type="button"
					class="input flex grow items-center pr-2"
				>
					{#if selectedOption}
						{#if selectedOption.icon}
							<selectedOption.icon size={21} class="opacity-70" />
						{/if}
						<span>{selectedOption.label}</span>
					{:else if placeholder}
						<span class="opacity-60">{placeholder}</span>
					{/if}
					<ChevronsUpDownIcon class="ml-auto" size={18} />
				</button>
				{#if value !== undefined}
					<input type="hidden" name={key} {value} />
				{/if}
			{/snippet}
		</FormControl>
	{/snippet}

	<SelectorList
		trigger={button}
		{focusIndex}
		items={options.map((opt) => ({ id: opt.value, ...opt })).filter((opt) => !opt.disabled)}
		{onSelect}
		class="w-full"
	>
		{#snippet children({ item })}
			{#if item.icon}
				<item.icon size={18} class="opacity-70" />
			{/if}
			<span class="pr-4 whitespace-nowrap">{item.label}</span>
		{/snippet}
	</SelectorList>
</DropDown>
