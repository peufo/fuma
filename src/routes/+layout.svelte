<script lang="ts">
	import '../app.pcss'
	import Tree from './Tree.svelte'

	let tree = Object.keys(import.meta.glob('./**/+page.svelte'))
		.map((p) => p.replace('./', '').replace(/\/?\+page.svelte/, ''))
		.filter(Boolean)
		.map((link) => link.split('/'))
</script>

<div class="flex gap-4">
	<div class="menu p-4 min-h-full w-min">
		<Tree {tree}></Tree>
	</div>
	<div class="grow">
		<slot></slot>
	</div>
</div>
