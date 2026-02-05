<script lang="ts">
	import { ModeWatcher, toggleMode, mode } from 'mode-watcher'
	import { SunIcon, MoonIcon } from '@lucide/svelte'
	import type { Snippet } from 'svelte'

	let {
		class: klass = '',
		defaultMode,
		children
	}: {
		class?: string
		defaultMode?: 'dark' | 'light' | 'system'
		children?: Snippet<[{ toggleMode: () => void; mode: typeof mode }]>
	} = $props()
</script>

<ModeWatcher {defaultMode} />

{#if children}
	{@render children({ toggleMode, mode })}
{:else}
	<button class="btn btn-square btn-sm {klass}" onclick={toggleMode}>
		{#if mode.current === 'light'}
			<SunIcon />
		{:else}
			<MoonIcon />
		{/if}
	</button>
{/if}
