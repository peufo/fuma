<script lang="ts" module>
	type Alignement = 'start' | 'end';
	type Position = 'left' | 'right' | 'top' | 'bottom';
	type Placement = Position | `${Position}-${Alignement}`;

	const placements: Record<Placement, string> = {
		top: 'top',
		'top-end': 'top span-left',
		'top-start': 'top span-right',
		bottom: 'bottom',
		'bottom-end': 'bottom span-left',
		'bottom-start': 'bottom span-right',
		left: 'left',
		'left-end': 'left span-top',
		'left-start': 'left span-bottom',
		right: 'right',
		'right-end': 'right span-top',
		'right-start': 'right span-bottom'
	};
</script>

<script lang="ts">
	import { CarrotIcon } from '@lucide/svelte';
	import type { ClassValue } from 'svelte/elements';

	const uid = $props.id();
	const anchorName = $derived(`--anchor-${uid}`);

	let {
		class: klass = '',
		placement = 'bottom-start'
	}: {
		class?: ClassValue;
		placement?: Placement;
	} = $props();

	let popover = $state<HTMLDivElement>();
</script>

<button
	onclick={() => popover?.togglePopover()}
	style="anchor-name: {anchorName};"
	class={['btn', klass]}
>
	{placement}
</button>

<div
	bind:this={popover}
	popover
	class="rounded-box border bg-base-100 shadow-sm"
	style="
		position-anchor: {anchorName};
		position-area: {placements[placement]};
	"
>
	<div class="grid place-content-center">
		<CarrotIcon size={42} opacity={0.4} />
		<p>
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex quo quas tenetur ipsum maxime
			laborum debitis. Animi repellendus inventore amet incidunt deserunt fugit. Numquam doloribus
			illum temporibus eum possimus recusandae.
		</p>
	</div>
</div>

<style>
	div[popover] {
		inset: auto;
		position-try: flip-x, flip-y;
	}

	div[popover]:popover-open {
		transition-property: opacity, scale;
		transition-duration: 150ms;
		opacity: 1;
		scale: 1;
		@starting-style {
			opacity: 0;
			scale: 0.95;
		}
	}
</style>
