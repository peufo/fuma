<script lang="ts">
	import { useCopy } from '$lib/ui/copy/index.js'

	let value = $state('Hey 👋')
	const copy = useCopy({ value: () => value })
</script>

<input type="text" class="input" bind:value />
<button type="button" class="btn" {...copy}> Copy to clipboard </button>
