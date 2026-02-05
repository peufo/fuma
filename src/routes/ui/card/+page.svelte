<script lang="ts">
	import { Card, CardBasic, CardLink, CardFullScreen } from '$lib/ui/card/index.js'
</script>

<Card class="bg-red-500" bodyClass="bg-green-400">
	{#snippet top()}
		snippet top
	{/snippet}
	{#snippet title()}
		snippet title
	{/snippet}
	{#snippet subtitle()}
		snippet subtitle
	{/snippet}
	{#snippet action()}
		snippet action
	{/snippet}
	<span>children</span>
</Card>

<CardBasic title="Title">Default slot</CardBasic>

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
