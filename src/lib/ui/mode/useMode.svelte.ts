import { PersistedState } from 'runed'
import { MediaQuery } from 'svelte/reactivity'

export type ModeEnum = 'light' | 'dark'
export type ModeChoice = ModeEnum | null
export type Mode = ReturnType<typeof useMode>

export function useMode(themes: Record<ModeEnum, string> = {light: 'light', dark: 'dark' }) {
    let choice = new PersistedState<ModeChoice>('mode-choice', null)
    let modeSystemIsLight = new MediaQuery('prefers-color-scheme: light')
	let modeSystem = $derived<ModeEnum>(modeSystemIsLight.current ? 'light' : 'dark')
	let mode = $derived(choice.current || modeSystem)

    $effect(() => {
        const rootEl = document.documentElement
        rootEl.dataset['theme'] = themes[mode]
    })

    return {
        get current() {
            return mode
        },
        get choice() {
            return choice.current
        },
        set choice(m: ModeChoice) {
            choice.current = m
        },
        toggle() {
            if (!choice.current) {
                choice.current = 'light'
                return
            }
            if (choice.current === 'light') {
                choice.current = 'dark'
                return
            }
            choice.current = null
        },
    }
}
