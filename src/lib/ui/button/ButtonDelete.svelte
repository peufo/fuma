<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { HTMLButtonAttributes, MouseEventHandler } from 'svelte/elements'

	let {
		btn = true,
		children,
		formaction = '',
		onclick: onclickProp,
		onmouseleave: onmouseleaveProp,
		...props
	}: {
		formaction: string
		btn?: boolean
		children?: Snippet<[{ waitConfirmation: boolean }]>
	} & HTMLButtonAttributes = $props()

	let button: HTMLButtonElement
	let waitConfirmation = $state(false)
	let timeout: NodeJS.Timeout

	const onclick: MouseEventHandler<HTMLButtonElement> = (event) => {
		onclickProp?.(event)
		if (waitConfirmation) return
		event.preventDefault()
		button.style.width = `${button.offsetWidth}px`
		waitConfirmation = true
		timeout = setTimeout(() => {
			waitConfirmation = false
			button.style.width = ''
		}, 2000)
	}

	const onmouseleave: MouseEventHandler<HTMLButtonElement> = (event) => {
		onmouseleaveProp?.(event)
		waitConfirmation = false
		button.style.width = ''
		clearTimeout(timeout)
	}
</script>

<button
	bind:this={button}
	class={[
		btn && [
			'btn',
			waitConfirmation ? 'btn-outline btn-error' : 'text-error btn-ghost',
			props.disabled && 'btn-disabled'
		]
	]}
	formaction={waitConfirmation ? formaction : undefined}
	{onclick}
	{onmouseleave}
	{...props}
>
	{#if children}
		{@render children({ waitConfirmation })}
	{:else if waitConfirmation}
		<span>T'es sur ?</span>
	{:else}
		<span>Supprimer</span>
	{/if}
</button>
