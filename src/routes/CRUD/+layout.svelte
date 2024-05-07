<script lang="ts">
	import PostDrawer from './PostDrawer.svelte'
	export let data
</script>

<slot />

<PostDrawer post={data.post} />
