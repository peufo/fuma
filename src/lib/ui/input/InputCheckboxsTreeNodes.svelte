<script lang="ts" context="module">
	export type OptionsNode = Record<
		string,
		{ label: string; value?: boolean; options?: OptionsNode }
	>
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { InputBoolean } from '$lib/ui/input/index.js'
	export let options: OptionsNode

	type Events = { setTrue: void }
	const dispatch = createEventDispatcher<Events>()

	function handleChange(newValue: boolean, option: OptionsNode[string]) {
		if (newValue === true) dispatch('setTrue')
		else if (option.options) {
			option.options = setFalse(option.options)
		}
	}

	function setFalse(_options?: OptionsNode): OptionsNode | undefined {
		if (!_options) return undefined
		return Object.entries(_options).reduce<OptionsNode>(
			(acc, [key, opt]) => ({
				...acc,
				[key]: {
					label: opt.label,
					value: false,
					options: setFalse(opt.options)
				}
			}),
			{}
		)
	}
</script>

{#each Object.keys(options) as key (key)}
	<InputBoolean
		{key}
		label={options[key].label}
		bind:value={options[key].value}
		on:change={({ detail }) => handleChange(detail, options[key])}
	/>

	{#if options[key].options}
		<div class="flex">
			<div class="relative -mt-[6px] ml-3 w-3">
				{#each Object.keys(options[key].options || {}) as k, index}
					<div
						style:height="{24 + index * 36}px"
						class="t-0 bordered absolute w-3 rounded-bl-lg border-b-2 border-l-2"
					></div>
				{/each}
			</div>
			<div>
				<svelte:self
					options={options[key].options}
					on:setTrue={() => {
						options[key].value = true
						dispatch('setTrue')
					}}
				/>
			</div>
		</div>
	{/if}
{/each}
