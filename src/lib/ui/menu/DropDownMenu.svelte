<script lang="ts">
	import { ChevronsUpDownIcon } from '@lucide/svelte'
	import type { Snippet } from 'svelte'
	import { Popover, type PopoverOptions } from '$lib/popover/index.js'

	let {
		children: childrenProp,
		...popoverOptions
	}: {
		children?: Snippet
	} & PopoverOptions = $props()
</script>

<Popover {...popoverOptions} class="p-1">
	{#snippet trigger(popover)}
		<button
			type="button"
			class="flex h-12 items-center gap-2 rounded-lg border pr-2 pl-4"
			{...popover.trigger}
		>
			{#if childrenProp}
				{@render childrenProp()}
			{:else}
				<span>Menu</span>
			{/if}
			<ChevronsUpDownIcon class="ml-auto" size={18} />
		</button>
	{/snippet}

	<span>TODO: use Command or REMOVE THIS COMPONENT</span>

	<!-- <SelectorList
			{trigger}
			items={options.map((opt) => ({ id: opt.value, ...opt }))}
			onSelect={(index) => {
				onSelect?.(options[index].value);
				hide();
			}}
			class="w-full"
		>
			{#snippet children({ item })}
				{#if item.icon}
					<item.icon size={18} class="opacity-70" />
				{/if}
				<span class="pr-4 whitespace-nowrap">{item.label}</span>
			{/snippet}
		</SelectorList> -->
</Popover>
