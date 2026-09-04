/** Champs de saisie: le focus s'y pose sans effet de bord. */
const ENTRY =
	'input:not([type="hidden"], [type="submit"], [type="button"], [type="reset"], [type="image"]), textarea, select'

/**
 * Tout ce qui compte comme premier champ. Les déclencheurs d'`InputSelect` et d'`InputMultiSelect`
 * en font partie sans être focalisables ici: ils comptent pour décider qu'on ne descend pas, sans
 * quoi le focus sauterait par-dessus le premier champ pour atterrir au milieu du formulaire.
 */
const FIELD = `${ENTRY}, .input, [role="combobox"]`

function isEligible(element: HTMLElement) {
	if (element.matches('[disabled], [aria-disabled="true"], [readonly], [tabindex="-1"]')) {
		return false
	}
	// Écarte ce que le CSS cache: l'`input[type=file]` d'un sélecteur d'image, et les champs d'un
	// `<dialog>` fermé rendu à l'intérieur du tiroir.
	return element.checkVisibility()
}

/**
 * Le premier champ de saisie du corps du tiroir, ou le panneau lui-même à défaut — un tiroir sans
 * formulaire garde le focus sur son conteneur.
 */
export function drawerFocusTarget(node: HTMLElement): HTMLElement {
	// Le clavier virtuel recouvrirait la moitié du tiroir à peine ouvert.
	if (window.matchMedia('(pointer: coarse)').matches) return node

	const body = node.querySelector('[data-drawer-body]') ?? node

	for (const field of body.querySelectorAll<HTMLElement>(FIELD)) {
		if (!isEligible(field)) continue
		// Le premier champ n'est pas une saisie: on s'arrête sur le panneau plutôt que de chercher
		// plus bas.
		if (!field.matches(ENTRY)) return node
		return field
	}

	return node
}
