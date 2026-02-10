<script lang="ts">
	import '../app.css'

	import { Toaster } from 'svelte-sonner'
	import Tree from './Tree.svelte'
	import { ToggleMode } from '$lib/ui/mode/index.js'
	import { param, urlParam } from '$lib/index.js'

	let tree = Object.keys(import.meta.glob('./**/+page.svelte'))
		.map((p) => p.replace('./', '').replace(/\/?\+page.svelte/, ''))
		.filter(Boolean)
		.map((link) => link.split('/'))
</script>

<Toaster />

<!-- TODO: find an alternative of drawerTransitionX -->
<!-- <div class="flex items-start gap-4 p-2" style="padding-right: {$drawerTransitionX + 8}px;"> -->
<div class="flex items-start gap-4 p-2">
	<div class="sticky top-2 min-w-48 rounded-lg border">
		<header class=" flex flex-col gap-2 rounded-md bg-base-200/50 p-2 pl-4">
			<div class="flex items-center gap-4">
				<h2 class="title mr-auto">Fuma</h2>
				<ToggleMode />
			</div>
		</header>

		<nav class="menu">
			<Tree {tree}></Tree>
		</nav>
	</div>
	<div class="grow overflow-hidden">
		<slot></slot>
	</div>
</div>
