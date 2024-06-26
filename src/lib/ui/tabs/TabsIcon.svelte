<script lang="ts">
	import { page } from '$app/stores'
	import { onMount } from 'svelte'

	import { urlParam } from '$lib/store/index.js'
	import { Icon } from '$lib/ui/icon/index.js'
	import { parseOptions, type Options, type Option } from '$lib/utils/options.js'

	export let options: Options
	export let showLabel = false
	export let key: string
	export let defaultValue: string | undefined = undefined

	let _options = getOptions($page.url)
	onMount(() =>
		page.subscribe(({ url }) => {
			_options = getOptions(url)
		})
	)

	function getOptions(url: URL) {
		return parseOptions(options).map((option) => ({
			...option,
			isActive: getIsActive(option, url)
		}))
	}
	function getIsActive(option: Option, { searchParams }: URL) {
		if (searchParams.get(key) === option.value) return true
		if (!searchParams.has(key)) return option.value === defaultValue
		return false
	}
</script>

<div class="flex items-center gap-[3px] rounded-lg bg-base-200 p-1">
	{#each _options as { value, label, icon, isActive }}
		<a
			href={$urlParam.with({ [key]: value })}
			data-sveltekit-noscroll
			data-sveltekit-replacestate
			class="flex h-6 items-center justify-center gap-2 rounded p-1"
			class:px-2={showLabel}
			class:w-6={icon && !showLabel}
			class:whitespace-nowrap={showLabel}
			class:bg-base-100={isActive}
			class:shadow={isActive}
		>
			{#if icon}
				<Icon
					path={icon}
					title={showLabel ? '' : label}
					size={18}
					class={isActive ? '' : 'opacity-60'}
				/>
			{/if}
			{#if !icon || showLabel}
				<span class="text-sm font-medium opacity-80">{label}</span>
			{/if}
		</a>
	{/each}
</div>
