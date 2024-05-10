<script lang="ts">
	import { Card, Icon, tiptapParser, urlParam } from '$lib/index.js'
	import { mdiPen } from '@mdi/js'
	export let data
</script>

<Card class="group max-w-xl">
	<div class="flex">
		<div class="title-md">By {data.post.author.username}</div>
		<div class="grow"></div>
		<a
			class="btn btn-square btn-sm opacity-0 transition-opacity group-hover:opacity-100"
			href={$urlParam.with({ form_post: data.post.id })}
		>
			<Icon path={mdiPen} size={18} />
		</a>
	</div>
	<div class="flex gap-2">
		{#each data.post.tags as tag}
			<span class="badge">{tag.name}</span>
		{/each}
	</div>

	<div class="prose">{@html tiptapParser.toHTML(data.post.content)}</div>
</Card>
