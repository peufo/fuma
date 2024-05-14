<script lang="ts">
	import PostDrawer from './PostDrawer.svelte'
	import TagDrawer from './TagDrawer.svelte'
	export let data

	let postDrawer: PostDrawer
</script>

<slot />

<PostDrawer post={data.post} bind:this={postDrawer} />

<TagDrawer
	tag={data.tag}
	on:created={({ detail }) => {
		postDrawer.postForm?.update((post) => ({ ...post, tags: [...(post.tags || []), detail] }))
	}}
/>
