<script lang="ts">
	import { useCopy } from '$lib/ui/copy/index.js'

	const copy = useCopy({ value: 'Hey 👋' })
</script>

<button type="button" class="btn" {...copy}> Copy to clipboard </button>
