<script lang="ts">
	import type { Snippet } from 'svelte'
	import { ArrowLeftIcon } from '@lucide/svelte'
	import { contextContainer } from '../context.js'

	let {
		class: klass = '',
		bodyClass = '',
		headerClass = '',
		returnUrl = '',
		style = '',
		title,
		action,
		subtitle,
		top,
		children
	}: {
		class?: string
		bodyClass?: string
		headerClass?: string
		returnUrl?: string
		style?: string
		title?: Snippet
		action?: Snippet
		subtitle?: Snippet
		top?: Snippet
		children: Snippet
	} = $props()

	contextContainer.set('card')
</script>

<div class="card bordered border bg-base-100 shadow-lg {klass}" {style}>
	{@render top?.()}

	<div class="card-body rounded-b-2xl p-2 sm:p-8 {bodyClass}">
		{#if title || action}
			<div class="flex flex-wrap items-center gap-2 {headerClass}">
				{#if returnUrl}
					<a href={returnUrl} class="btn btn-square btn-ghost btn-sm">
						<ArrowLeftIcon size={20} />
					</a>
				{/if}
				{#if title}
					<div class="title grow">
						{@render title()}
					</div>
				{/if}
				{@render action?.()}
			</div>

			{#if subtitle}
				<div class="my-4 text-sm opacity-80">
					{@render subtitle()}
				</div>
			{/if}
		{/if}

		{@render children()}
	</div>
</div>
