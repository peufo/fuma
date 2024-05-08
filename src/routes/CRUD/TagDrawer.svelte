<script lang="ts">
	import { Drawer, Form, type UseFormOptions } from '$lib/index.js'

	import { modelTag } from '$lib/private/model.js'
	import type { Tag } from '@prisma/client'
	import { createEventDispatcher } from 'svelte'

	export let tag: Tag | undefined = undefined
	export let options: UseFormOptions<Tag> = {}

	const dispatch = createEventDispatcher<{ created: Tag; updated: Tag; deleted: void }>()
</script>

<Drawer key="form_tag" let:close title={tag ? 'Edit tag' : 'Create tag'}>
	<Form
		on:success
		on:created={({ detail }) => close().then(() => dispatch('created', detail))}
		on:updated={({ detail }) => close().then(() => dispatch('updated', detail))}
		on:deleted={() => close().then(() => dispatch('deleted'))}
		action="/CRUD?/tag"
		{options}
		model={modelTag}
		data={tag || {}}
		fields={[
			[{ key: 'name', colSpan: 4, text: { label: 'Tag name', input: { autofocus: true } } }]
		]}
	/>
</Drawer>
