<script lang="ts">
	import InputSelectNative from '$lib/next/input/InputSelectNative.svelte';
	import Popover from './Popover.svelte';
</script>

<div class="overflow-scroll">
	<div class="grid h-[230dvh] grid-cols-3">
		<Popover />
		<Popover />
		<Popover />
		<InputSelectNative label="test" options={['asd', 'adsad', 'asdasd']} />
		<Popover />
		<Popover />
		<Popover />
		<Popover class="mt-auto" />
		<Popover class="mt-auto" />
		<Popover class="mt-auto" />
	</div>
</div>
