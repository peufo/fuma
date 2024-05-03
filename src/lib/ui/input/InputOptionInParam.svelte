<script lang="ts">
	import { Icon } from '$lib/ui/icon/index.js'
	import { parseOptions, type Options } from '$lib/utils/options.js'
	import { urlParam } from '$lib/store/param.js'

	let klass = ''
	export { klass as class }
	export let key: string
	export let options: Options
	export let removeKeys: string[] = []

	$: _options = parseOptions(options)
</script>

<div class="join {klass}">
	{#each _options as opt}
		{@const active = $urlParam.hasValue(key, opt.value)}
		<a
			href={$urlParam.toggle({ [key]: opt.value }, ...removeKeys)}
			class="btn join-item btn-sm"
			class:btn-primary={active}
			class:w-9={opt.icon}
		>
			{#if opt.icon}
				<Icon
					path={opt.icon}
					title={opt.label}
					class={active ? 'fill-primary-content' : 'opacity-70'}
					size={20}
				/>
			{:else}
				{opt.label}
			{/if}
		</a>
	{/each}
</div>
