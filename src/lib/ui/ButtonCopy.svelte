<script lang="ts">
	import { mdiClipboardTextOutline } from '@mdi/js'
	import { toast } from 'svelte-sonner'

	import { Icon } from '$lib/ui/index.js'

	export let value: string
	export let title: string
	export let successMessage = 'Copied'

	function handleClick() {
		navigator.clipboard
			.writeText(value)
			.then(() => {
				toast.success(successMessage)
			})
			.catch((error) => {
				toast.error(error)
			})
	}
</script>

<button on:click|preventDefault={handleClick} class="btn btn-square btn-ghost btn-sm">
	<Icon path={mdiClipboardTextOutline} {title} size={22} />
</button>
