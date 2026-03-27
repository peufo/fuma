<script lang="ts">
	import { CarrotIcon } from '@lucide/svelte';
	import type { ClassValue } from 'svelte/elements';
	import { Popover, type PopoverType } from '$lib/next/popover/index.ts';
</script>

{#snippet activator(popover: PopoverType, label = 'simple')}
	<button class="btn" {...popover.activator}>{label}</button>
{/snippet}

{#snippet carrot()}
	<div class={['grid max-w-sm place-content-center p-4']}>
		<CarrotIcon size={42} opacity={0.4} />
		<p>
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex quo quas tenetur ipsum maxime
			laborum debitis. Animi repellendus inventore amet incidunt deserunt fugit. Numquam doloribus
			illum temporibus eum possimus recusandae.
		</p>
	</div>
{/snippet}

<div class="overflow-scroll">
	<div class="m-40 grid h-[180dvh] w-[120dvw] grid-cols-3 gap-20">
		<Popover {activator}>
			{@render carrot()}
		</Popover>
		<Popover listeners={['focus']}>
			{#snippet activator(popover)}
				<button class="btn" {...popover.activator}>focus</button>
			{/snippet}
			{@render carrot()}
		</Popover>
		<Popover listeners={['hover']} class="my-10">
			{#snippet activator(popover)}
				<button class="btn" {...popover.activator}>hover</button>
			{/snippet}
			{@render carrot()}
		</Popover>
		<Popover placement="top" listeners={['hover']}>
			{#snippet activator(popover)}
				<button class="btn" {...popover.activator}>interest</button>
			{/snippet}
			{@render carrot()}
		</Popover>
		<Popover {activator} placement="right">{@render carrot()}</Popover>
		<Popover {activator}>{@render carrot()}</Popover>
		<Popover {activator} class="mt-auto">{@render carrot()}</Popover>
		<Popover {activator} class="mt-auto">{@render carrot()}</Popover>
		<Popover {activator} class="mt-auto">{@render carrot()}</Popover>
	</div>
</div>
