<script lang="ts">
	import { Card, Icon, urlParam } from '$lib/index.js'
	import { tiptapParser } from '$lib/ui/input/textRich/tiptapParser.js'
	import { mdiPen, mdiPlus } from '@mdi/js'
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

<div class="flex flex-col gap-4">
	{#each data.posts as post}
		<Card class="group max-w-xl">
			<div class="flex">
				<div class="title-md">By {post.author.username}</div>
				<div class="grow"></div>
				<a
					class="btn btn-square btn-sm opacity-0 transition-opacity group-hover:opacity-100"
					href={$urlParam.with({ form_post: post.id })}
				>
					<Icon path={mdiPen} size={18} />
				</a>
			</div>
			<div class="flex gap-2">
				{#each post.tags as tag}
					<span class="badge">{tag.name}</span>
				{/each}
			</div>

			<div>{@html tiptapParser.toHTML(post.content)}</div>
		</Card>
	{/each}
</div>
