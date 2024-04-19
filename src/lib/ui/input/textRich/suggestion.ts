import type { SuggestionOptions } from '@tiptap/suggestion'
import { writable, get } from 'svelte/store'
import { tippy, type TippyInstance } from '$lib/utils/tippy.js'

import SuggesionList from './SuggesionList.svelte'

export type SuggestionItem = { id: string; label: string }
export let suggestionItems = writable<SuggestionItem[]>([])

export const suggestion: Omit<SuggestionOptions<SuggestionItem>, 'editor'> = {
	items: ({ query }) => {
		const items = get(suggestionItems)
		return items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
	},

	render: () => {
		let popup: TippyInstance
		let target = document.createElement('div')
		let component: SuggesionList

		return {
			onStart: (props) => {
				component = new SuggesionList({ target, props: { props } })
				if (!props.clientRect) return

				popup = tippy(document.body, {
					getReferenceClientRect: props.clientRect as () => DOMRect,
					appendTo: () => document.body,
					content: target,
					showOnCreate: true,
					interactive: true,
					trigger: 'manual',
					placement: 'bottom-start',
					theme: 'dropdown-border'
				})
			},

			onUpdate(props) {
				component.$set({ props })
				if (!props.clientRect) return

				popup.setProps({
					getReferenceClientRect: props.clientRect as () => DOMRect
				})
			},

			onKeyDown(props) {
				if (props.event.key === 'Escape') {
					popup.hide()
					return true
				}
				if (['Enter', 'ArrowUp', 'ArrowDown'].includes(props.event.key)) {
					component.$set({ keyDownEvent: props.event })
					return true
				}
				return false
			},

			onExit() {
				popup?.destroy()
				component?.$destroy()
			}
		}
	}
}
