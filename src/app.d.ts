declare global {
	namespace App {
		//interface Locals {}
		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	/**
	 * CSS Anchor Positioning properties are unknown from svelte-check
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning
	 */
	interface CSSStyleDeclaration {
		anchorName?: string
		positionAnchor?: string
		positionArea?: string
		positionTry?: string
	}
}

export {}
