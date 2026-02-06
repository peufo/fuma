<script lang="ts">
	import { slide } from 'svelte/transition'
	import { toast } from 'svelte-sonner'
	import z from 'zod'
	import { PlusIcon, Trash2Icon } from '@lucide/svelte'
	import { listEditable } from '$lib/action/list/index.js'
	import { zodCoerceJsonValue } from '$lib/validation/zod.js'

	let {
		key,
		value = $bindable('[]')
	}: {
		key: string
		value?: string | null
	} = $props()

	let options = $derived(zodCoerceJsonValue.pipe(z.array(z.string())).default([]).parse(value))
	let optionInput = $state<HTMLInputElement>()

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault()
			createOption()
		}
	}

	function createOption() {
		if (!optionInput) return
		if (options.includes(optionInput.value)) {
			return toast.warning('Cette option éxiste déjà !')
		}
		options = [...options, optionInput.value]
		optionInput.value = ''
		value = JSON.stringify(options)
		optionInput.focus()
	}

	function removeOption(index: number) {
		options = [...options.slice(0, index), ...options.slice(index + 1)]
		value = JSON.stringify(options)
	}

	function onChange(newOrder: string[]) {
		options = newOrder
		value = JSON.stringify(options)
	}
</script>

<input type="hidden" name={key} {value} />

<div class="label">
	<span class="label-text">Options</span>
</div>

<div class="bordered rounded-box border p-2">
	<div use:listEditable={{ items: options, onChange }}>
		{#each options as option, index (option)}
			<div class="flex items-center gap-2" transition:slide={{ duration: 200 }}>
				<div class="grow pl-4">
					{option}
				</div>
				<button
					type="button"
					class="btn btn-square btn-ghost btn-sm"
					onclick={() => removeOption(index)}
				>
					<Trash2Icon size={20} class="fill-error" />
				</button>
			</div>
		{/each}
	</div>

	<div class="join flex pt-2">
		<input
			bind:this={optionInput}
			type="text"
			placeholder="Nouvelle option"
			class="input join-item input-bordered grow"
			onkeydown={handleKeyDown}
		/>
		<button
			type="button"
			class="btn btn-square join-item"
			disabled={!optionInput?.value}
			onclick={createOption}
		>
			<PlusIcon title="Ajouter" />
		</button>
	</div>
</div>
