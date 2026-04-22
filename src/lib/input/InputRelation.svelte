<script lang="ts" generics="Item">
	import { ChevronsUpDownIcon } from '@lucide/svelte';
	import type { RemoteFormField, RemoteQueryFunction } from '@sveltejs/kit';
	import type { Snippet } from 'svelte';
	import { useCommand } from '../command/command.svelte.ts';
	import { usePopover } from '../popover/popover.svelte.ts';
	import Issues from './Issues.svelte';

	let {
		label,
		searchItems,
		getValue,
		selected,
		proposal,
		field
	}: {
		label: string;
		searchItems: RemoteQueryFunction<{ search: string }, Item[]>;
		getValue: (item: Item) => string;
		selected?: Snippet<[Item]>;
		proposal?: Snippet<[Item, { isSelected: boolean; isFocus: boolean }]>;
		field?: RemoteFormField<string>;
	} = $props();

	let search = $state('');
	const items = $derived.by(() => searchItems({ search }));

	let selectedItem = $derived(items.current?.find((item) => getValue(item) === field?.value()));

	const popover = usePopover({ listenFocus: false });
	const command = useCommand({
		isEnable: () => popover.isOpen,
		onSelect: (index) => {
			popover.hide();
			const item = items.current?.[index];
			if (!item) return;
			if (field) {
				field.set(getValue(item));
			} else {
				selectedItem = item;
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
			class={['input', field?.issues.length && 'input-error']}
			{...popover.trigger}
			type="button"
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
		style="min-width: anchor-size(width);"
		tabindex="-1"
	>
		<div class="sticky top-0 z-10 bg-base-100 p-2">
			<input type="search" {...command.trigger} class="input input-sm" bind:value={search} />
		</div>

		<ul class="menu max-h-80 w-full flex-nowrap pt-0">
			{#each items.current as item, index (item)}
				{@const isSelected = index === command.selectedIndex}
				{@const isFocus = index === command.focusIndex}
				<li>
					<button
						{...command.item(index, '')}
						class={[isFocus && 'menu-focus', 'scroll-mt-13 scroll-mb-2']}
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
