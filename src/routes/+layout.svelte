<script lang="ts">
	import '../app.pcss'

	import { Toaster } from 'svelte-sonner'
	import Tree from './Tree.svelte'
	import { ToggleMode } from '$lib/ui/mode/index.js'
	import { slide } from 'svelte/transition'
	import { enhance } from '$app/forms'
	import { drawerTransitionX } from '$lib/private/store.js'

	export let data

	let tree = Object.keys(import.meta.glob('./**/+page.svelte'))
		.map((p) => p.replace('./', '').replace(/\/?\+page.svelte/, ''))
		.filter(Boolean)
		.map((link) => link.split('/'))
</script>

<Toaster />

<div class="flex items-start gap-4 p-2" style="padding-right: {$drawerTransitionX + 8}px;">
	<div class="sticky top-2 min-w-48 rounded-lg border">
		<header class=" flex flex-col gap-2 rounded-md bg-base-200/50 p-2 pl-4">
			<div class="flex items-center gap-4">
				<h2 class="title mr-auto">Fuma</h2>
				<ToggleMode />
			</div>
			{#if data.user}
				<div transition:slide class="flex items-center gap-4">
					<span class="title-md">
						{data.user.username} 👋
					</span>
					<form action="/auth?/logout" use:enhance method="post" class="contents">
						<button class="btn btn-ghost btn-xs ml-auto">logout</button>
					</form>
				</div>
			{/if}
		</header>

		<nav class="menu">
			<Tree {tree}></Tree>
		</nav>
	</div>
	<div class="grow overflow-hidden">
		<slot></slot>
	</div>
</div>
