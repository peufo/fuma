<script lang="ts">
	import '../app.pcss'
	import { ModeWatcher, mode } from 'mode-watcher'
	import Tree from './Tree.svelte'
	import ToggleMode from './ToggleMode.svelte'

	let tree = Object.keys(import.meta.glob('./**/+page.svelte'))
		.map((p) => p.replace('./', '').replace(/\/?\+page.svelte/, ''))
		.filter(Boolean)
		.map((link) => link.split('/'))

	mode.subscribe((_mode) => {
		const [html] = document.getElementsByTagName('html')
		if (!html || !_mode) return
		html.setAttribute('data-theme', _mode)
	})
</script>

<ModeWatcher />

<div class="flex gap-4" data-theme={$mode} data-tamere="prout">
	<div class="menu flex flex-col p-4 min-h-full w-min">
		<div class="flex items-center gap-4 mb-4">
			<h2 class="title min-w-36">Mat</h2>
			<ToggleMode />
		</div>
		<Tree {tree}></Tree>
	</div>
	<div class="grow">
		<slot></slot>
	</div>
</div>
