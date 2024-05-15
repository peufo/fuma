<script lang="ts">
	let klass = ''
	export { klass as class }
	export let content: string
</script>

<span class="badge mr-1 whitespace-nowrap {klass}">
	{content}
</span>
