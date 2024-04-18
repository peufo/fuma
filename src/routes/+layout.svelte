<script lang="ts">
	import '../app.pcss'

	import Tree from './Tree.svelte'
	import ToggleMode from './ToggleMode.svelte'
	import { Toaster } from 'svelte-sonner'

	let tree = Object.keys(import.meta.glob('./**/+page.svelte'))
		.map((p) => p.replace('./', '').replace(/\/?\+page.svelte/, ''))
		.filter(Boolean)
		.map((link) => link.split('/'))
</script>

<Toaster />

<div class="flex gap-4">
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
