<script lang="ts">
	import { Dialog, Icon, Table, urlParam } from '$lib/index.js'
	import { mdiPlus } from '@mdi/js'
	import PostForm from './PostForm.svelte'
	export let data

	let dialog: HTMLDialogElement
</script>

<div class="flex items-center gap-2 py-4">
	<h2 class="title">CRUD example</h2>
	<div class="grow" />
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
			getCell: (post) => post.title,
			visible: true
		},
		{
			key: 'author',
			label: 'Author',
			getCell: (post) => post.author.username,
			visible: true
		},
		{
			key: 'likeCount',
			label: 'likes',
			visible: true,
			type: 'number',
			getCell: (post) => post.likeCount
		},
		{
			key: 'writingAt',
			type: 'date',
			label: 'WritingAt',
			getCell: (post) => post.writingAt.toLocaleDateString() || '',
			visible: true
		},
		{
			key: 'publishedAt',
			type: 'date',
			label: 'PublishedAt',
			getCell: (post) => post.publishedAt?.toLocaleDateString() || '',
			visible: true
		},
		{
			key: 'isFavourite',
			label: 'IsFavourite',
			type: 'boolean',
			visible: true,
			getCell: (post) => post.isFavourite
		},
		{
			key: 'select',
			label: 'Select Without options',
			type: 'select',
			visible: true,
			getCell: () => 'yolo'
		}
	]}
/>
