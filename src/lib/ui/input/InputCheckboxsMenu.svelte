<script lang="ts">
	import { goto } from '$app/navigation'
	import { XIcon } from '@lucide/svelte'

	import { urlParam } from '$lib/state/index.js'
	import { type Options, parseOptions } from '$lib/utils/index.js'
	import { DropDown } from '$lib/ui/menu/index.js'
	import { FormControl, type InputProps } from './index.js'
	import type { Snippet } from 'svelte'

	let {
		key,
		input,
		value,
		options: optionsProp,
		class: klass,
		label,
		right,
		btnClass,
		badgePrimary,
		activator,
		...props
	}: InputProps<string[]> & {
		key: string
		options: Options
		right?: boolean
		btnClass?: string
		badgePrimary?: boolean
		activator?: Snippet<[{ dropwdown: DropDown }]>
	} = $props()

	let dropdown = $state<DropDown>()
	let options = $derived(parseOptions(optionsProp))

	async function updateUrl() {
		const url = value?.length
			? urlParam.with({ [key]: JSON.stringify(value) })
			: urlParam.without(key)
		return goto(url, { replaceState: true, noScroll: true })
	}
</script>

<input type="hidden" name={key} value={JSON.stringify(value)} />

<DropDown tippyProps={{ onHidden: updateUrl }} classWrapper="mb-[-2px]">
	{#snippet activator({ hide })}
		<div class="join" class:ml-2={value?.length}>
			<button class="btn indicator join-item btn-sm {btnClass || ''}">
				{#if typeof label === 'string'}
					<span>{label}</span>
				{:else if label}
					{@render label()}
				{/if}

				{#if !!value?.length}
					<span
						class="
						badge indicator-item badge-sm indicator-start
						{badgePrimary ? 'badge-primary' : 'badge-outline bg-base-100'}
					"
					>
						{value?.length}
					</span>
				{/if}
			</button>
			{#if !!value?.length}
				<button
					class="btn btn-square join-item btn-sm"
					onclick={() => {
						hide()
						value = []
						goto(urlParam.without(key), { replaceState: true })
					}}
				>
					<XIcon class="fill-base-content" />
				</button>
			{/if}
		</div>
	{/snippet}

	<div class={klass}>
		{#each options as option, index (option.value)}
			<FormControl
				{...props}
				label={option.label}
				prefixFor={index}
				class="flex-row-reverse items-center justify-end gap-2 whitespace-nowrap"
			>
				{#snippet children({ key })}
					<input
						bind:group={value}
						value={option.value}
						type="checkbox"
						id="{index}{key}"
						class="checkbox"
						{...input}
					/>
				{/snippet}
			</FormControl>
		{:else}
			<div class="px-3 py-2 rounded opacity-70">Aucun élément</div>
		{/each}
	</div>
</DropDown>
