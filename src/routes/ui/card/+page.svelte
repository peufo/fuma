<script lang="ts">
	import { Card, CardLink, CardFullScreen } from '$lib/ui/card/index.js'
</script>

<Card class="bg-red-500" bodyClass="bg-green-400">
	{#snippet snipTop()}
		snippet top
	{/snippet}
	{#snippet snipTitle()}
		snippet title
	{/snippet}
	{#snippet snipSubtitle()}
		snippet subtitle
	{/snippet}
	{#snippet snipAction()}
		snippet action
	{/snippet}
	<span>children</span>
</Card>

<CardLink title="Title" href="#">Default slot</CardLink>

<CardFullScreen>
	{#snippet title()}
		<h2>snippet title</h2>
	{/snippet}
	{#snippet action()}
		<div>snippet action</div>
	{/snippet}
	<span>children</span>
</CardFullScreen>
