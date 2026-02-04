<script lang="ts">
	import { mdiClose } from '@mdi/js'
	import { browser } from '$app/environment'
	import { page } from '$app/state'
	import { Icon } from '$lib/ui/icon/index.js'
	import { InputText } from '$lib/ui/input/index.js'
	import type { FocusEventHandler, FormEventHandler, KeyboardEventHandler } from 'svelte/elements'

	let {
		class: klass = '',
		key = 'search',
		value = page.url.searchParams.get(key) || '',
		onclear,
		oninput,
		onfocus,
		onblur,
		onkeydown,
		onkeyup
	}: {
		class?: string
		key?: string
		value?: string
		onclear?: () => void
		oninput?: FormEventHandler<HTMLInputElement>
		onfocus?: FocusEventHandler<HTMLInputElement>
		onblur?: FocusEventHandler<HTMLInputElement>
		onkeydown?: KeyboardEventHandler<HTMLInputElement>
		onkeyup?: KeyboardEventHandler<HTMLInputElement>
	} = $props()

	let inputElement = $state<HTMLInputElement>()
</script>

<InputText
	{key}
	bind:inputElement
	bind:value
	{oninput}
	{onfocus}
	{onblur}
	{onkeydown}
	{onkeyup}
	bindWithParams
	input={{
		class: 'input-sm pr-8',
		placeholder: 'Recherche',
		autocomplete: 'off',
		inputmode: 'search'
	}}
	classWrapper="relative {klass}"
>
	{#snippet append()}
		<button
			class="btn btn-square btn-sm absolute right-0"
			class:hidden={!browser}
			style:scale={!!value ? 0.75 : 0}
			onclick={() => {
				value = ''
				inputElement?.dispatchEvent(new Event('input', { bubbles: true }))
				onclear?.()
			}}
			tabindex={!!value ? 0 : -1}
		>
			<Icon path={mdiClose} />
		</button>
	{/snippet}
</InputText>
