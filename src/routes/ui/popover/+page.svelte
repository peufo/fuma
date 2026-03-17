<script lang="ts">
	import { CarrotIcon } from '@lucide/svelte';
	import Popover, { type PopoverType } from '$lib/next/popover/Popover.svelte';
</script>

{#snippet carrot()}
	<div class="grid max-w-sm place-content-center">
		<CarrotIcon size={42} opacity={0.4} />
		<p>
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex quo quas tenetur ipsum maxime
			laborum debitis. Animi repellendus inventore amet incidunt deserunt fugit. Numquam doloribus
			illum temporibus eum possimus recusandae.
		</p>
	</div>
{/snippet}

{#snippet activator(popover: PopoverType)}
	<button class="btn" {...popover.activator}>simple</button>
{/snippet}

<div class="overflow-scroll">
	<div class="m-40 grid h-[180dvh] w-[120dvw] grid-cols-3 gap-20">
		<Popover {activator}>
			{@render carrot()}
		</Popover>
		<Popover {activator} listeners={['focus']}>
			{@render carrot()}
		</Popover>
		<Popover {activator}>
			{@render carrot()}
		</Popover>
		<Popover {activator} placement="top">{@render carrot()}</Popover>
		<Popover {activator} placement="right">{@render carrot()}</Popover>
		<Popover {activator}>{@render carrot()}</Popover>
		<Popover {activator} class="mt-auto">{@render carrot()}</Popover>
		<Popover {activator} class="mt-auto">{@render carrot()}</Popover>
		<Popover {activator} class="mt-auto">{@render carrot()}</Popover>
	</div>
</div>
