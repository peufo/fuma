<script lang="ts">
	import InputSelectNative from '$lib/next/input/InputSelectNative.svelte';
	import Popover from './Popover.svelte';
</script>

<div class="overflow-scroll">
	<div class="grid h-[180dvh] w-[120dvw] grid-cols-3 gap-20">
		<Popover />
		<Popover />
		<Popover />
		<Popover placement="top" />
		<Popover placement="right" />
		<Popover />
		<Popover class="mt-auto" />
		<Popover class="mt-auto" />
		<Popover class="mt-auto" />
	</div>
</div>
