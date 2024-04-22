<script lang="ts">
	import type { ComponentAndProps } from '$lib/index.js'

	type Slot = $$Generic<((args: Args) => ComponentAndProps) | ComponentAndProps>
	type Args = Slot extends (...args: any) => any ? Parameters<Slot>[0] : undefined

	type $$Props = {
		slot?: Slot | null
		args?: Args | null
	}

	export let slot: Slot | undefined | null = undefined
	export let args: Args | undefined | null = undefined

	function getComponentAndProps(_slot: Slot): ComponentAndProps | null {
		if (typeof _slot === 'object') return _slot
		if (!args) {
			console.error('args prop is required with slot as function')
			return null
		}
		return _slot(args)
	}
</script>

{#if slot}
	{@const s = getComponentAndProps(slot)}
	{#if s !== null}
		<svelte:component this={s.component} {...s.props} />
	{/if}
{:else}
	<slot />
{/if}
