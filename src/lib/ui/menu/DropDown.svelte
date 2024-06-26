<script lang="ts" context="module">
	import { createSingleton, type TippyInstance } from '$lib/utils/tippy.js'

	const sigleton = browser
		? createSingleton([], {
				theme: 'dropdown',
				arrow: false,
				moveTransition: 'transform 0.1s ease-out',
				interactive: true,
				interactiveDebounce: 50
			})
		: null

	const tips: TippyInstance[] = []
</script>

<script lang="ts">
	import { tippy, type TippyProps } from '$lib/utils/tippy.js'
	import { onMount } from 'svelte'
	import { browser } from '$app/environment'
	import { beforeNavigate } from '$app/navigation'
	import './dropdown.css'

	export let tippyProps: Partial<TippyProps> = {}
	let klass = ''
	export { klass as class }
	export let classWrapper = ''
	export let classActivator = ''
	export let useSingleton = false
	export let autofocus = false
	export let hideOnBlur = false
	export let hideOnNav = true
	export let tip: TippyInstance | undefined = undefined
	// By pass dropdown for use in flat mode
	export let disable = false
	export let content: HTMLDivElement | undefined = undefined
	let activator: HTMLDivElement

	beforeNavigate(() => hideOnNav && hide())

	onMount(() => {
		if (disable) return

		const triggerTarget = activator.querySelector('button, input') || activator
		const focusables = Array.from(
			content!.querySelectorAll<HTMLInputElement>(
				'a[href], button, input, textarea, select, details, [tabindex]'
			)
		)
		tip = tippy(activator, {
			content,
			placement: 'bottom-start',
			theme: 'dropdown',
			arrow: false,
			triggerTarget,
			trigger: 'click focus',
			interactive: true,
			interactiveDebounce: 50,
			appendTo: 'parent',
			onShown() {
				if (autofocus) focusables[0]?.select()
			},
			...tippyProps
		})

		if (useSingleton && tip) {
			tips.push(tip)
			sigleton?.setInstances(tips)
		}

		const lastFocusable = focusables.at(-1)
		if (hideOnBlur) lastFocusable?.addEventListener('blur', hide)

		return () => {
			if (hideOnBlur) lastFocusable?.removeEventListener('blur', hide)
			if (useSingleton && tip) {
				tips.splice(tips.indexOf(tip), 1)
				tip.destroy()
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
		<div class={classActivator} bind:this={activator}>
			<slot name="activator" />
		</div>

		<div class="hidden">
			<div
				class="{klass} max-h-80 overflow-auto rounded-lg border bg-base-100 p-1 shadow-lg"
				bind:this={content}
			>
				<slot />
			</div>
		</div>
	</div>
{:else}
	<div class={classWrapper}>
		<slot name="activator" />
		<div class="{klass} mt-2">
			<slot />
		</div>
	</div>
{/if}
