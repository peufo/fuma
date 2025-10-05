<script lang="ts">
	import { mdiClose } from '@mdi/js'
	import { browser } from '$app/environment'
	import { page } from '$app/state'
	import { Icon } from '$lib/ui/icon/index.js'
	import { InputText } from '$lib/ui/input/index.js'

	let {
		class: klass = '',
		key = 'search',
		value = page.url.searchParams.get(key) || '',
		oninput,
		onclear,
		onkeydown
	}: {
		class?: string
		key?: string
		value?: string
		oninput?: (value: string) => void
		onclear?: () => void
		onkeydown?: (event: KeyboardEvent) => void
	} = $props()

	let inputElement = $state<HTMLInputElement>()
</script>

<InputText
	{key}
	bind:inputElement
	bind:value
	on:blur
	on:input={() => oninput?.(value)}
	on:keydown={(e) => onkeydown?.(e)}
	on:keyup
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
				oninput?.(value)
				onclear?.()
			}}
			tabindex={!!value ? 0 : -1}
		>
			<Icon path={mdiClose} />
		</button>
	{/snippet}
</InputText>
