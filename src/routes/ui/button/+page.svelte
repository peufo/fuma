<script lang="ts">
	import { getCSV } from '$lib/index.js'
	import Meta from '$lib/private/Meta.svelte'
	import { ButtonCopy, ButtonDelete } from '$lib/ui/button/index.js'
	import { mdiDownload } from '@mdi/js'

	let buttonCopy: ButtonCopy
	let buttonDelete: ButtonDelete

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

<Meta component={buttonCopy} name="ButtonCopy">
	<div class="mx-auto flex gap-2">
		<ButtonCopy bind:this={buttonCopy} title="Copy me !" value="Hey 👋" />
		<ButtonCopy title="Copy async data" value={getValue} icon={mdiDownload} />
	</div>
</Meta>

<Meta component={buttonDelete} name="ButtonDelete" description="Doit être placé dans un <form />">
	<ButtonDelete bind:this={buttonDelete} formaction="?/delete" />
</Meta>
