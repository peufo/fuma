<script lang="ts" generics="Item">
	import { ChevronsUpDownIcon } from '@lucide/svelte';
	import type { RemoteFormField } from '@sveltejs/kit';
	import type { Snippet } from 'svelte';
	import { useCommand } from '../command/command.svelte.ts';
	import { usePopover } from '../popover/popover.svelte.ts';
	import Issues from './Issues.svelte';

	let {
		label,
		items,
		getValue,
		selected,
		proposal,
		field,
		value = $bindable()
	}: {
		label: string;
		items: Item[];
		getValue: (item: Item) => string;
		selected?: Snippet<[Item]>;
		proposal?: Snippet<[Item, { isSelected: boolean; isFocus: boolean }]>;
		field?: RemoteFormField<string>;
		value?: string;
	} = $props();

	let selectedItem = $state<Item | undefined>(undefined);

	$effect(() => {
		const targetValue = field?.value() ?? value;
		selectedItem = items.find((item) => getValue(item) === targetValue);
	});

	const popover = usePopover({ listenFocus: false });
	const command = useCommand({
		isEnable: () => popover.isOpen,
		onSelect: (index) => {
			popover.hide();
			const item = items[index];
			if (!item) return;
			selectedItem = item;
			if (field) {
				field.set(getValue(item));
			} else {
				value = getValue(item);
			}
		}
	});
</script>

{#if field?.value() !== undefined}
	<input {...field.as('hidden', field.value() as string)} />
{/if}

<div>
	<label class="floating-label">
		<span>{label}</span>
		<button
			type="button"
			class={['input', field?.issues.length && 'input-error']}
			{...popover.trigger}
			{...command.trigger}
		>
			<div class="grow text-left">
				{#if !selectedItem}
					<span class="opacity-60">Select a value</span>
				{:else if selected}
					<!-- item.icon not rerender if not wrapped in #key -->
					{#key selectedItem}{@render selected(selectedItem)}{/key}
				{:else}
					{getValue(selectedItem)}
				{/if}
			</div>
			<ChevronsUpDownIcon size={14} />
		</button>
	</label>

	<div
		{...popover.content}
		class={['my-2 rounded-box border bg-base-100 shadow-xl']}
		style="width: anchor-size(width);"
		tabindex="-1"
	>
		<ul class="menu max-h-80 w-full flex-nowrap">
			{#each items as item, index (item)}
				{@const isSelected = index === command.selectedIndex}
				{@const isFocus = index === command.focusIndex}
				<li>
					<button
						{...command.item(index)}
						class={[isFocus && 'menu-focus']}
						type="button"
						tabindex="-1"
						role="option"
					>
						{#if proposal}
							{@render proposal(item, { isSelected, isFocus })}
						{:else}
							{getValue(item)}
						{/if}
					</button>
				</li>
			{/each}
		</ul>
	</div>
	<Issues {field} />
</div>

<style>
	div[popover] {
		border-color: color-mix(in oklab, var(--color-base-content) 20%, #0000);
	}
</style>
