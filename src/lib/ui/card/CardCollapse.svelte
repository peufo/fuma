<script lang="ts">
	import { onDestroy } from 'svelte'
	import { slide } from 'svelte/transition'
	import { mdiChevronRight } from '@mdi/js'

	import { Icon } from '$lib/ui/icon/index.js'
	import { urlParam } from '$lib/store/index.js'
	import { goto } from '$app/navigation'

	export let value: string
	let klass = ''
	export { klass as class }
	export let classHeader = ''
	export let classBody = ''
	export let classTitle = ''
	export let classSubtitle = ''

	$: isOpen = $urlParam.hasValue('section', value)



	let timeout: NodeJS.Timeout
	async function handleClick() {
		await goto($urlParam.toggle({ section: value }), { noScroll: true, keepFocus: true })

	}

	onDestroy(() => {
		clearTimeout(timeout)
	})
</script>

<section class="card bordered border bg-base-100 shadow-md {klass}">
	<div
		id={value}
		tabindex="0"
		class="min-w-0 grow cursor-pointer p-2 sm:px-5 sm:py-3 {classHeader}"
		role="link"
		on:click={handleClick}
		on:keydown={(e) => e.key === ' ' && handleClick()}
	>
		<div class="flex gap-2">
			<div class="min-w-0 overflow-hidden text-ellipsis font-medium {classTitle}">
				<slot name="title" />
			</div>
			<Icon
				path={mdiChevronRight}
				class="ml-auto opacity-80 transition-transform {isOpen ? 'rotate-90' : ''}"
			/>
		</div>

		{#if $$slots.subtitle}
			<div class="text-sm {classSubtitle}">
				<slot name="subtitle" />
			</div>
		{/if}
	</div>

	{#if isOpen}
		<div class="card-body p-4 pt-0 md:p-8 md:pt-0 {classBody}" transition:slide={{ duration: 200 }}>
			<slot />
		</div>
	{/if}
</section>
