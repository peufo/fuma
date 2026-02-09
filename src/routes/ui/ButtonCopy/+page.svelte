<script lang="ts">
	import { getCSV } from '$lib/index.js'
	import { ButtonCopy } from '$lib/ui/button/index.js'

	async function getValue() {
		await wait(1500)
		const users = [
			{ name: 'Bob', age: 24 },
			{ name: 'Alice', age: 42 }
		]

		return getCSV(users, { name: (user) => user.name, age: (user) => user.age })
	}

	async function wait(ms: number) {
		return new Promise((resolve) => {
			setTimeout(resolve, ms)
		})
	}
</script>

<div class="mx-auto flex gap-2">
	<ButtonCopy title="Copy me !" value="Hey 👋" />
	<ButtonCopy title="Copy async data" value={getValue} />
</div>
