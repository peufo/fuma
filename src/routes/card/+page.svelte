<script lang="ts">
	import { Card, CardBasic, CardLink, CardFullScreen } from '$lib/index.js'
	import Meta from '$lib/Meta.svelte'

	let card: Card
	let cardBasic: CardBasic
	let cardLink: CardLink
	let cardFullScreen: CardFullScreen
</script>

<Meta component={card} name="Card">
	<Card bind:this={card}>
		<div slot="top">Slot "top"</div>
		<h2 slot="title">Slot "title"</h2>
		<h2 slot="subtitle">Slot "subtitle"</h2>
		<div slot="action">Slot "action"</div>
		Default slot
	</Card>
</Meta>

<br />
<Meta component={cardBasic} name="CardBasic">
	<CardBasic bind:this={cardBasic} title="Title">Default slot</CardBasic>
</Meta>

<br />
<Meta component={cardLink} name="CardLink">
	<CardLink bind:this={cardLink} title="Title" href="#">Default slot</CardLink>
</Meta>

<br />
<Meta component={cardFullScreen} name="CardFullScreen">
	<CardFullScreen bind:this={cardFullScreen}>
		<h2 slot="title">Slot "title"</h2>
		<div slot="action">Slot "action"</div>
		Default slot
	</CardFullScreen>
</Meta>
