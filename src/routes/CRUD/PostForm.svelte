<svelte:options accessors={true} />

<script lang="ts" context="module">
	import type { ComponentType } from 'svelte'
	import type { Post, PostType, Tag } from '@prisma/client'
	export type PostWithTags = Post & { tags: Tag[]; type: PostType }
	export type PostFormComponent = ComponentType<Form<typeof modelPost, PostWithTags>>
	export type PostFormInstance = InstanceType<PostFormComponent> | undefined
</script>

<script lang="ts">
	import { mdiTagPlusOutline } from '@mdi/js'
	import { Form, relationProps, relationsProps, urlParam, type UseFormOptions } from '$lib/index.js'
	import { api } from '$lib/private/api.js'
	import { modelPost } from '$lib/private/model.js'
	import { POST_PUBLICATION } from '$lib/private/constant.js'

	const FormPost: PostFormComponent = Form
	export let postForm: PostFormInstance = undefined
	export let post: PostWithTags | undefined = undefined
	export let options: UseFormOptions<PostWithTags> = {}
</script>

<FormPost
	bind:this={postForm}
	on:success
	action="/CRUD?/post"
	{options}
	model={modelPost}
	data={post || {}}
	fields={[
		[
			{ key: 'title', text: { label: 'Titre' } },
			{
				key: 'publication',
				select: { label: 'Publication', options: POST_PUBLICATION }
			},

			{ key: 'content', colSpan: 4, textrich: {} },
			{
				key: 'tags',
				colSpan: 4,
				relations: relationsProps({
					label: 'Tags',
					search: api.Tag,
					slotItem: (item) => item.name,
					createUrl: $urlParam.with({ form_tag: 1 }),
					createTitle: 'Create Tag',
					createIcon: mdiTagPlusOutline
				})
			}
		],
		[
			{
				key: 'type',
				relation: relationProps({
					label: 'Type',
					search: api.PostType,
					slotItem: (item) => item.name
				})
			},
			{
				key: 'isFavourite',
				colSpan: 1,
				boolean: {
					label: 'Favorite'
				}
			},
			{
				key: 'likeCount',
				colSpan: 1,
				number: {
					label: 'Likes'
				}
			},
			{ key: 'writingAt', date: { label: 'Writing at' } },
			{ key: 'writingDuration', datetime: { label: 'Duration' } }
		],
		[
			{ key: 'isInteressing', boolean: { label: 'Interessing ?' } },
			{ key: 'viewCounter', number: { label: 'View counter' } },
			{ key: 'publishedAt', date: { label: 'Published At' } }
		]
	]}
	sections={[{}, { title: 'Required fields' }, { title: 'Optional fields', isReducible: true }]}
/>
