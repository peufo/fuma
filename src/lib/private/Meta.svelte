<script lang="ts">
	import { Card } from '$lib/ui/card/index.js'

	export let name = ''
	export let description = ''
</script>

<Card class="mx-auto mb-6 max-w-4xl">
	<div slot="title" class="flex items-center gap-4">
		<span class="grow">{name}</span>
	</div>

	<svelte:fragment slot="subtitle">{description}</svelte:fragment>

	<slot />
</Card>
