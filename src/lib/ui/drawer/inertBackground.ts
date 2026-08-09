import type { Attachment } from 'svelte/attachments'

// Compteur par élément: deux tiroirs empilés marquent les mêmes frères, et le second à se fermer
// ne doit lever `inert` que si le premier l'a déjà relâché. Un `WeakMap` évite de retenir les
// nœuds détachés entre-temps.
const marks = new WeakMap<HTMLElement, number>()

export type InertBackgroundOptions = {
	/** Les frères portant `data-drawer` de cette valeur sont préservés (overlay et tiroir courant). */
	key: string
	/** Sélecteur des frères à laisser interactifs, par ex. le conteneur des toasts. */
	skip?: string
}

/**
 * Rend inerte tout le document sauf la branche qui mène au nœud attaché: à chaque niveau on marque
 * les frères, jusqu'à `<body>`. Aucun nœud n'est déplacé — poser `inert` sur un conteneur racine
 * serait impossible ici, le tiroir étant rendu à l'intérieur de ce conteneur.
 */
export function inertBackground({ key, skip }: InertBackgroundOptions): Attachment<HTMLElement> {
	return (node) => {
		const marked: HTMLElement[] = []

		for (let el: HTMLElement | null = node; el && el !== document.body; el = el.parentElement) {
			for (const sibling of el.parentElement?.children ?? []) {
				if (sibling === el || !(sibling instanceof HTMLElement)) continue
				if (sibling.dataset.drawer === key) continue
				if (skip && sibling.matches(skip)) continue

				const count = marks.get(sibling) ?? 0
				marks.set(sibling, count + 1)
				if (count === 0) sibling.inert = true
				marked.push(sibling)
			}
		}

		// Relevé avant la mise en `inert`: le focus courant est souvent sur le déclencheur, qui
		// appartient à l'arrière-plan et perdrait le focus au profit de `<body>`.
		const previous = document.activeElement
		node.focus({ preventScroll: true })

		// SvelteKit remet le focus sur `<body>` à la fin de la navigation qui ouvre le tiroir. Les
		// `goto` de `open()`/`close()` passent `keepFocus`, mais un tiroir ouvert par un simple
		// `<a href>` n'en profite pas: on repasse après coup, et seulement si personne d'autre n'a
		// pris le focus entre-temps.
		const timer = setTimeout(() => {
			const active = document.activeElement
			if (!active || active === document.body) node.focus({ preventScroll: true })
		})

		return () => {
			clearTimeout(timer)
			for (const el of marked) {
				const count = (marks.get(el) ?? 1) - 1
				if (count > 0) marks.set(el, count)
				else {
					marks.delete(el)
					el.inert = false
				}
			}
			// `closest` et non `previous.inert`: la propriété ne reflète que l'attribut posé sur
			// l'élément lui-même, pas l'inertie héritée d'un tiroir resté ouvert au-dessus.
			if (previous instanceof HTMLElement && previous.isConnected && !previous.closest('[inert]')) {
				previous.focus({ preventScroll: true })
			}
		}
	}
}
