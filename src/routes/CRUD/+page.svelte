<script lang="ts">
	import { Icon, Table, urlParam } from '$lib/index.js'
	import { mdiPlus } from '@mdi/js'
	export let data
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
</div>

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
		}
	]}
/>
