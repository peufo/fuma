import { codeToHtml } from 'shiki';

export async function highlight(code: string, lang = 'svelte', theme: 'light' | 'dark' = 'dark') {
	return codeToHtml(code, {
		lang,
		theme: theme === 'dark' ? 'github-dark' : 'github-light',
		rootStyle: 'padding: 0.5rem 1rem;'
	});
}
