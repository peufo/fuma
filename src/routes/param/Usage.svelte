<script lang="ts">
	import { param, urlParam } from '$lib/state/index.ts'

	let value = $state('')
</script>

<input type="text" bind:value class="input" />

<ul>
	<li>{param.with({ key: value })}</li>
	<li>{urlParam.with({ key: value })}</li>
</ul>
