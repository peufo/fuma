<script lang="ts">
	import { type ComponentType } from 'svelte'

	import { component, type ComponentAndProps } from '$lib/index.js'
	import Span from './Span.svelte'

	type Slot = $$Generic<
		| ((args: Args) => ComponentAndProps | ComponentType | string)
		| ComponentAndProps
		| ComponentType
		| string
	>
	type Args = Slot extends (...args: any) => any ? Parameters<Slot>[0] : undefined

	type $$Props = {
		slot?: Slot | null
		args?: Args | null
	}

	export let slot: Slot | undefined | null = undefined
	export let args: Args | undefined | null = undefined

	function getComponentAndProps(_slot: Slot): ComponentAndProps | null {
		if (typeof _slot === 'function') {
			if (isComponentType(_slot)) return { component: _slot, props: {} }
			if (!args) {
				console.error('args prop is required with slot as function')
				return null
			}
			const result = _slot(args) as Slot
			return getComponentAndProps(result)
		}
		if (typeof _slot === 'object') return _slot
		return component(Span, { content: _slot })
	}

	function isComponentType(fun: Function): fun is ComponentType {
		return !!fun.prototype?.constructor?.name
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
