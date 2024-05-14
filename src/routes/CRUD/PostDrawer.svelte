<svelte:options accessors={true} />

<script lang="ts">
	import { Drawer } from '$lib/index.js'
	import PostForm, { type PostWithTags, type PostFormInstance } from './PostForm.svelte'

	export let postForm: PostFormInstance | undefined = undefined
	export let post: PostWithTags | undefined = undefined
</script>

<Drawer key="form_post" let:close title={post ? 'Edit post' : 'Create post'}>
	<PostForm {post} on:success={() => close()} bind:postForm />
</Drawer>
