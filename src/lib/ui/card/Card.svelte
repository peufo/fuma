<script lang="ts">
	import { mdiArrowLeft } from '@mdi/js'
	import { Icon } from '$lib/index.js'

	let klass = ''
	export { klass as class }
	export let bodyClass = ''
	export let headerClass = ''
	export let returnUrl = ''
	export let style = ''
</script>

<div class="card bordered border bg-base-100 shadow-lg {klass}" {style}>
	<slot name="top" />

	<div class="card-body p-2 sm:p-8 {bodyClass}">
		{#if $$slots.title || $$slots.action}
			<div class="flex flex-wrap items-center gap-2 {headerClass}">
				{#if returnUrl}
					<a href={returnUrl} class="btn btn-square btn-ghost btn-sm">
						<Icon path={mdiArrowLeft} size={20} />
					</a>
				{/if}

				<div class="title grow">
					<slot name="title" />
				</div>
				<slot name="action" />
			</div>

			{#if $$slots.subtitle}
				<div class="my-4 text-sm opacity-80">
					<slot name="subtitle" />
				</div>
			{/if}
		{/if}

		<slot />
	</div>
</div>
