<svelte:options accessors={true} />

<script lang="ts">
	import { Drawer, Form, relationsProps, urlParam, type UseFormOptions } from '$lib/index.js'
	import { api } from '$lib/private/api.js'
	import { modelPost } from '$lib/private/model.js'
	import { mdiTagPlusOutline } from '@mdi/js'
	import type { Post, Tag } from '@prisma/client'
	type PostWithTags = Post & { tags: Tag[] }
	export let post: PostWithTags | undefined = undefined
	export let formPost: Form<typeof modelPost, PostWithTags> | undefined = undefined
	export let options: UseFormOptions<PostWithTags> = {}
</script>

<Drawer key="form_post" let:close title={post ? 'Edit post' : 'Create post'}>
	<Form
		bind:this={formPost}
		on:success={() => close()}
		action="/CRUD?/post"
		{options}
		model={modelPost}
		data={post || {}}
		fields={[
			[
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
				{ key: 'aString', text: { label: 'String' } }
			],
			[
				{ key: 'aNumber', number: { label: 'Number' } },
				{ key: 'aBoolean', boolean: { label: 'Boolean' } },
				{ key: 'aDate', datetime: { label: 'Date' } }
			]
		]}
		sections={[{ title: 'My post' }, { title: 'Random fields', isReducible: true }]}
	/>
</Drawer>
