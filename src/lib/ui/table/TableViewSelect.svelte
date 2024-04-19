<script lang="ts">
	import { onMount } from 'svelte'
	import { mdiChevronDown, mdiContentSaveEditOutline, mdiPlus } from '@mdi/js'
	import { page } from '$app/stores'
	import { enhance } from '$app/forms'

	import { Dialog, DropDown, Icon, InputText } from '$lib/ui/index.js'
	import { useForm } from '$lib/validation/form.js'

	type View = {
		id: string
		name: string
		query: string
	}

	export let key: string
	export let views: View[]
	export let actionCreate = '?/create_view'
	export let actionUpdate = '?/create_view'
	export let actionDelete = '?/delete_view'

	let dialog: HTMLDialogElement
	const form = useForm({
		onSuccess() {
			dialog.close()
		}
	})

	let query = getQuery($page.url)
	let selectedView = views.find((v) => v.query === query)
	let isNewView = !!query && !selectedView

	onMount(() =>
		page.subscribe(({ url }) => {
			query = getQuery(url)
			selectedView = views.find((v) => v.query === query)
			isNewView = !!query && !selectedView
		})
	)

	function getQuery({ searchParams }: URL) {
		const searchParam = new URLSearchParams(searchParams)
		searchParam.delete('skip')
		searchParam.delete('take')
		return searchParam.toString()
	}
</script>

<DropDown>
	<button
		type="button"
		slot="activator"
		class="menu-item bordered btn-sm gap-1 rounded-lg border font-semibold opacity-90"
	>
		<span>{isNewView ? 'Nouvelle vue' : selectedView?.name || 'Vue simple'}</span>
		<Icon path={mdiChevronDown} size={20} class="translate-x-1 translate-y-[1px] opacity-90" />
	</button>

	<ul class="flex flex-col gap-1">
		{#if isNewView}
			<li>
				<button
					type="button"
					class="menu-item w-full pr-[6px]"
					on:click={() => {
						selectedView = undefined
						dialog.showModal()
					}}
				>
					<span>Ajouter la nouvelle vue</span>
					<Icon path={mdiPlus} class="ml-auto opacity-80" size={21} />
				</button>
				<hr class="my-1" />
			</li>
		{/if}

		<li>
			<a href={$page.url.pathname} class="menu-item" class:active={!query}>
				<span class="grow">Vue simple</span>
			</a>
		</li>

		{#each views as view (view.id)}
			<li>
				<a
					href="{$page.url.pathname}?{view.query}"
					class="menu-item group pr-1"
					class:active={view.id === selectedView?.id}
				>
					<span class="grow">{view.name}</span>
					<button
						type="button"
						class="btn btn-square btn-ghost btn-xs rounded"
						on:click|preventDefault={() => {
							selectedView = view
							dialog.showModal()
						}}
					>
						<Icon
							path={mdiContentSaveEditOutline}
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
	<h2 slot="header" class="title">
		{#if selectedView}
			Modifier la vue
		{:else}
			Ajouter la nouvelle vue
		{/if}
	</h2>

	<form action={selectedView ? actionUpdate : actionCreate} method="post" use:enhance={form.submit}>
		{#if selectedView}
			<input type="hidden" name="id" value={selectedView.id} />
		{/if}
		<input type="hidden" name="key" value={key} />
		<input type="hidden" name="query" value={query} />

		<InputText
			key="name"
			input={{ placeholder: 'Nom de la vue' }}
			value={selectedView?.name || ''}
		/>

		<div class="mt-2 flex flex-row-reverse gap-2">
			<button class="btn"> Valider </button>

			<button formaction={actionDelete} class="btn btn-ghost text-error"> Supprimer </button>
		</div>
	</form>
</Dialog>
