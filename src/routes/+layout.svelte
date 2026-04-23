<script lang="ts">
	import '../app.css'

	import { Toaster } from 'svelte-sonner'
	import { ToggleMode } from '$lib/ui/mode/index.js'
	import Tree from './Tree.svelte'

	let tree = Object.keys(import.meta.glob('./**/+page.svelte'))
		.map((p) => p.replace('./', '').replace(/\/?\+page.svelte/, ''))
		.filter(Boolean)
		.map((link) => link.split('/'))
</script>

<Toaster />

<div class="flex items-start gap-4 p-2">
	<div class="sticky top-2 min-w-48 rounded-lg border">
		<header class="flex flex-col gap-2 rounded-md bg-base-200/50 p-2 pl-4">
			<div class="flex items-center gap-3">
				<img src="/logo.svg" alt="Fuma" class="h-8 w-8" />
				<h2 class="mr-auto text-xl font-semibold text-base-content/70">Fuma</h2>
				<ToggleMode themes={{ light: 'fuma', dark: 'fuma-dark' }} />
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
