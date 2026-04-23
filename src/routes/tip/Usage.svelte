<script lang="ts">
	import { tip } from '$lib/action/index.ts'
</script>

<div class="mx-auto my-10 max-w-xl">
	<div class="h-12 w-12 bg-yellow-400" use:tip={{ content: 'Hello !' }}>hover me</div>
</div>
