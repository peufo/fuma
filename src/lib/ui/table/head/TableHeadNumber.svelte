<script lang="ts">
	import { onMount } from 'svelte'
	import type { Instance as TippyInstance } from 'tippy.js'
	import debounce from 'debounce'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'

	import { DropDown, InputNumber } from '$lib/ui/index.js'
	import { urlParam } from '$lib/store/param.js'
	import { jsonParse } from '$lib/utils/jsonParse.js'
	import type { TableField } from '../field.js'

	export let field: TableField

	let tip: TippyInstance
	type Range = { min: string | undefined; max: string | undefined }

	let { min, max } = initRange($page.url)
	onMount(() => page.subscribe(({ url }) => ({ min, max } = initRange(url))))

	function initRange({ searchParams }: URL) {
		return jsonParse<Range>(searchParams.get(field.key), {
			min: undefined,
			max: undefined
		})
	}

	const udpateUrl = debounce(() => {
		if (isDefined(min) || isDefined(max)) {
			goto($urlParam.with({ [field.key]: JSON.stringify({ min, max }) }, 'skip', 'take'), {
				noScroll: true,
				keepFocus: true
			})
			return
		}
		goto($urlParam.without(field.key, 'skip', 'take'), { noScroll: true, keepFocus: true })
	}, 250)

	function handleReset() {
		min = undefined
		max = undefined
		tip.hide()
		goto($urlParam.without(field.key, 'skip', 'take'), { noScroll: true, keepFocus: true })
	}

	function isDefined(v: string | undefined | null): v is string {
		return v !== undefined && v !== null
	}

	$: isNegatifRange = isDefined(min) && isDefined(max) && max < min
</script>

<th class="p-1">
	<DropDown
		bind:tip
		hideOnBlur
		hideOnNav={false}
		autofocus
		tippyProps={{ appendTo: () => document.body }}
	>
		<button slot="activator" class="menu-item min-h-8 w-full flex-wrap gap-y-1">
			<span>{field.label}</span>

			{#if isDefined(min) || isDefined(max)}
				<span class="badge badge-primary badge-xs text-[0.7rem] font-normal text-white">
					{#if isDefined(min)}
						{min} ≤
					{/if}
					x
					{#if isDefined(max)}
						≤ {max}
					{/if}
				</span>
			{/if}
		</button>

		<form class="grid grid-cols-2 gap-2 p-1" on:submit|preventDefault={() => tip.hide()}>
			<InputNumber bind:value={min} on:input={udpateUrl} input={{ placeholder: 'Min' }} />
			<InputNumber
				bind:value={max}
				on:input={udpateUrl}
				hint={isNegatifRange ? 'Doit être plus grand' : ''}
				input={{ placeholder: 'Max' }}
			/>

			<div class="col-span-full flex justify-end gap-2">
				<button class="btn btn-ghost" type="button" on:click={handleReset}>Effacer</button>
				<button class="btn">Ok</button>
			</div>
		</form>
	</DropDown>
</th>
