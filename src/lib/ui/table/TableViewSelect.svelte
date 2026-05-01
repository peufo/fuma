<script lang="ts">
	import { ChevronDownIcon, PlusIcon, SaveIcon } from '@lucide/svelte'
	import { page } from '$app/state'

	import { Dialog } from '$lib/ui/dialog/index.js'
	import { DropDown } from '$lib/ui/menu/index.js'
	import { SvelteURLSearchParams } from 'svelte/reactivity'

	// import { InputText } from '$lib/ui/input/index.js';
	// import { useForm } from '$lib/validation/form.jss';

	type View = {
		id: string
		name: string
		query: string
	}

	let {
		views
	}: {
		views: View[]
	} = $props()

	let dialog = $state<HTMLDialogElement>()
	// const form = useForm({
	// 	onSuccess() {
	// 		dialog?.close();
	// 	}
	// });

	let query = $derived.by(() => {
		const searchParam = new SvelteURLSearchParams(page.url.searchParams)
		searchParam.delete('skip')
		searchParam.delete('take')
		return searchParam.toString()
	})

	let selectedView = $derived(views.find((v) => v.query === query))
	let isNewView = $derived(!!query && !selectedView)
</script>

/* eslint-disable @typescript-eslint/no-unused-vars */ /* eslint-disable
@typescript-eslint/no-unused-vars */
<DropDown>
	{#snippet activator()}
		<button
			type="button"
			class="menu-item bordered gap-1 rounded-lg border font-semibold opacity-90 btn-sm"
		>
			<span>{isNewView ? 'Nouvelle vue' : selectedView?.name || 'Vue simple'}</span>
			<ChevronDownIcon size={20} class="translate-x-1 translate-y-px opacity-90" />
		</button>
	{/snippet}

	<ul class="flex flex-col gap-1">
		{#if isNewView}
			<li>
				<button
					type="button"
					class="menu-item w-full pr-1.5"
					onclick={() => {
						selectedView = undefined
						dialog?.showModal()
					}}
				>
					<span>Ajouter la nouvelle vue</span>
					<PlusIcon class="ml-auto opacity-80" size={21} />
				</button>
				<hr class="my-1" />
			</li>
		{/if}

		<li>
			<a href={page.url.pathname} class="menu-item" class:active={!query}>
				<span class="grow">Vue simple</span>
			</a>
		</li>

		{#each views as view (view.id)}
			<li>
				<a
					href="{page.url.pathname}?{view.query}"
					class="menu-item group pr-1"
					class:active={view.id === selectedView?.id}
				>
					<span class="grow">{view.name}</span>
					<button
						type="button"
						class="btn btn-square rounded btn-ghost btn-xs"
						onclick={(e) => {
							e.preventDefault()
							selectedView = view
							dialog?.showModal()
						}}
					>
						<SaveIcon
							class="opacity-50 group-hover:opacity-80"
							size={18}
							title="Modifier la vue '{view.name}'"
						/>
					</button>
				</a>
			</li>
		{/each}
	</ul>
</DropDown>

<Dialog bind:dialog>
	{#snippet header()}
		<h2 class="title">
			{#if selectedView}
				Modifier la vue
			{:else}
				Ajouter la nouvelle vue
			{/if}
		</h2>
	{/snippet}

	<span>TODO: how to build basic form (create update) with new system ?</span>
	<!-- 
	<form
		action="{action}{selectedView ? actionUpdate : actionCreate}"
		method="post"
		use:enhance={form.submit}
	>
		{#if selectedView}
			<input type="hidden" name="id" value={selectedView.id} />
		{/if}
		<input type="hidden" name="key" value={key} />
		<input type="hidden" name="query" value={query} />

		<Input key="name" input={{ placeholder: 'Nom de la vue' }} value={selectedView?.name || ''} />

		<div class="mt-2 flex flex-row-reverse gap-2">
			<button class="btn"> Valider </button>

			<button formaction="{action}{actionDelete}" class="btn text-error btn-ghost">
				Supprimer
			</button>
		</div>
	</form> -->
</Dialog>
