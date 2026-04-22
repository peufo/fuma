<script lang="ts">
import { CarrotIcon } from '@lucide/svelte';
import { Popover, type PopoverType } from '$lib/popover/index.ts';
</script>

{#snippet trigger(popover: PopoverType, label = 'simple')}
	<button class="btn" {...popover.trigger}>{label}</button>
{/snippet}

{#snippet menuCarrot(deep = 0)}
	<ul class="menu">
		{#each [1, 2, 3] as item}
			<Popover listenHover placement="right" class="m-3">
				{#snippet trigger(popover)}
					<li>
						<button class="w-full" {...popover.trigger}>
							Item {item}
						</button>
					</li>
				{/snippet}
				{#if deep >= 2}
					<CarrotIcon size={42} class="p-2" />
				{:else}
					{@render menuCarrot(deep + 1)}
				{/if}
			</Popover>
		{/each}
	</ul>
{/snippet}

<div class="overflow-scroll">
	<div class="m-40 grid h-[180dvh] w-[120dvw] grid-cols-3 gap-20">
		<Popover {trigger}>
			{@render menuCarrot()}
		</Popover>
		<Popover>
			{#snippet trigger(popover)}
				<button class="btn" {...popover.trigger}>focus</button>
			{/snippet}
			{@render menuCarrot()}
		</Popover>
		<Popover listenHover class="my-2">
			{#snippet trigger(popover)}
				<button class="btn" {...popover.trigger}>hover</button>
			{/snippet}
			{@render menuCarrot()}
		</Popover>
		<Popover placement="top">
			{#snippet trigger(popover)}
				<button class="btn" {...popover.trigger}>interest</button>
			{/snippet}
			{@render menuCarrot()}
		</Popover>
		<Popover {trigger} placement="right">{@render menuCarrot()}</Popover>
		<Popover {trigger}>{@render menuCarrot()}</Popover>
		<Popover {trigger} class="mt-auto">{@render menuCarrot()}</Popover>
		<Popover {trigger} class="mt-auto">{@render menuCarrot()}</Popover>
		<Popover {trigger} class="mt-auto">{@render menuCarrot()}</Popover>
	</div>
</div>
