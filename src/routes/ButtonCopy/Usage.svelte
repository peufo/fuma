<script lang="ts">
	import { ButtonCopy } from '$lib/ui/button/index.js'

	async function getValue(): Promise<string> {
		await wait(1500)
		return JSON.stringify([
			{ name: 'Bob', age: 24 },
			{ name: 'Alice', age: 42 }
		])
	}

	async function wait(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms))
	}
</script>

<div class="flex gap-2">
	<ButtonCopy title="Copy me !" value="Hey 👋" />
	<ButtonCopy title="Copy async data" value={getValue} />
</div>
