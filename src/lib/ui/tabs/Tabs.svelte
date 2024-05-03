<script lang="ts">
	import { page } from '$app/stores'
	import type { Tab } from './index.js'
	import { Icon } from '$lib/ui/icon/index.js'

	export let tabs: Tab[]
	let klass = ''
	export { klass as class }
</script>

<div
	class="
	bordered sticky top-0 z-20 flex gap-2 rounded-t-2xl border-b bg-base-100 p-2 shadow-sm
	{klass}
	"
>
	{#each tabs as tab}
		{@const active = tab.isActive ?? $page.url.pathname.startsWith(tab.href)}
		<a
			href={tab.href}
			data-sveltekit-noscroll
			class="
        menu-item grow flex-col justify-center gap-0 rounded-lg py-2
        text-sm lg:flex-row lg:gap-3 lg:text-base
      "
			class:active
		>
			<Icon path={tab.icon} size={20} class="opacity-70" />
			<span class="hidden whitespace-nowrap sm:block">{tab.label}</span>
		</a>
	{/each}
</div>
