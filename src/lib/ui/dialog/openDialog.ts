import { flushSync, mount, unmount, type Component, type ComponentProps } from 'svelte'
import { on } from 'svelte/events'
import type { Options } from '$lib/utils/options.js'
import DialogConfirm from './DialogConfirm.svelte'
import DialogSelect from './DialogSelect.svelte'

/** Props reçues par tout composant ouvert via `openDialog`. */
export type DialogProps<T> = { resolve: (value: T) => void }

type Resolved<P> = P extends DialogProps<infer T> ? T : never

/**
 * Monte `component` dans `document.body`, ouvre son `<dialog>` et résout avec la valeur passée
 * à `resolve`, ou `undefined` si le dialogue est fermé autrement (Échap, backdrop, bouton X).
 * Le composant est démonté une fois la transition de fermeture jouée.
 */
export function openDialog<P extends DialogProps<never>>(
	component: Component<P>,
	// `props` facultatif quand le composant n'a aucune prop obligatoire.
	...[props]: Partial<Omit<P, 'resolve'>> extends Omit<P, 'resolve'>
		? [props?: Omit<P, 'resolve'>]
		: [props: Omit<P, 'resolve'>]
): Promise<Resolved<P> | undefined> {
	return new Promise((resolve) => {
		const container = document.body.appendChild(document.createElement('div'))
		let settled = false
		let disposed = false

		// La promesse se règle tout de suite: l'appelant n'attend pas le fondu de fermeture.
		function settle(value: Resolved<P> | undefined) {
			if (settled) return
			settled = true
			resolve(value)
		}

		async function dispose(dialog?: HTMLDialogElement) {
			if (disposed) return
			disposed = true
			if (dialog) {
				const animations = dialog.getAnimations({ subtree: true })
				await Promise.allSettled(animations.map((animation) => animation.finished))
			}
			unmount(instance)
			container.remove()
		}

		const instance = mount(component, {
			target: container,
			props: {
				...props,
				resolve(value: Resolved<P>) {
					settle(value)
					const dialog = container.querySelector('dialog')
					// La fermeture émet `close`, qui démonte. Sans aucun `<dialog>` rien ne
					// l'émettra; et un `<dialog>` déjà fermé est en cours de démontage.
					if (dialog?.open) dialog.close()
					else if (!dialog) dispose()
				}
			} as P
		})

		// `close` ne bubble pas mais traverse la phase de capture: le conteneur l'attrape quelle
		// que soit la cause (Échap, backdrop, bouton X, `resolve`), sans coopération du composant.
		// Ordre: `dialog.close()` retire `open` de façon synchrone → microtask du MutationObserver
		// de `Dialog` (le `onClose` du composant peut appeler `resolve(false)`: sa valeur gagne)
		// → tâche `close` → `settle(undefined)` no-op si déjà réglé.
		on(
			container,
			'close',
			(event) => {
				settle(undefined)
				dispose(event.target as HTMLDialogElement)
			},
			{ capture: true }
		)

		// `mount` ne fait pas tourner les effets: sans `flushSync` le MutationObserver de `Dialog`
		// n'est pas encore posé quand `open` apparaît, et `onOpen` ni les tabindex ne suivraient.
		flushSync()
		container.querySelector('dialog')?.showModal()
	})
}

export type ConfirmDialogOptions = Omit<ComponentProps<typeof DialogConfirm>, 'resolve'>

/** Dialogue de confirmation: `true` si confirmé, `false` sinon (annulé, Échap, backdrop…). */
export async function confirmDialog(options: ConfirmDialogOptions = {}): Promise<boolean> {
	return (await openDialog(DialogConfirm, options)) === true
}

export type SelectDialogOptions<O extends Options = Options> = Omit<
	ComponentProps<typeof DialogSelect>,
	'resolve' | 'options'
> & { options: O }

/** Valeurs d'une `Options` littérale: `'a' | 'b'` pour `['a', 'b']`, `{ a: … }` ou `[{ value: 'a' }]`. */
export type OptionValues<O extends Options> = O extends string
	? string
	: O extends readonly (infer I)[]
		? I extends string
			? I
			: I extends { value: infer V extends string }
				? V
				: never
		: keyof O & string

/**
 * Liste d'options: la valeur choisie, ou `undefined` (annulé, Échap, backdrop…). Le type de
 * la valeur s'infère d'une liste littérale; une `Options` quelconque retombe sur `string`.
 */
export async function selectDialog<const O extends Options>(
	options: SelectDialogOptions<O>
): Promise<OptionValues<O> | undefined> {
	return (await openDialog(DialogSelect, options)) as OptionValues<O> | undefined
}
