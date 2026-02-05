<script lang="ts">
	import { ChevronLeftIcon, ChevronRightIcon } from '@lucide/svelte'
	import { param, urlParam } from '$lib/state/index.js'
	import { tip } from '$lib/action/tip.js'

	let { take = 20 }: { take?: number } = $props()

	let skip = $derived(+(param.get('skip') || 0))
	$effect(() => {
		take = +(param.get('take') || take)
	})
</script>

<div class="join">
	<a
		href={urlParam.with({ skip: skip - take, take })}
		data-sveltekit-replacestate
		class:btn-disabled={skip - take < 0}
		class="btn btn-square join-item btn-sm"
		use:tip={{ content: 'Afficher les données précédentes' }}
	>
		<ChevronLeftIcon />
	</a>
	<a
		href={urlParam.with({ skip: skip + take, take })}
		data-sveltekit-replacestate
		class="btn join-item btn-sm pr-1"
		use:tip={{ content: 'Afficher les données suivante' }}
	>
		{skip + 1} - {skip + take}
		<ChevronRightIcon />
	</a>
</div>
