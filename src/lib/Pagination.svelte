<script lang="ts">
	import { mdiChevronLeft, mdiChevronRight } from '@mdi/js'
	import { Icon } from '$lib/index.js'
	import { urlParam } from '$lib/store/index.js'

	export let take = 20

	$: skip = +($urlParam.get('skip') || 0)
	$: _take = +($urlParam.get('take') || take)
</script>

<div class="join">
	<a
		href={$urlParam.with({ skip: skip - _take, take: _take })}
		data-sveltekit-replacestate
		class:btn-disabled={skip - _take < 0}
		class="btn btn-square join-item btn-sm"
	>
		<Icon path={mdiChevronLeft} title="Afficher les données précédentes" />
	</a>
	<a
		href={$urlParam.with({ skip: skip + _take, take: _take })}
		data-sveltekit-replacestate
		class="btn join-item btn-sm pr-1"
	>
		{skip + 1} - {skip + _take}
		<Icon path={mdiChevronRight} title="Afficher les données suivantes" />
	</a>
</div>
