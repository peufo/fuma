<script lang="ts">
	import { mdiClose } from '@mdi/js'
	import { browser } from '$app/environment'
	import { page } from '$app/stores'
	import { Icon } from '$lib/ui/icon/index.js'
	import { InputText } from '$lib/ui/input/index.js'

	let klass = ''
	export { klass as class }
	export let key = 'search'
	export let value = $page.url.searchParams.get(key) || ''

	let inputElement: HTMLInputElement
</script>

<InputText
	{key}
	bind:inputElement
	bind:value
	on:blur
	on:blur
	on:input
	on:keydown
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
	<button
		slot="append"
		class="btn btn-square btn-sm absolute right-0"
		class:hidden={!browser}
		style:scale={!!value ? 0.75 : 0}
		on:click={() => {
			value = ''
			inputElement.dispatchEvent(new Event('input', { bubbles: true }))
		}}
		tabindex={!!value ? 0 : -1}
	>
		<Icon path={mdiClose} />
	</button>
</InputText>
