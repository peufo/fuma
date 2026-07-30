<script lang="ts" module>
	import type { CreateSingletonInstance } from 'tippy.js'
	import { createSingleton, type TippyInstance } from '$lib/utils/tippy.js'

	let sigleton: CreateSingletonInstance | null = null
	const tips: TippyInstance[] = []
</script>

<script lang="ts">
	import { tippy, type TippyProps } from '$lib/utils/tippy.js'
	import { onMount, type Snippet } from 'svelte'
	import { beforeNavigate } from '$app/navigation'
	import './dropdown.css'

	let {
		tippyProps = {},
		class: klass = '',
		classWrapper = '',
		classActivator = '',
		useSingleton = false,
		autofocus = false,
		hideOnBlur = false,
		hideOnNav = true,
		disable = false,
		tip = $bindable(),
		content,
		activator,
		children
	}: {
		tippyProps?: Partial<TippyProps>
		class?: string
		classWrapper?: string
		classActivator?: string
		useSingleton?: boolean
		autofocus?: boolean
		hideOnBlur?: boolean
		hideOnNav?: boolean
		tip?: TippyInstance
		// By pass dropdown for use in flat mode
		disable?: boolean
		content?: HTMLDivElement
		activator?: Snippet<[{ tip?: TippyInstance; hide: () => void; show: () => void }]>
		children: Snippet<[{ tip?: TippyInstance; hide: () => void; show: () => void }]>
	} = $props()

	let activatorElement: HTMLDivElement | undefined = $state()

	beforeNavigate(() => hideOnNav && hide())

	onMount(() => {
		if (disable || !activatorElement) return

		const triggerTarget = activatorElement.querySelector('button, input') || activatorElement
		const focusables = Array.from(
			content!.querySelectorAll<HTMLInputElement>(
				'a[href], button, input, textarea, select, details, [tabindex]'
			)
		)
		tip = tippy(activatorElement, {
			content,
			placement: 'bottom-start',
			theme: 'dropdown',
			arrow: false,
			triggerTarget,
			trigger: 'click focus',
			interactive: true,
			interactiveDebounce: 50,
			moveTransition: 'transform 0.1s ease-out',
			appendTo: 'parent',
			onShown() {
				if (autofocus) focusables[0]?.select()
			},
			...tippyProps
		})

		if (useSingleton && tip) {
			tips.push(tip)
			if (!sigleton) {
				sigleton = createSingleton(tips, tip.props)
			} else {
				sigleton?.setInstances(tips)
			}
		}

		const lastFocusable = focusables.at(-1)
		if (hideOnBlur) lastFocusable?.addEventListener('blur', hide)

		return () => {
			if (hideOnBlur) lastFocusable?.removeEventListener('blur', hide)
			if (useSingleton && tip) {
				tips.splice(tips.indexOf(tip), 1)
				tip.destroy()
				if (tips.length === 0) {
					sigleton?.destroy()
					sigleton = null
				}
			}
		}
	})

	export function hide() {
		if (!tip) return
		if (useSingleton) sigleton?.hide()
		else tip.hide()
	}

	export function show() {
		tip?.show()
	}
	export function setTippyProps(props: Partial<TippyProps>) {
		tip?.setProps(props)
	}
</script>

{#if !disable}
	<div class={classWrapper}>
		<div class={classActivator} bind:this={activatorElement}>
			{@render activator?.({ tip, hide, show })}
		</div>

		<div class="hidden">
			<div class="{klass} rounded-lg border bg-base-100 p-1 shadow-lg" bind:this={content}>
				{@render children({ tip, hide, show })}
			</div>
		</div>
	</div>
{:else}
	<div class={classWrapper}>
		{@render activator?.({ tip, hide, show })}
		<div class="{klass} mt-2">
			{@render children({ tip, hide, show })}
		</div>
	</div>
{/if}
