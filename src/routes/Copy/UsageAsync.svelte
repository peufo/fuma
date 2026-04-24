<script lang="ts">
	import { ButtonCopy } from '$lib/ui/copy/index.js'

	async function getValue() {
		await wait(1500)
		return 'Hey 👋'
	}

	async function wait(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms))
	}
</script>

<ButtonCopy title="Copy async data" value={getValue} />
