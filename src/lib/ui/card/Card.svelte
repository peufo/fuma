<script lang="ts">
	import { ArrowLeftIcon } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import type { ClassValue, HTMLAttributes } from 'svelte/elements';

	let {
		class: _class,
		bodyClass,
		headerClass,
		returnUrl = '',
		snipTitle,
		snipAction,
		snipSubtitle,
		snipTop,
		children,
		...props
	}: {
		bodyClass?: ClassValue;
		headerClass?: ClassValue;
		returnUrl?: string;
		snipTitle?: Snippet;
		snipAction?: Snippet;
		snipSubtitle?: Snippet;
		snipTop?: Snippet;
		children: Snippet;
	} & HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class={['bordered card border bg-base-100 shadow-lg', _class]} {...props}>
	{@render snipTop?.()}

	<div class={['card-body rounded-b-lg p-2 sm:p-8', bodyClass]}>
		{#if snipTitle || snipAction}
			<div class={['flex flex-wrap items-center gap-2', headerClass]}>
				{#if returnUrl}
					<a href={returnUrl} class="btn btn-square btn-ghost btn-sm">
						<ArrowLeftIcon size={20} />
					</a>
				{/if}
				{#if snipTitle}
					<div class="title grow">
						{@render snipTitle()}
					</div>
				{/if}
				{@render snipAction?.()}
			</div>

			{#if snipSubtitle}
				<div class="my-4 text-sm opacity-80">
					{@render snipSubtitle()}
				</div>
			{/if}
		{/if}

		{@render children()}
	</div>
</div>
