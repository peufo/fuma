<script lang="ts">
	import { Icon, urlParam } from '$lib/index.js'
	import { mdiPlus } from '@mdi/js'
</script>

<h2 class="title">CRUD</h2>

<a class="btn" href={$urlParam.with({ form_post: 1 })}>
	<Icon path={mdiPlus} />
	<span>Create post</span>
</a>
