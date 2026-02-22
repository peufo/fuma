<script lang="ts">
	import { param, urlParam } from '$lib/next/state/param.svelte.ts';
	import { type Options, parseOptions } from '$lib/utils/options.js';

	let klass = '';
	export { klass as class };
	export let key: string;
	export let options: Options;
	export let removeKeys: string[] = [];

	$: _options = parseOptions(options);
</script>

<div class="join {klass}">
	{#each _options as opt}
		{@const active = param.hasValue(key, opt.value)}
		<a
			href={urlParam.toggle({ [key]: opt.value }, ...removeKeys)}
			class="btn join-item btn-sm"
			class:btn-primary={active}
			class:w-9={opt.icon}
		>
			{#if opt.icon}
				<opt.icon
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
