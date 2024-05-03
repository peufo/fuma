<script lang="ts">
	import { mdiArrowCollapse, mdiArrowExpand } from '@mdi/js'
	import { Icon } from '$lib/ui/icon/index.js'
	import { Card } from '$lib/ui/card/index.js'

	export let isFullScreen = false
	let klass = ''
	export { klass as class }
</script>

<Card
	class="{isFullScreen ? 'fixed inset-2 p-2' : ''} {klass}"
	bodyClass={isFullScreen ? 'sm:p-2 grow overflow-hidden' : ''}
>
	<div class="contents" slot="title">
		<slot name="title" />
	</div>

	<div slot="action" class="flex gap-2">
		<slot name="action" />
		<button class="btn btn-square btn-sm" on:click={() => (isFullScreen = !isFullScreen)}>
			{#if isFullScreen}
				<Icon path={mdiArrowCollapse} />
			{:else}
				<Icon path={mdiArrowExpand} />
			{/if}
		</button>
	</div>

	<slot {isFullScreen} />
</Card>
