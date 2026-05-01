<script lang="ts">
	import DocExample from '$lib/_doc/DocExample.svelte'
	import { DocSection } from '$lib/_doc/index.ts'
	import { fruitsOptions } from '$lib/_doc/data.ts'
	import Usage from './Usage.svelte'
	import usageCode from './Usage.svelte?raw'
	import { resolve } from '$app/paths'
	import { page } from '$app/state'
	let { children } = $props()
</script>

<DocSection title="Param" description="TODO: write a small description">
	<DocExample code={usageCode}>
		{#snippet preview()}<Usage />{/snippet}
	</DocExample>
</DocSection>

<span>Pages :</span>
<div class="flex gap-2">
	<a class="btn" href={resolve('/param/')}>
		<span>/</span>
	</a>
	{#each Object.entries(fruitsOptions) as [fruit, option] (fruit)}
		<a
			href={resolve('/param/[fruit]', { fruit })}
			class={['btn', page.params.fruit === fruit && 'btn-active ring']}
		>
			<option.icon size={18} />
			{option.label}
		</a>
	{/each}
</div>

{@render children()}
