<script lang="ts">
	import { browser } from '$app/environment'
	import { ModeWatcher, toggleMode, mode } from 'mode-watcher'

	import { Icon } from '$lib/ui/icon/index.js'
	import { mdiWeatherNight, mdiWhiteBalanceSunny } from '@mdi/js'

	let klass = ''
	export { klass as class }

	mode.subscribe((_mode) => {
		if (!browser) return
		const [html] = document.getElementsByTagName('html')
		if (!html || !_mode) return
		html.setAttribute('data-theme', _mode)
	})

	$: path = $mode === 'light' ? mdiWhiteBalanceSunny : mdiWeatherNight
</script>

<ModeWatcher />

<slot {toggleMode} {path}>
	<button class="btn btn-square btn-sm {klass}" on:click={toggleMode}>
		<Icon {path} />
	</button>
</slot>
