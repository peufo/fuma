<script lang="ts" module>
	/** Décalage horizontal courant (px) du tiroir `noOverlay` pendant sa transition. */
	export const transitionX = $state({ current: 0 })
</script>

<script lang="ts">
	import { type Snippet } from 'svelte'
	import { fade } from 'svelte/transition'
	import { XIcon } from '@lucide/svelte'

	import { goto } from '$app/navigation'
	import { urlParam } from '$lib/state/param.js'
	import { drawerFly } from './drawerFly.js'
	import { useLayer } from './useLayer.svelte.js'
	import { inertBackground } from './inertBackground.js'
	import type { ClassValue } from 'svelte/elements'

	let {
		key,
		title,
		class: klass = '',
		maxWidth = '32rem',
		classHeader = '',
		classBody = '',
		duration = 180,
		noOverlay = false,
		autofocus = true,
		zIndex = 50,
		inertSkip = '[data-sonner-toaster], :has(> [data-sonner-toaster])',
		children
	}: {
		key: string
		title?: string
		class?: ClassValue
		maxWidth?: string
		classHeader?: ClassValue
		classBody?: ClassValue
		duration?: number
		noOverlay?: boolean
		/** Poser le focus sur le premier champ du corps à l'ouverture, s'il y en a un. */
		autofocus?: boolean
		zIndex?: number
		/** Sélecteur des éléments d'arrière-plan qui restent interactifs quand le tiroir est ouvert. */
		inertSkip?: string
		children: Snippet<[{ open: typeof open; close: typeof close }]>
	} = $props()

	type GotoOptions = Parameters<typeof goto>[1]
	// `keepFocus`: sans lui SvelteKit renvoie le focus sur `<body>` après chaque navigation
	// client, ce qui écraserait le focus placé dans le tiroir (et sa restauration à la fermeture).
	export function open(value = 1, options: GotoOptions = {}) {
		return goto(urlParam.with({ [key]: value }), {
			...options,
			replaceState: true,
			noScroll: true,
			keepFocus: true
		})
	}

	export function close(options: GotoOptions = {}) {
		return goto(urlParam.without(key), {
			...options,
			replaceState: true,
			noScroll: true,
			keepFocus: true
		})
	}
	let { offset, index, isActive } = $derived(useLayer(key))
	let clientWidth = $state(0)

	function onkeydown(event: KeyboardEvent) {
		if (event.key !== 'Escape' || noOverlay) return
		// `offset === 0`: seul le tiroir du dessus se ferme. Et une modale native ouverte *dans* le
		// tiroir (`Dialog`, `ContextMenu`) doit consommer l'échappement en premier.
		if (!isActive || offset !== 0 || document.querySelector('dialog[open]')) return
		event.preventDefault()
		close()
	}
</script>

<svelte:window {onkeydown} />

{#if !noOverlay && isActive}
	<!-- La fermeture au clavier passe par Échap et par le bouton de l'en-tête: l'overlay n'a pas
	     besoin d'un rôle `button` factice, et reste masqué aux technologies d'assistance. -->
	<div
		data-drawer={key}
		data-drawer-overlay
		aria-hidden="true"
		onclick={() => close()}
		transition:fade={{ duration }}
		style="z-index: {zIndex + index};"
		class="
			fixed inset-0 bg-black/15 backdrop-blur-[1.5px]
		"
	></div>
{/if}

{#if isActive}
	<!-- `<div>` et non `<aside>`: `role="dialog"` remplace de toute façon le rôle implicite, et
	     Svelte refuse un rôle interactif sur un élément qui ne l'est pas. -->
	<div
		data-drawer={key}
		role="dialog"
		aria-modal={!noOverlay}
		aria-label={title}
		tabindex={-1}
		{@attach noOverlay ? () => {} : inertBackground({ key, skip: inertSkip, autofocus })}
		bind:clientWidth
		transition:drawerFly|local={{
			x: clientWidth,
			duration,
			opacity: 1,
			onTransition(pos) {
				if (noOverlay) transitionX.current = pos.x
			}
		}}
		style="
			z-index: {zIndex + index};
			max-width: min(100%, {maxWidth});
			transform: translateX({-offset * 4}rem);
			transition-duration: {duration}ms;
		"
		class={[
			'fixed top-0 right-0 bottom-0 z-10 flex',
			'w-full flex-col overflow-y-auto overscroll-contain bg-base-100',
			'transition-transform',
			klass
		]}
	>
		<div
			class={[
				'sticky top-0 z-20 flex items-center',
				'justify-between gap-2 bg-base-100 p-4',
				classHeader
			]}
		>
			<h2 class="title min-w-0 overflow-hidden">{title}</h2>
			<button onclick={() => close()} class="btn btn-square btn-sm">
				<XIcon title="Fermer" />
			</button>
		</div>

		<div data-drawer-body class={['grow px-4', classBody]}>
			{@render children({ open, close })}
		</div>
	</div>
{/if}

<style>
	/* Verrou de défilement porté par l'overlay lui-même: il se pose et se lève sans compteur,
	   tiroirs empilés et transition de sortie compris, et un tiroir `noOverlay` ne verrouille rien. */
	:global(html:has([data-drawer-overlay])) {
		overflow: hidden;
		/* Passer `<html>` en `overflow: hidden` coupe la propagation du `overflow-y: scroll` de
		   `<body>` vers le viewport: la gouttière réservée évite le saut horizontal. */
		scrollbar-gutter: stable;
	}
</style>
