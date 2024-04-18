<script lang="ts">
	import { toggleMode, mode } from 'mode-watcher'
	import { Icon } from '$lib/index.js'
	import { mdiMoonNew, mdiSunSnowflake } from '@mdi/js'
</script>

<button class="btn btn-square btn-sm" on:click={toggleMode}>
	<Icon path={$mode === 'light' ? mdiSunSnowflake : mdiMoonNew} />
</button>
