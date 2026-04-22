import { PersistedState } from 'runed';
import { MediaQuery } from 'svelte/reactivity';

export type ModeEnum = 'light' | 'dark';
export type ModeChoice = ModeEnum | null;
export type Mode = {
	readonly current: ModeEnum;
	choice: ModeChoice;
	toggle(): void;
};

let mode: Mode | undefined;

export function useMode(themes: Record<ModeEnum, string> = { light: 'light', dark: 'dark' }) {
	if (!mode) mode = createMode(themes);
	return mode;
}

function createMode(themes: Record<ModeEnum, string> = { light: 'light', dark: 'dark' }) {
	const choice = new PersistedState<ModeChoice>('mode-choice', null);
	const modeSystemIsLight = new MediaQuery('prefers-color-scheme: light');
	const modeSystem = $derived<ModeEnum>(modeSystemIsLight.current ? 'light' : 'dark');
	const modeValue = $derived(choice.current || modeSystem);

	$effect(() => {
		const rootEl = document.documentElement;
		rootEl.dataset.theme = themes[modeValue];
	});

	return {
		get current() {
			return modeValue;
		},
		get choice() {
			return choice.current;
		},
		set choice(m: ModeChoice) {
			choice.current = m;
		},
		toggle() {
			if (!choice.current) {
				choice.current = 'light';
				return;
			}
			if (choice.current === 'light') {
				choice.current = 'dark';
				return;
			}
			choice.current = null;
		}
	};
}
