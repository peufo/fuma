<script lang="ts">
	import { urlParam } from '$lib/state/param.js'
	import { Drawer } from '$lib/ui/drawer/index.js'
</script>

<a class="btn" href={urlParam.with({ 'drawer-1': 1 })} data-sveltekit-noscroll> Open drawer 1</a>

<Drawer title="Drawer 1" key="drawer-1">
	<h2 class="text-xl font-semibold text-base-content/70">Hey 1</h2>
	<a class="btn" href={urlParam.with({ 'drawer-2': 1 })} data-sveltekit-noscroll> Open drawer 2 </a>
</Drawer>
<Drawer title="Drawer 3" key="drawer-3">
	<h2 class="text-xl font-semibold text-base-content/70">Hey 3</h2>
</Drawer>
<Drawer title="Drawer 2" key="drawer-2">
	<h2 class="text-xl font-semibold text-base-content/70">Hey 2</h2>
	<a class="btn" href={urlParam.with({ 'drawer-3': 1 })} data-sveltekit-noscroll> Open drawer 3 </a>
</Drawer>

<a class="btn" href={urlParam.with({ drawer_no_overlay: 1 })} data-sveltekit-noscroll>
	Open no overlay drawer
</a>

<Drawer title="No overlay brpo" key="drawer_no_overlay" noOverlay maxWidth="200px">
	<h2 class="text-xl font-semibold text-base-content/70">Hey</h2>
	<p>Open drawer not overlay</p>
</Drawer>
