<script lang="ts">
	import { ModeWatcher, toggleMode, mode } from 'mode-watcher'
	import { mdiWeatherNight, mdiWhiteBalanceSunny } from '@mdi/js'

	import { Icon } from '$lib/ui/icon/index.js'

	let klass = ''
	export { klass as class }
	export let defaultMode: 'dark' | 'light' | 'system' | undefined = undefined

	$: path = $mode === 'light' ? mdiWhiteBalanceSunny : mdiWeatherNight
</script>

<ModeWatcher {defaultMode} />

<slot {toggleMode} {path}>
	<button class="btn btn-square btn-sm {klass}" on:click={toggleMode}>
		<Icon {path} />
	</button>
</slot>
