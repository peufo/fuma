<script lang="ts" module>
	import { fruitsOptions } from '$lib/data.ts'
</script>

<ul>
	{#each Object.entries(fruitsOptions) as [value, option] (value)}
		<li>
			<a class="menu-item" href="#{value}">
				<option.icon />
				<span>{option.label}</span>
			</a>
		</li>
	{/each}
</ul>
