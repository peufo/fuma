<script lang="ts">
	import { Card, CardBasic } from '$lib/index.js'
	import Meta from '$lib/Meta.svelte'

	let card: Card
	let cardBasic: CardBasic
</script>

<Meta component={card} name="Card">
	<Card bind:this={card}>
		<div slot="top">Slot "top"</div>
		<h2 slot="title">Slot "title"</h2>
		<h2 slot="subtitle">Slot "subtitle"</h2>
		<div slot="action">Slot "action"</div>
	</Card>
</Meta>

<br />

<Meta component={cardBasic} name="CardBasic">
	<CardBasic bind:this={cardBasic} title="Title">Default slot</CardBasic>
</Meta>
