<svelte:options accessors={true} />

<script lang="ts">
	import type { ComponentType } from 'svelte'
	import type { Post, PostType, Tag } from '@prisma/client'
	import { mdiTagPlusOutline } from '@mdi/js'
	import {
		Drawer,
		Form,
		relationProps,
		relationsProps,
		urlParam,
		type UseFormOptions
	} from '$lib/index.js'
	import { api } from '$lib/private/api.js'
	import { modelPost } from '$lib/private/model.js'
	import { POST_PUBLICATION } from '$lib/private/constant.js'

	type _Post = Post & { tags: Tag[]; type: PostType }
	const FormPost: ComponentType<Form<typeof modelPost, _Post>> = Form

	export let formPost: InstanceType<typeof FormPost> | undefined = undefined
	export let post: _Post | undefined = undefined
	export let options: UseFormOptions<_Post> = {}
</script>

<Drawer key="form_post" let:close title={post ? 'Edit post' : 'Create post'}>
	<FormPost
		bind:this={formPost}
		on:success={() => close()}
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
				},
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
				{ key: 'writingDuration', number: { label: 'Duration' } }
			]
		]}
	/>
</Drawer>
