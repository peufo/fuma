<script lang="ts">
	import { Dialog, Icon, Table, urlParam } from '$lib/index.js'
	import { mdiPlus } from '@mdi/js'
	import PostForm from './PostForm.svelte'
	import { POST_PUBLICATION } from '$lib/private/constant.js'
	export let data

	let dialog: HTMLDialogElement
</script>

<div class="flex items-center gap-2 py-4">
	<h2 class="title">CRUD example</h2>
	<div class="grow"></div>
	<a class="btn" href={$urlParam.with({ form_tag: 1 })}>
		<Icon path={mdiPlus} />
		<span>Create tag</span>
	</a>
	<a class="btn" href={$urlParam.with({ form_post: 1 })}>
		<Icon path={mdiPlus} />
		<span>Create post</span>
	</a>
	<button class="btn" on:click={() => dialog.showModal()}>
		<Icon path={mdiPlus} />
		<span>Create post (dialog)</span>
	</button>
</div>

<Dialog bind:dialog>
	<h2 slot="header" class="title">Create post</h2>

	<PostForm post={data.post} />
</Dialog>

<Table
	items={data.posts}
	fields={[
		{
			key: 'title',
			label: 'Title',
			type: 'string',
			cell: (post) => post.title,
			visible: true
		},
		{
			key: 'author',
			label: 'Author',
			cell: (post) => post.author.username,
			visible: true
		},
		{
			key: 'likeCount',
			label: 'likes',
			visible: true,
			type: 'number',
			cell: (post) => post.likeCount
		},
		{
			key: 'writingAt',
			type: 'date',
			label: 'WritingAt',
			cell: (post) => post.writingAt,
			visible: true
		},
		{
			key: 'publishedAt',
			type: 'date',
			label: 'PublishedAt',
			cell: (post) => post.publishedAt,
			visible: true
		},
		{
			key: 'isFavourite',
			label: 'IsFavourite',
			type: 'boolean',
			visible: true,
			cell: (post) => post.isFavourite
		},
		{
			key: 'publication',
			label: 'Publication',
			type: 'select',
			cell: (post) => post.publication,
			options: POST_PUBLICATION
		}
	]}
/>
