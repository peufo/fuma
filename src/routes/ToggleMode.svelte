<script lang="ts">
	import { browser } from '$app/environment'
	import { ModeWatcher, toggleMode, mode } from 'mode-watcher'

	import { Icon } from '$lib/index.js'
	import { mdiWeatherNight, mdiWhiteBalanceSunny } from '@mdi/js'

	mode.subscribe((_mode) => {
		if (!browser) return
		const [html] = document.getElementsByTagName('html')
		if (!html || !_mode) return
		html.setAttribute('data-theme', _mode)
	})
</script>

<ModeWatcher />

<button class="btn btn-square btn-sm" on:click={toggleMode}>
	<Icon path={$mode === 'light' ? mdiWhiteBalanceSunny : mdiWeatherNight} />
</button>
