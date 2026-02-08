<script lang="ts">
	import { SunIcon, MoonIcon, SunMoonIcon } from '@lucide/svelte'
	import { type Snippet } from 'svelte'
	import { MediaQuery } from 'svelte/reactivity'

	type Mode = 'light' | 'dark'
	type ModeUser = Mode | null

	let {
		themes = { light: 'light', dark: 'dark' },
		class: klass = '',
		children
	}: {
		themes?: Record<Mode, string>
		class?: string
		children?: Snippet<[{ toggleMode: () => void; setMode: (m: ModeUser) => void; mode: Mode }]>
	} = $props()

	let modeUser = $state<ModeUser>(null)
	let modeSystemIsLight = new MediaQuery('prefers-color-scheme: light')
	let modeSystem = $derived<Mode>(modeSystemIsLight.current ? 'light' : 'dark')
	let mode = $derived(modeUser || modeSystem)

	function toggleMode() {
		if (!modeUser) return (modeUser = 'light')
		if (modeUser === 'light') return (modeUser = 'dark')
		modeUser = null
	}

	function setMode(_mode: ModeUser) {
		modeUser = _mode
	}

	$effect(() => {
		const rootEl = document.documentElement
		rootEl.dataset['theme'] = themes[mode]
	})
</script>

{#if children}
	{@render children({ toggleMode, setMode, mode })}
{:else}
	<button class="btn btn-square btn-sm {klass}" onclick={toggleMode}>
		{#if modeUser === 'light'}
			<SunIcon />
		{:else if modeUser === 'dark'}
			<MoonIcon />
		{:else}
			<SunMoonIcon />
		{/if}
	</button>
{/if}
