<script lang="ts">
	import Meta from '$lib/private/Meta.svelte'
	import { Card, CardBasic, CardCollapse, CardLink, CardFullScreen } from '$lib/ui/card/index.js'

	let card: Card
	let cardBasic: CardBasic
	let cardCollapse: CardCollapse
	let cardLink: CardLink
	let cardFullScreen: CardFullScreen
</script>

<Meta component={card} name="Card">
	<Card bind:this={card} class="bg-red-500" bodyClass="bg-green-400">
		<div slot="top">slot="top"</div>
		<h2 slot="title">slot="title"</h2>
		<h3 slot="subtitle">slot="subtitle"</h3>
		<div slot="action">slot="action"</div>
		Default slot
	</Card>
</Meta>

<Meta component={cardBasic} name="CardBasic">
	<CardBasic bind:this={cardBasic} title="Title">Default slot</CardBasic>
</Meta>

<Meta component={cardCollapse} name="CardCollapse (deprecated)">
	<CardCollapse value="my-section" bind:this={cardCollapse}>
		<h2 slot="title">
			slot="title"
			<a href="#prout" class="link-hover link">link</a>
		</h2>
		<h3 slot="subtitle">
			slot="subtitle"
			<a href="#prout-b" class="link-hover link">
				<span>other link</span>
			</a>
		</h3>
		Default slot
	</CardCollapse>
</Meta>

<Meta component={cardLink} name="CardLink">
	<CardLink bind:this={cardLink} title="Title" href="#">Default slot</CardLink>
</Meta>

<Meta component={cardFullScreen} name="CardFullScreen">
	<CardFullScreen bind:this={cardFullScreen}>
		<h2 slot="title">slot="title"</h2>
		<div slot="action">slot="action"</div>
		Default slot
	</CardFullScreen>
</Meta>
