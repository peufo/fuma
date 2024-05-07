<script lang="ts">
	import { Drawer, Form, relationsProps, z, type ZodObj } from '$lib/index.js'
	import { api } from '$lib/private/api.js'
	import type { Post, Tag, Prisma } from '@prisma/client'

	export let post: (Post & { tags: Tag[] }) | undefined = undefined

	const modelPost = {
		content: z.string(),
		aString: z.string(),
		aBoolean: z.boolean(),
		aDate: z.date(),
		aNumber: z.number(),
		tags: z.relations.set
	} satisfies ZodObj<Omit<Prisma.PostCreateInput, 'author'>>
</script>

<Drawer key="form_post" let:close title="Create post">
	<Form
		on:success={() => close()}
		model={modelPost}
		data={post}
		fields={[
			[
				{ key: 'content', colSpan: 4, textrich: {} },
				{
					key: 'tags',
					colSpan: 4,
					relations: relationsProps({
						label: 'Tags',
						search: api.Tag,
						slotItem: (item) => item.name
					})
				}
			],
			[
				{ key: 'aString', text: { label: 'String' } },
				{ key: 'aNumber', number: { label: 'Number' } },
				{ key: 'aBoolean', boolean: { label: 'Boolean' } },
				{ key: 'aDate', datetime: { label: 'Date' } }
			]
		]}
		sections={[{ title: 'My post' }, { title: 'Random fields', isReducible: true }]}
	/>
</Drawer>
