<script lang="ts">
	import { SunIcon, MoonIcon, SunMoonIcon } from '@lucide/svelte'
	import { type Snippet } from 'svelte'
	import { useMode, type ModeEnum, type Mode } from './useMode.svelte.js'

	let {
		themes = { light: 'light', dark: 'dark' },
		class: klass = '',
		children
	}: {
		themes?: Record<ModeEnum, string>
		class?: string
		children?: Snippet<[{ mode: Mode }]>
	} = $props()

	let mode = $derived(useMode(themes))
</script>

{#if children}
	{@render children({ mode })}
{:else}
	<button class="btn btn-square btn-sm {klass}" onclick={mode.toggle}>
		{#if mode.choice === 'light'}
			<SunIcon />
		{:else if mode.choice === 'dark'}
			<MoonIcon />
		{:else}
			<SunMoonIcon />
		{/if}
	</button>
{/if}
