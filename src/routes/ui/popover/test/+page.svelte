<script lang="ts">
</script>

<div class="overflow-scroll">
	<div class="container">
		<div class="anchor">⚓︎</div>

		<div class="infobox">
			<p>This is an information box.</p>
		</div>
	</div>
</div>

<style>
	.anchor {
		font-size: 1.8rem;
		color: white;
		text-shadow: 1px 1px 1px black;
		background-color: hsl(240 100% 75%);
		width: fit-content;
		border-radius: 10px;
		border: 1px solid black;
		padding: 3px;
	}
	.container {
		width: 2500px;
		height: 2500px;
	}

	.anchor {
		anchor-name: --my-anchor;
		margin: 1200px 1200px;
	}
	.infobox {
		color: darkblue;
		background-color: azure;
		border: 1px solid #dddddd;
		padding: 10px;
		border-radius: 10px;
		font-size: 1rem;
	}
	.infobox {
		position: fixed;
		position-anchor: --my-anchor;
		position-area: top left;

		position-try-fallbacks: flip-block, flip-inline;
		position-try: flip-block, flip-inline;
	}
</style>
