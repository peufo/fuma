<script lang="ts">
import { Dialog } from '$lib/ui/dialog/index.js';
</script>

<Dialog>
	{#snippet activator({ showModal })}
		<button class="btn" onclick={showModal}>Ouvrir dialog</button>
	{/snippet}
	{#snippet header()}
		<div>snippet="header"</div>
	{/snippet}
	children
	{#snippet footer()}
		<div>snippet="footer"</div>
	{/snippet}
</Dialog>

<div class="my-40 h-350 rounded bg-green-300/30"></div>
